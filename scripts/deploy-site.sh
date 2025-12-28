#!/bin/bash
# Deploy site to VPS server
# Usage: ./deploy-site.sh <server_id> <site_name> <archive_path>

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib-common.sh"

# Validate arguments
if [[ $# -lt 3 ]]; then
    log_error "Usage: $0 <server_id> <site_name> <archive_path>"
    exit 1
fi

SERVER_ID="$1"
SITE_NAME="$2"
ARCHIVE_PATH="$3"
CONFIG_FILE="${CONFIG_FILE:-deploy-config.json}"
SSH_KEY_FILE="${SSH_KEY_FILE:-${HOME}/.ssh/deploy_key}"

# Validate archive exists
if [[ ! -f "$ARCHIVE_PATH" ]]; then
    log_error "Archive file not found: $ARCHIVE_PATH"
    exit 1
fi

# Get server configuration
log_info "Loading server configuration for $SERVER_ID"
SERVER_CONFIG=$(get_server_config "$CONFIG_FILE" "$SERVER_ID")
SERVER_HOST=$(echo "$SERVER_CONFIG" | jq -r '.host')
SERVER_PORT=$(echo "$SERVER_CONFIG" | jq -r '.port')
SERVER_USER=$(echo "$SERVER_CONFIG" | jq -r '.user')

# Get site configuration
log_info "Loading site configuration for $SITE_NAME"
SITE_CONFIG=$(get_site_config "$CONFIG_FILE" "$SITE_NAME")
SITE_DOMAIN=$(echo "$SITE_CONFIG" | jq -r '.domain')

# Set paths
TARGET_DIR="/var/www.$SITE_DOMAIN"
REMOTE_ARCHIVE="/tmp/$(basename "$ARCHIVE_PATH")"

log_info "🚀 Deploying $SITE_NAME to $SERVER_HOST:$TARGET_DIR"

# Upload archive
log_info "Uploading archive to server"
scp_upload "$SERVER_HOST" "$SERVER_PORT" "$SERVER_USER" "$SSH_KEY_FILE" \
    "$ARCHIVE_PATH" "$REMOTE_ARCHIVE"

# Deploy on server
log_info "Executing deployment on server"
ssh_exec "$SERVER_HOST" "$SERVER_PORT" "$SERVER_USER" "$SSH_KEY_FILE" << DEPLOY_SCRIPT
set -euo pipefail

ARCHIVE="$REMOTE_ARCHIVE"
TARGET="$TARGET_DIR"
BACKUP_DIR="/var/backups/www"

echo "📦 Deploying to \$TARGET"

# Create directories
mkdir -p "\$TARGET"
mkdir -p "\$BACKUP_DIR"

# Backup current deployment
if [[ -d "\$TARGET" && "\$(ls -A \$TARGET 2>/dev/null)" ]]; then
    BACKUP_NAME="\$(basename \$TARGET)-\$(date +%Y%m%d_%H%M%S).tar.gz"
    echo "📦 Creating backup: \$BACKUP_NAME"
    tar -czf "\$BACKUP_DIR/\$BACKUP_NAME" -C "\$TARGET" . 2>/dev/null || true
    
    # Keep only last 3 backups
    ls -t "\$BACKUP_DIR/\$(basename \$TARGET)-"* 2>/dev/null | tail -n +4 | xargs -r rm -f
fi

# Clear and extract
rm -rf "\$TARGET"/*
tar -xzf "\$ARCHIVE" -C "\$TARGET"

# Set permissions
sudo chown -R $SERVER_USER:www-data "\$TARGET"
sudo chmod -R 775 "\$TARGET"

# Cleanup
rm -f "\$ARCHIVE"

echo "✅ Deployment completed!"
DEPLOY_SCRIPT

log_success "Deployment to $SERVER_ID completed successfully!"
