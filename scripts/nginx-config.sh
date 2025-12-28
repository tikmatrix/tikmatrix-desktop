#!/bin/bash
# Configure Nginx for a domain on VPS server
# Usage: ./nginx-config.sh <server_id> <domain> <site_type> [proxy_backend] [enable_ssl] [ssl_method]
# site_type: static or proxy
# ssl_method: http or route53

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib-common.sh"

# Validate arguments
if [[ $# -lt 3 ]]; then
    log_error "Usage: $0 <server_id> <domain> <site_type> [proxy_backend] [enable_ssl] [ssl_method]"
    log_error "site_type: static or proxy"
    log_error "ssl_method: http or route53"
    exit 1
fi

SERVER_ID="$1"
DOMAIN="$2"
SITE_TYPE="$3"
PROXY_BACKEND="${4:-}"
ENABLE_SSL="${5:-false}"
SSL_METHOD="${6:-http}"
CONFIG_FILE="${CONFIG_FILE:-deploy-config.json}"
SSH_KEY_FILE="${SSH_KEY_FILE:-${HOME}/.ssh/deploy_key}"

# Validate site type
if [[ "$SITE_TYPE" != "static" && "$SITE_TYPE" != "proxy" ]]; then
    log_error "Invalid site_type: $SITE_TYPE. Must be 'static' or 'proxy'"
    exit 1
fi

# Validate proxy backend for proxy type
if [[ "$SITE_TYPE" == "proxy" && -z "$PROXY_BACKEND" ]]; then
    log_error "proxy_backend is required for proxy site type"
    exit 1
fi

# Get server configuration
log_info "Loading server configuration for $SERVER_ID"
SERVER_CONFIG=$(get_server_config "$CONFIG_FILE" "$SERVER_ID")
SERVER_HOST=$(echo "$SERVER_CONFIG" | jq -r '.host')
SERVER_PORT=$(echo "$SERVER_CONFIG" | jq -r '.port')
SERVER_USER=$(echo "$SERVER_CONFIG" | jq -r '.user')

log_info "⚙️ Configuring Nginx on $SERVER_HOST"

# Create nginx configuration script
NGINX_CONFIG_SCRIPT=$(cat << 'NGINX_CONFIG'
#!/bin/bash
set -euo pipefail

DOMAIN="${DOMAIN}"
SITE_TYPE="${SITE_TYPE:-static}"
PROXY_BACKEND="${PROXY_BACKEND}"
ENABLE_SSL="${ENABLE_SSL:-false}"
SSL_METHOD="${SSL_METHOD:-http}"

echo "Configuring Nginx for: $DOMAIN"
echo "Site type: $SITE_TYPE"

# Determine if domain is root domain
DOT_COUNT=$(echo "$DOMAIN" | tr -cd '.' | wc -c)
if [[ $DOT_COUNT -eq 1 ]]; then
    WWW_DOMAIN="www.$DOMAIN"
    SERVER_NAMES="$DOMAIN $WWW_DOMAIN"
    CERTBOT_DOMAINS="-d $DOMAIN -d $WWW_DOMAIN"
else
    WWW_DOMAIN=""
    SERVER_NAMES="$DOMAIN"
    CERTBOT_DOMAINS="-d $DOMAIN"
fi

NGINX_CONF="/etc/nginx/conf.d/$DOMAIN.conf"
WEB_ROOT="/var/www.$DOMAIN"

if [[ "$SITE_TYPE" == "static" ]]; then
    # Create static site configuration
    mkdir -p "$WEB_ROOT"
    
    cat > "$NGINX_CONF" << 'EOF'
# Static site configuration for DOMAIN_PLACEHOLDER
limit_req_zone $binary_remote_addr zone=ZONE_PLACEHOLDER_limit:10m rate=10r/s;

server {
    listen 80;
    listen [::]:80;
    server_name SERVER_NAMES_PLACEHOLDER;

    root WEB_ROOT_PLACEHOLDER;
    index index.html;

    access_log /var/log/nginx/DOMAIN_PLACEHOLDER.access.log;
    error_log  /var/log/nginx/DOMAIN_PLACEHOLDER.error.log warn;

    location ~ /\.(?!well-known) {
        deny all;
        access_log off;
        log_not_found off;
    }

    location / {
        limit_req zone=ZONE_PLACEHOLDER_limit burst=20 nodelay;
        try_files $uri $uri.html $uri/ /index.html;
        
        add_header Cache-Control "no-cache, must-revalidate, max-age=0";
        add_header X-Content-Type-Options nosniff always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }

    location ~* \.(?:css|js|json|svg|png|jpe?g|gif|ico|webp|ttf|woff2?)\$ {
        try_files $uri =404;
        access_log off;
        expires 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml;
}
EOF
    
    # Replace placeholders
    sed -i "s|DOMAIN_PLACEHOLDER|$DOMAIN|g" "$NGINX_CONF"
    sed -i "s|SERVER_NAMES_PLACEHOLDER|$SERVER_NAMES|g" "$NGINX_CONF"
    sed -i "s|WEB_ROOT_PLACEHOLDER|$WEB_ROOT|g" "$NGINX_CONF"
    sed -i "s|ZONE_PLACEHOLDER|${DOMAIN//./_}|g" "$NGINX_CONF"
    
    sudo chown -R deploy:www-data "$WEB_ROOT"
    sudo chmod -R 775 "$WEB_ROOT"
    
elif [[ "$SITE_TYPE" == "proxy" ]]; then
    if [[ -z "$PROXY_BACKEND" ]]; then
        echo "Error: proxy_backend is required for proxy site type"
        exit 1
    fi
    
    # Create proxy configuration
    cat > "$NGINX_CONF" << 'EOF'
# Reverse proxy configuration for DOMAIN_PLACEHOLDER
limit_req_zone $binary_remote_addr zone=ZONE_PLACEHOLDER_limit:10m rate=10r/s;

upstream ZONE_PLACEHOLDER_backend {
    server BACKEND_PLACEHOLDER;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name SERVER_NAMES_PLACEHOLDER;

    access_log /var/log/nginx/DOMAIN_PLACEHOLDER.access.log;
    error_log  /var/log/nginx/DOMAIN_PLACEHOLDER.error.log warn;

    location / {
        limit_req zone=ZONE_PLACEHOLDER_limit burst=20 nodelay;
        
        proxy_pass PROXY_PASS_PLACEHOLDER;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript;
}
EOF
    
    BACKEND_ADDR="${PROXY_BACKEND#*://}"
    sed -i "s|DOMAIN_PLACEHOLDER|$DOMAIN|g" "$NGINX_CONF"
    sed -i "s|SERVER_NAMES_PLACEHOLDER|$SERVER_NAMES|g" "$NGINX_CONF"
    sed -i "s|BACKEND_PLACEHOLDER|$BACKEND_ADDR|g" "$NGINX_CONF"
    sed -i "s|PROXY_PASS_PLACEHOLDER|$PROXY_BACKEND|g" "$NGINX_CONF"
    sed -i "s|ZONE_PLACEHOLDER|${DOMAIN//./_}|g" "$NGINX_CONF"
fi

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

echo "✅ Nginx configured for $DOMAIN"

# Setup SSL if requested
if [[ "$ENABLE_SSL" == "true" ]]; then
    echo "🔐 Setting up SSL certificate..."
    
    if [[ "$SSL_METHOD" == "route53" ]]; then
        # Route53 DNS validation
        if [[ -z "${AWS_ACCESS_KEY_ID:-}" ]] || [[ -z "${AWS_SECRET_ACCESS_KEY:-}" ]]; then
            echo "⚠️ AWS credentials not provided, skipping Route53 SSL setup"
        else
            sudo certbot -i nginx $CERTBOT_DOMAINS \
                --dns-route53 \
                --agree-tos \
                --no-eff-email \
                --non-interactive \
                --email "admin@$DOMAIN" || echo "⚠️ SSL setup failed"
        fi
    else
        # HTTP validation
        sudo certbot --nginx $CERTBOT_DOMAINS \
            --agree-tos \
            --no-eff-email \
            --non-interactive \
            --email "admin@$DOMAIN" || echo "⚠️ SSL setup failed (make sure DNS points to this server)"
    fi
fi

echo "✅ Configuration completed!"
NGINX_CONFIG
)

# Upload and execute script
TMP_SCRIPT="/tmp/nginx_config_$$.sh"
echo "$NGINX_CONFIG_SCRIPT" > "$TMP_SCRIPT"
chmod +x "$TMP_SCRIPT"

log_info "Uploading configuration script"
scp_upload "$SERVER_HOST" "$SERVER_PORT" "$SERVER_USER" "$SSH_KEY_FILE" \
    "$TMP_SCRIPT" "/tmp/nginx_config.sh"

log_info "Executing configuration script"
ssh_exec "$SERVER_HOST" "$SERVER_PORT" "$SERVER_USER" "$SSH_KEY_FILE" \
    "DOMAIN=$DOMAIN SITE_TYPE=$SITE_TYPE PROXY_BACKEND=\"$PROXY_BACKEND\" ENABLE_SSL=$ENABLE_SSL SSL_METHOD=$SSL_METHOD AWS_ACCESS_KEY_ID=\"${AWS_ACCESS_KEY_ID:-}\" AWS_SECRET_ACCESS_KEY=\"${AWS_SECRET_ACCESS_KEY:-}\" bash /tmp/nginx_config.sh && rm /tmp/nginx_config.sh"

# Cleanup local temp file
rm -f "$TMP_SCRIPT"

log_success "Nginx configuration on $SERVER_ID completed successfully!"
