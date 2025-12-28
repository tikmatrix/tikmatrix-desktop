#!/bin/bash
# Renew SSL certificates on VPS server
# Usage: ./ssl-renew.sh <server_id>

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib-common.sh"

# Validate arguments
if [[ $# -lt 1 ]]; then
    log_error "Usage: $0 <server_id>"
    exit 1
fi

SERVER_ID="$1"
CONFIG_FILE="${CONFIG_FILE:-deploy-config.json}"
SSH_KEY_FILE="${SSH_KEY_FILE:-${HOME}/.ssh/deploy_key}"

# Get server configuration
log_info "Loading server configuration for $SERVER_ID"
SERVER_CONFIG=$(get_server_config "$CONFIG_FILE" "$SERVER_ID")
SERVER_HOST=$(echo "$SERVER_CONFIG" | jq -r '.host')
SERVER_PORT=$(echo "$SERVER_CONFIG" | jq -r '.port')
SERVER_USER=$(echo "$SERVER_CONFIG" | jq -r '.user')

log_info "🔐 Renewing SSL certificates on $SERVER_HOST"

# Execute SSL renewal on server
ssh_exec "$SERVER_HOST" "$SERVER_PORT" "$SERVER_USER" "$SSH_KEY_FILE" << 'SSL_SCRIPT'
set -euo pipefail

echo "🔄 Running certbot renew..."
if sudo certbot renew --quiet --post-hook 'systemctl reload nginx'; then
    echo "✅ SSL renewal completed successfully!"
else
    echo "⚠️ Certbot renew had some issues, checking status..."
    sudo certbot certificates
    exit 1
fi

echo ""
echo "📋 Current certificates:"
sudo certbot certificates

echo ""
echo "✅ SSL renewal completed!"
SSL_SCRIPT

log_success "SSL renewal on $SERVER_ID completed successfully!"
