#!/bin/bash
# Push files to VPS server
# Usage: ./push-files.sh <server_id> <local_path> <remote_path> [post_commands]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib-common.sh"

# Validate arguments
if [[ $# -lt 3 ]]; then
    log_error "Usage: $0 <server_id> <local_path> <remote_path> [post_commands]"
    exit 1
fi

SERVER_ID="$1"
LOCAL_PATH="$2"
REMOTE_PATH="$3"
POST_COMMANDS="${4:-}"
CONFIG_FILE="${CONFIG_FILE:-deploy-config.json}"
SSH_KEY_FILE="${SSH_KEY_FILE:-${HOME}/.ssh/deploy_key}"

# Validate local path exists
if [[ ! -e "$LOCAL_PATH" ]]; then
    log_error "Local path not found: $LOCAL_PATH"
    exit 1
fi

# Get server configuration
log_info "Loading server configuration for $SERVER_ID"
SERVER_CONFIG=$(get_server_config "$CONFIG_FILE" "$SERVER_ID")
SERVER_HOST=$(echo "$SERVER_CONFIG" | jq -r '.host')
SERVER_PORT=$(echo "$SERVER_CONFIG" | jq -r '.port')
SERVER_USER=$(echo "$SERVER_CONFIG" | jq -r '.user')

log_info "📤 Pushing files to $SERVER_HOST"

# Create remote directory if it doesn't exist
log_info "Creating remote directory: $REMOTE_PATH"
ssh_exec "$SERVER_HOST" "$SERVER_PORT" "$SERVER_USER" "$SSH_KEY_FILE" \
    "mkdir -p $REMOTE_PATH"

# Use rsync for efficient file transfer
log_info "Syncing files from $LOCAL_PATH to $REMOTE_PATH"
rsync_upload "$SERVER_HOST" "$SERVER_PORT" "$SERVER_USER" "$SSH_KEY_FILE" \
    "$LOCAL_PATH" "$REMOTE_PATH"

# Set permissions
log_info "Setting permissions on remote files"
ssh_exec "$SERVER_HOST" "$SERVER_PORT" "$SERVER_USER" "$SSH_KEY_FILE" \
    "sudo chown -R $SERVER_USER:www-data $REMOTE_PATH && sudo chmod -R 775 $REMOTE_PATH"

log_success "Files pushed successfully!"

# Run post-upload commands if provided
if [[ -n "$POST_COMMANDS" ]]; then
    log_info "⚙️ Running post-upload commands"
    log_info "Commands: $POST_COMMANDS"
    
    ssh_exec "$SERVER_HOST" "$SERVER_PORT" "$SERVER_USER" "$SSH_KEY_FILE" \
        "$POST_COMMANDS"
    
    log_success "Post-upload commands completed successfully!"
fi
