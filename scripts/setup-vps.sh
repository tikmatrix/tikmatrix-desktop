#!/bin/bash
# =============================================================================
# TikMatrix VPS Setup Script v1.1   
# One-click setup for www.tikmatrix.com ecosystem on Ubuntu 22.04 LTS
# 
# NOTE: For GitHub Actions automation, use init-vps.sh instead!
# - init-vps.sh: Non-interactive initialization script for new VPS
# - This script: Interactive setup for manual configuration
# - See docs/vps-management.md for the full automation workflow
# =============================================================================

set -e  # Exit on error

# =============================================================================
# Configuration Variables (Will be set interactively)
# =============================================================================
DOMAIN=""
WWW_DOMAIN=""
WEB_ROOT=""
NGINX_CONF=""
DEPLOY_USER="deploy"
LOG_FILE="/var/log/tikmatrix-setup.log"
SSH_PORT="22"
GITHUB_PUBKEY=""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# =============================================================================
# Helper Functions
# =============================================================================
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
    echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S') $1" >> "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
    echo "[SUCCESS] $(date '+%Y-%m-%d %H:%M:%S') $1" >> "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
    echo "[WARNING] $(date '+%Y-%m-%d %H:%M:%S') $1" >> "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
    echo "[ERROR] $(date '+%Y-%m-%d %H:%M:%S') $1" >> "$LOG_FILE"
}

print_banner() {
    echo -e "${CYAN}"
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║                                                               ║"
    echo "║              TikMatrix VPS Setup Script v1.0                  ║"
    echo "║                                                               ║"
    echo "║  Automated setup for TikMatrix ecosystem websites             ║"
    echo "║                                                               ║"
    echo "╚═══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "This script must be run as root. Use: sudo $0"
        exit 1
    fi
}

check_os() {
    if [[ ! -f /etc/os-release ]]; then
        log_error "Cannot detect OS. /etc/os-release not found."
        exit 1
    fi
    
    source /etc/os-release
    if [[ "$ID" != "ubuntu" && "$ID" != "debian" ]]; then
        log_warning "This script is designed for Ubuntu/Debian. Current OS: $ID"
        read -p "Continue anyway? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    log_info "Detected OS: $PRETTY_NAME"
}

# Check if domain is a root domain (e.g., example.com vs sub.example.com)
is_root_domain() {
    local domain="$1"
    # Count the number of dots in the domain
    local dot_count=$(echo "$domain" | tr -cd '.' | wc -c)
    # Root domain has exactly 1 dot (e.g., example.com)
    # Subdomain has 2+ dots (e.g., sub.example.com, api.example.com)
    if [[ $dot_count -eq 1 ]]; then
        return 0  # true, is root domain
    else
        return 1  # false, is subdomain
    fi
}

