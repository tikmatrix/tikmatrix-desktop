#!/bin/bash
# Health check for VPS server
# Usage: ./health-check.sh <server_id>

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

log_info "🏥 Running health check on $SERVER_HOST"

# Execute health check on server
ssh_exec "$SERVER_HOST" "$SERVER_PORT" "$SERVER_USER" "$SSH_KEY_FILE" << 'HEALTH_SCRIPT'
set -euo pipefail

echo "================================"
echo "System Health Check"
echo "================================"
echo ""

echo "📊 System Info:"
echo "  Hostname: $(hostname)"
echo "  OS: $(lsb_release -d 2>/dev/null | cut -f2 || cat /etc/os-release | grep PRETTY_NAME | cut -d'"' -f2)"
echo "  Uptime: $(uptime -p)"
echo ""

echo "💾 Disk Usage:"
df -h / | tail -1 | awk '{print "  Root: "$3" / "$2" ("$5" used)"}'
echo ""

echo "🧠 Memory Usage:"
free -h | grep Mem | awk '{print "  Memory: "$3" / "$2" ("int($3/$2*100)"% used)"}'
echo ""

echo "🌐 Nginx Status:"
if sudo systemctl is-active --quiet nginx; then
    echo "  ✅ Nginx is running"
    sudo nginx -t 2>&1 | grep -E "syntax|successful"
else
    echo "  ❌ Nginx is not running"
fi
echo ""

echo "🔥 Firewall Status:"
sudo ufw status | head -5
echo ""

echo "🔒 Fail2Ban Status:"
if sudo systemctl is-active --quiet fail2ban 2>/dev/null; then
    echo "  ✅ Fail2Ban is running"
    sudo fail2ban-client status 2>/dev/null | head -5 || echo "  Cannot get status"
else
    echo "  ❌ Fail2Ban is not running or not installed"
fi
echo ""

echo "📁 Configured Sites:"
if [ -d "/etc/nginx/conf.d" ]; then
    SITE_COUNT=$(ls -1 /etc/nginx/conf.d/*.conf 2>/dev/null | wc -l)
    echo "  Total: $SITE_COUNT site(s)"
    ls -1 /etc/nginx/conf.d/*.conf 2>/dev/null | sed 's|/etc/nginx/conf.d/||;s|.conf||' | sed 's/^/  - /' || echo "  No sites configured"
else
    echo "  Nginx conf.d directory not found"
fi
echo ""

echo "🔐 SSL Certificates:"
if [ -d "/etc/letsencrypt/live" ]; then
    CERT_COUNT=$(ls -1 /etc/letsencrypt/live/ 2>/dev/null | wc -l)
    echo "  Total: $CERT_COUNT certificate(s)"
    ls -1 /etc/letsencrypt/live/ 2>/dev/null | sed 's/^/  - /' || echo "  No certificates found"
else
    echo "  Let's Encrypt directory not found"
fi
echo ""

echo "✅ Health check completed!"
HEALTH_SCRIPT

log_success "Health check on $SERVER_ID completed successfully!"
