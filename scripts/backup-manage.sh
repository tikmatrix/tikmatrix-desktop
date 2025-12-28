#!/bin/bash
# Manage backups on VPS server
# Usage: ./backup-manage.sh <server_id> <action> [site]
# Actions: list, create
# For create action, site parameter is required

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib-common.sh"

# Validate arguments
if [[ $# -lt 2 ]]; then
    log_error "Usage: $0 <server_id> <action> [site]"
    log_error "Actions: list, create"
    exit 1
fi

SERVER_ID="$1"
ACTION="$2"
SITE="${3:-}"
CONFIG_FILE="${CONFIG_FILE:-deploy-config.json}"
SSH_KEY_FILE="${SSH_KEY_FILE:-${HOME}/.ssh/deploy_key}"

# Validate action
if [[ "$ACTION" != "list" && "$ACTION" != "create" ]]; then
    log_error "Invalid action: $ACTION. Must be 'list' or 'create'"
    exit 1
fi

# Validate site for create action
if [[ "$ACTION" == "create" && -z "$SITE" ]]; then
    log_error "Site parameter is required for create action"
    exit 1
fi

# Get server configuration
log_info "Loading server configuration for $SERVER_ID"
SERVER_CONFIG=$(get_server_config "$CONFIG_FILE" "$SERVER_ID")
SERVER_HOST=$(echo "$SERVER_CONFIG" | jq -r '.host')
SERVER_PORT=$(echo "$SERVER_CONFIG" | jq -r '.port')
SERVER_USER=$(echo "$SERVER_CONFIG" | jq -r '.user')

log_info "💾 Managing backups on $SERVER_HOST (action: $ACTION)"

# Execute backup management on server
ssh_exec "$SERVER_HOST" "$SERVER_PORT" "$SERVER_USER" "$SSH_KEY_FILE" bash << BACKUP_SCRIPT
set -euo pipefail

BACKUP_DIR="/var/backups/www"
ACTION="$ACTION"
SITE="$SITE"

if [[ "\$ACTION" == "create" ]]; then
    TARGET_DIR="/var/www.\$SITE"
    
    if [[ ! -d "\$TARGET_DIR" ]]; then
        echo "❌ Error: Site directory not found: \$TARGET_DIR"
        exit 1
    fi
    
    mkdir -p "\$BACKUP_DIR"
    BACKUP_NAME="\$SITE-manual-\$(date +%Y%m%d_%H%M%S).tar.gz"
    
    echo "📦 Creating backup: \$BACKUP_NAME"
    tar -czf "\$BACKUP_DIR/\$BACKUP_NAME" -C "\$TARGET_DIR" .
    
    echo "✅ Backup created: \$BACKUP_DIR/\$BACKUP_NAME"
    ls -lh "\$BACKUP_DIR/\$BACKUP_NAME"
    
elif [[ "\$ACTION" == "list" ]]; then
    echo "📋 Available backups in \$BACKUP_DIR:"
    echo ""
    
    if [[ -d "\$BACKUP_DIR" ]] && [[ "\$(ls -A \$BACKUP_DIR 2>/dev/null)" ]]; then
        ls -lht "\$BACKUP_DIR"/*.tar.gz 2>/dev/null | head -20 | awk '{
            size=\$5
            date=\$6" "\$7" "\$8
            file=\$9
            printf "  %s  %8s  %s\n", date, size, file
        }'
        echo ""
        du -sh "\$BACKUP_DIR" 2>/dev/null | awk '{print "  Total size: "\$1}' || echo "  Cannot determine total size"
    else
        echo "  No backups found"
    fi
fi
BACKUP_SCRIPT

log_success "Backup management on $SERVER_ID completed successfully!"