# =============================================================================
# Interactive Configuration
# =============================================================================
interactive_config() {
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}                    Configuration Setup                         ${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    
    # Site selection
    echo -e "${YELLOW}Select site to deploy:${NC}"
    echo "  1) tikmatrix.com (TikMatrix)"
    echo "  2) igmatrix.com (IgMatrix)"
    echo "  3) ytmatrix.com (YTMatrix)"
    echo "  4) tikzenx.com (TikZenX)"
    echo "  5) Custom domain"
    echo ""
    
    while true; do
        read -p "Enter choice [1-5]: " site_choice
        case $site_choice in
            1)
                DOMAIN="tikmatrix.com"
                break
                ;;
            2)
                DOMAIN="igmatrix.com"
                break
                ;;
            3)
                DOMAIN="ytmatrix.com"
                break
                ;;
            4)
                DOMAIN="tikzenx.com"
                break
                ;;
            5)
                read -p "Enter your domain (e.g., example.com): " DOMAIN
                if [[ -z "$DOMAIN" ]]; then
                    log_error "Domain cannot be empty"
                    continue
                fi
                break
                ;;
            *)
                echo "Invalid choice. Please enter 1-5."
                ;;
        esac
    done
    
    # Only add www domain if the domain is a root domain (e.g., example.com)
    if is_root_domain "$DOMAIN"; then
        WWW_DOMAIN="www.$DOMAIN"
    else
        WWW_DOMAIN=""
        log_info "Subdomain detected, skipping www domain"
    fi
    WEB_ROOT="/var/www/$DOMAIN"
    NGINX_CONF="/etc/nginx/conf.d/$DOMAIN.conf"
    
    echo ""
    log_info "Domain: $DOMAIN"
    log_info "Web root: $WEB_ROOT"
    echo ""
    
    # Check if site already exists
    if [[ -f "$NGINX_CONF" ]]; then
        echo -e "${YELLOW}⚠️  Warning: Site $DOMAIN already configured!${NC}"
        echo "  Nginx config: $NGINX_CONF"
        read -p "Overwrite existing configuration? (y/n) [default: n]: " overwrite
        if [[ ! "$overwrite" =~ ^[Yy]$ ]]; then
            log_info "Setup cancelled. Site already exists."
            exit 0
        fi
    fi
    
    # SSH Port
    read -p "SSH port [default: 22]: " input_port
    SSH_PORT="${input_port:-22}"
    
    # GitHub Deploy Key
    echo ""
    echo -e "${YELLOW}GitHub Actions SSH Public Key:${NC}"
    echo "  This is used for automated deployments from GitHub Actions."
    echo "  You can generate one with: ssh-keygen -t ed25519 -C 'github-actions'"
    echo "  Paste the PUBLIC key (starts with 'ssh-ed25519' or 'ssh-rsa')."
    echo "  Leave empty to skip (you can add it later)."
    echo ""
    read -p "GitHub deploy public key: " GITHUB_PUBKEY
    
    # Confirmation
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}                    Configuration Summary                       ${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo "  Domain:          $DOMAIN"
    if [[ -n "$WWW_DOMAIN" ]]; then
        echo "  WWW Domain:      $WWW_DOMAIN"
    fi
    echo "  Web Root:        $WEB_ROOT"
    echo "  Deploy User:     $DEPLOY_USER"
    echo "  SSH Port:        $SSH_PORT"
    if [[ -n "$GITHUB_PUBKEY" ]]; then
        echo "  GitHub Key:      Provided"
    else
        echo "  GitHub Key:      Not provided (add later)"
    fi
    echo ""
    
    read -p "Proceed with these settings? (y/n): " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        log_info "Setup cancelled by user."
        exit 0
    fi
}

# =============================================================================
# System Update & Basic Setup
# =============================================================================
setup_system() {
    log_info "Updating system packages..."
    apt update && apt upgrade -y
    
    log_info "Installing essential packages..."
    apt install -y \
        curl \
        wget \
        git \
        vim \
        htop \
        unzip \
        software-properties-common \
        ca-certificates \
        gnupg \
        lsb-release \
        ufw \
        fail2ban \
        acl \
        rsync
    
    log_success "System packages updated and essentials installed."
}

# =============================================================================
# Firewall Configuration
# =============================================================================
setup_firewall() {
    log_info "Configuring UFW firewall..."
    
    # Reset UFW to default
    ufw --force reset
    
    # Default policies
    ufw default deny incoming
    ufw default allow outgoing
    
    # Allow SSH
    ufw allow $SSH_PORT/tcp
    
    # Allow HTTP and HTTPS
    ufw allow 80/tcp
    ufw allow 443/tcp
    
    # Enable UFW
    ufw --force enable
    
    log_success "Firewall configured and enabled."
}

# =============================================================================
# Fail2Ban Configuration
# =============================================================================
setup_fail2ban() {
    log_info "Configuring Fail2Ban..."
    
    cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
backend = systemd

[sshd]
enabled = true
port = $SSH_PORT
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 86400

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 3

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10
EOF
    
    systemctl enable fail2ban
    systemctl restart fail2ban
    
    log_success "Fail2Ban configured and started."
}

# =============================================================================
# Create Deploy User
# =============================================================================
setup_deploy_user() {
    log_info "Setting up deploy user..."
    
    # Create deploy user if not exists
    if ! id "$DEPLOY_USER" &>/dev/null; then
        useradd -m -s /bin/bash "$DEPLOY_USER"
        log_info "Created user: $DEPLOY_USER"
    else
        log_warning "User $DEPLOY_USER already exists, updating configuration."
    fi
    
    # Add deploy user to www-data group
    usermod -aG www-data "$DEPLOY_USER"
    
    # Setup SSH directory
    sudo mkdir -p /home/$DEPLOY_USER/.ssh
    chmod 700 /home/$DEPLOY_USER/.ssh
    touch /home/$DEPLOY_USER/.ssh/authorized_keys
    chmod 600 /home/$DEPLOY_USER/.ssh/authorized_keys
    
    # Add GitHub deploy key if provided
    if [[ -n "$GITHUB_PUBKEY" ]]; then
        # Avoid duplicate keys
        if ! grep -qF "$GITHUB_PUBKEY" /home/$DEPLOY_USER/.ssh/authorized_keys 2>/dev/null; then
            echo "$GITHUB_PUBKEY" >> /home/$DEPLOY_USER/.ssh/authorized_keys
            log_success "GitHub deploy key added to authorized_keys"
        else
            log_warning "GitHub deploy key already exists in authorized_keys"
        fi
    fi
    
    chown -R $DEPLOY_USER:$DEPLOY_USER /home/$DEPLOY_USER/.ssh
    
    # Create sudoers configuration for deploy user - grant full sudo access
    cat > /etc/sudoers.d/deploy << EOF
# Allow deploy user full sudo access for web deployments and system management
# This simplifies permission management for the TikMatrix ecosystem
$DEPLOY_USER ALL=(ALL) NOPASSWD: ALL
EOF
    
    chmod 440 /etc/sudoers.d/deploy
    
    log_success "Deploy user configured."
}

# =============================================================================
# Nginx Installation & Configuration
# =============================================================================
setup_nginx() {
    log_info "Installing Nginx..."
    apt install nginx -y
    
    log_info "Configuring Nginx for $DOMAIN..."
    
    # Create web root directory
    sudo mkdir -p "$WEB_ROOT"
    
    # Create placeholder index.html
    cat > "$WEB_ROOT/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$DOMAIN - Coming Soon</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container { text-align: center; }
        h1 { font-size: 3rem; margin-bottom: 0.5rem; }
        p { font-size: 1.2rem; opacity: 0.9; }
    </style>
</head>
<body>
    <div class="container">
        <h1>$DOMAIN</h1>
        <p>Site is being deployed. Check back soon!</p>
    </div>
</body>
</html>
EOF
    
    # Set ownership - deploy user owns the files, www-data group for reading
    chown -R $DEPLOY_USER:www-data "$WEB_ROOT"
    chmod -R 755 "$WEB_ROOT"
    
    # Set ACL for deploy user
    setfacl -R -m u:$DEPLOY_USER:rwx "$WEB_ROOT" 2>/dev/null || true
    setfacl -R -d -m u:$DEPLOY_USER:rwx "$WEB_ROOT" 2>/dev/null || true
    
    # Build server_name with optional www domain
    local SERVER_NAMES="$DOMAIN"
    if [[ -n "$WWW_DOMAIN" ]]; then
        SERVER_NAMES="$DOMAIN $WWW_DOMAIN"
    fi
    
    # Create Nginx configuration
    cat > "$NGINX_CONF" << EOF
# $DOMAIN Nginx Configuration
# Rate limiting zone
limit_req_zone \$binary_remote_addr zone=${DOMAIN//./_}_limit:10m rate=10r/s;

server {
    listen 80;
    listen [::]:80;
    server_name $SERVER_NAMES;

    root $WEB_ROOT;
    index index.html;

    access_log /var/log/nginx/${DOMAIN}.access.log;
    error_log  /var/log/nginx/${DOMAIN}.error.log warn;

    # Performance tuning
    sendfile        on;
    tcp_nopush      on;
    tcp_nodelay     on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Security - hide sensitive files
    location ~ /\.(?!well-known) {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Block common attack patterns
    location ~* (\.php|\.asp|\.aspx|\.jsp|\.cgi)\$ {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Main location with rate limiting
    # Docusaurus generates static HTML files, so we need to try .html extension
    location / {
        limit_req zone=${DOMAIN//./_}_limit burst=20 nodelay;
        try_files \$uri \$uri.html \$uri/ /index.html;
        
        add_header Cache-Control "no-cache, must-revalidate, max-age=0";
        add_header X-Content-Type-Options nosniff always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    }

    # Static assets with long cache
    location ~* \.(?:css|js|json|map|xml|svg|png|jpe?g|gif|ico|webp|avif|ttf|woff2?|eot)\$ {
        try_files \$uri =404;
        access_log off;
        expires 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
        add_header Pragma public;
    }

    location = /robots.txt { try_files \$uri =404; access_log off; }
    location = /sitemap.xml { try_files \$uri =404; access_log off; }
    location = /favicon.ico { try_files \$uri =404; access_log off; }

    autoindex off;
    error_page 404 /index.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html { root /usr/share/nginx/html; }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_types
        text/plain text/css text/xml text/javascript
        application/json application/javascript application/x-javascript
        application/xml application/xml+rss
        application/vnd.ms-fontobject application/x-font-ttf
        font/opentype image/svg+xml image/x-icon;
}
EOF
    
    # Remove default nginx site
    rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
    
    # Hide nginx version globally
    sed -i 's/# server_tokens off;/server_tokens off;/' /etc/nginx/nginx.conf 2>/dev/null || \
    grep -q "server_tokens off" /etc/nginx/nginx.conf || \
    sed -i '/http {/a\    server_tokens off;' /etc/nginx/nginx.conf
    
    # Test and start nginx
    nginx -t
    systemctl enable nginx
    systemctl restart nginx
    
    log_success "Nginx installed and configured."
}

# =============================================================================
# SSL/TLS Configuration with Certbot
# =============================================================================
setup_ssl() {
    log_info "Installing Certbot and SSL dependencies..."
    apt install -y certbot python3-certbot-nginx python3-certbot-dns-route53 || {
        log_error "Failed to install certbot packages."
        return 1
    }
    
    log_success "Certbot installed. Run 'certbot --help' or see https://certbot.eff.org for certificate generation options."
}

# =============================================================================
# Create Deploy Script
# =============================================================================
setup_deploy_script() {
    log_info "Creating deployment script..."
    
    cat > /home/$DEPLOY_USER/deploy.sh << 'DEPLOY_SCRIPT'
#!/bin/bash
# Deployment script for GitHub Actions
# Usage: ./deploy.sh <archive_path> <target_dir>

set -e

ARCHIVE="$1"
TARGET_DIR="$2"

if [[ -z "$ARCHIVE" || -z "$TARGET_DIR" ]]; then
    echo "Usage: $0 <archive_path> <target_dir>"
    echo "Example: $0 /tmp/build-tikmatrix.tar.gz /var/www.tikmatrix.com"
    exit 1
fi

if [[ ! -f "$ARCHIVE" ]]; then
    echo "Error: Archive not found: $ARCHIVE"
    exit 1
fi

echo "🚀 Deploying $ARCHIVE -> $TARGET_DIR"

# Create target directory if not exists
sudo mkdir -p "$TARGET_DIR"

# Backup current deployment (keep last 3)
BACKUP_DIR="/var/backups/www"
sudo mkdir -p "$BACKUP_DIR"
BACKUP_NAME="$(basename $TARGET_DIR)-$(date +%Y%m%d_%H%M%S).tar.gz"

if [[ -d "$TARGET_DIR" && "$(ls -A $TARGET_DIR 2>/dev/null)" ]]; then
    echo "📦 Backing up current deployment..."
    tar -czf "$BACKUP_DIR/$BACKUP_NAME" -C "$TARGET_DIR" . 2>/dev/null || true
    
    # Keep only last 3 backups
    ls -t "$BACKUP_DIR/$(basename $TARGET_DIR)-"* 2>/dev/null | tail -n +4 | xargs -r rm -f
fi

# Clear target directory
echo "🗑️ Clearing target directory..."
rm -rf "$TARGET_DIR"/*

# Extract new deployment
echo "📦 Extracting new deployment..."
tar -xzf "$ARCHIVE" -C "$TARGET_DIR"

# Set permissions (deploy owns, www-data group can read)
echo "🔐 Setting permissions..."
sudo chown -R $DEPLOY_USER:www-data "$TARGET_DIR"
sudo chmod -R 775 "$TARGET_DIR"

# Cleanup
echo "🧹 Cleaning up..."
rm -f "$ARCHIVE"

echo "✅ Deployment completed successfully!"
echo "   Target: $TARGET_DIR"
echo "   Backup: $BACKUP_DIR/$BACKUP_NAME"
DEPLOY_SCRIPT
    
    chmod +x /home/$DEPLOY_USER/deploy.sh
    chown $DEPLOY_USER:$DEPLOY_USER /home/$DEPLOY_USER/deploy.sh
    
    # Create backup directory
    sudo mkdir -p /var/backups/www
    chown $DEPLOY_USER:$DEPLOY_USER /var/backups/www
    
    log_success "Deployment script created at /home/$DEPLOY_USER/deploy.sh"
}

# =============================================================================
# Security Hardening
# =============================================================================
setup_security() {
    log_info "Applying security hardening..."
    
    # Harden shared memory
    if ! grep -q "tmpfs /run/shm tmpfs" /etc/fstab; then
        echo "tmpfs /run/shm tmpfs defaults,noexec,nosuid 0 0" >> /etc/fstab
    fi
    
    chmod 600 /etc/ssh/sshd_config
    
    # Kernel security parameters
    if ! grep -q "# TikMatrix Security" /etc/sysctl.conf; then
        cat >> /etc/sysctl.conf << 'EOF'

# TikMatrix Security hardening
net.ipv4.conf.default.rp_filter=1
net.ipv4.conf.all.rp_filter=1
net.ipv4.tcp_syncookies=1
net.ipv4.conf.all.accept_redirects=0
net.ipv4.conf.default.accept_redirects=0
net.ipv4.conf.all.send_redirects=0
net.ipv4.conf.default.send_redirects=0
net.ipv4.conf.all.accept_source_route=0
net.ipv4.conf.default.accept_source_route=0
net.ipv4.conf.all.log_martians=1
EOF
        sysctl -p 2>/dev/null || true
    fi
    
    log_success "Security hardening applied."
}

# =============================================================================
# System Optimization
# =============================================================================
setup_optimization() {
    log_info "Applying system optimizations..."
    
    # Optimize nginx worker processes
    CORES=$(nproc)
    sed -i "s/worker_processes auto;/worker_processes $CORES;/" /etc/nginx/nginx.conf 2>/dev/null || true
    
    # Increase file descriptors limit
    if ! grep -q "# Nginx optimization" /etc/security/limits.conf; then
        cat >> /etc/security/limits.conf << 'EOF'

# Nginx optimization
www-data soft nofile 65535
www-data hard nofile 65535
deploy soft nofile 65535
deploy hard nofile 65535
EOF
    fi
    
    # Optimize nginx for high performance
    if ! grep -q "worker_rlimit_nofile" /etc/nginx/nginx.conf; then
        sed -i '/worker_processes/a worker_rlimit_nofile 65535;' /etc/nginx/nginx.conf
    fi
    
    log_success "System optimizations applied."
}

# =============================================================================
# Print Summary
# =============================================================================
print_summary() {
    # Get server IP
    SERVER_IP=$(curl -s --connect-timeout 5 ifconfig.me 2>/dev/null || curl -s --connect-timeout 5 icanhazip.com 2>/dev/null || echo 'YOUR_SERVER_IP')
    
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}              TikMatrix VPS Setup Complete!                    ${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}Configuration Summary:${NC}"
    echo "  Domain:          $DOMAIN"
    echo "  Web Root:        $WEB_ROOT"
    echo "  Nginx Config:    $NGINX_CONF"
    echo "  Deploy User:     $DEPLOY_USER"
    echo "  SSH Port:        $SSH_PORT"
    echo "  Server IP:       $SERVER_IP"
    echo ""
    echo -e "${YELLOW}GitHub Actions Secrets Configuration:${NC}"
    echo "  Add these secrets to your GitHub repository:"
    echo ""
    echo "  SERVER_HOST      = $SERVER_IP"
    echo "  SERVER_USER      = $DEPLOY_USER"
    echo "  SERVER_PORT      = $SSH_PORT"
    echo "  SSH_PRIVATE_KEY  = (paste your private key content)"
    echo ""
    if [[ -z "$GITHUB_PUBKEY" ]]; then
        echo -e "${YELLOW}⚠️  GitHub Deploy Key Not Set${NC}"
        echo "  To add later, run:"
        echo "  echo 'YOUR_PUBLIC_KEY' >> /home/$DEPLOY_USER/.ssh/authorized_keys"
        echo ""
    fi
    echo -e "${YELLOW}Useful Commands:${NC}"
    echo "  Check Nginx:      systemctl status nginx"
    echo "  Test Config:      nginx -t"
    echo "  Reload Nginx:     systemctl reload nginx"
    echo "  View Logs:        tail -f /var/log/nginx/${DOMAIN}.access.log"
    echo "  Check Firewall:   ufw status"
    echo "  Check Fail2Ban:   fail2ban-client status"
    echo ""
    echo -e "${YELLOW}Deploy Script:${NC}"
    echo "  /home/$DEPLOY_USER/deploy.sh <archive> <target_dir>"
    echo ""
    echo "  Setup log: $LOG_FILE"
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
}

# =============================================================================
# Main Execution
# =============================================================================
main() {
    print_banner
    
    # Pre-flight checks
    check_root
    check_os
    
    # Create log file
    touch "$LOG_FILE"
    chmod 644 "$LOG_FILE"
    
    # Interactive configuration
    interactive_config
    
    log_info "Starting TikMatrix VPS setup..."
    
    # Execute all setup steps
    setup_system
    setup_deploy_user
    setup_firewall
    setup_fail2ban
    setup_nginx
    setup_optimization
    setup_security
    setup_ssl
    setup_deploy_script
    
    # Final nginx restart
    systemctl restart nginx
    
    # Print summary
    print_summary
}

# Run main function
main "$@"
