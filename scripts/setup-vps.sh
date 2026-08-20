#!/bin/bash
# =============================================================================
# TikMatrix VPS Bootstrap v2.0
#
# Scope: ONLY what must exist before GitHub Actions can reach the box —
#   1. the `deploy` user
#   2. its SSH authorized_keys (GitHub Actions public key)
#   3. passwordless sudo for that user
#
# Everything else (packages, firewall, fail2ban, nginx, certbot, kernel
# hardening, limits) is handled by the `server-provision` operation in
# .github/workflows/server-operations.yml — run it right after this script.
#
# Usage: sudo ./setup-vps.sh
# =============================================================================

set -euo pipefail

DEPLOY_USER="deploy"
LOG_FILE="/var/log/tikmatrix-setup.log"
GITHUB_PUBKEY=""
SSH_PORT="22"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# =============================================================================
# Helpers
# =============================================================================
# Log to stdout always; to $LOG_FILE only once it exists and is writable.
_log() {
    local level="$1" color="$2" msg="$3"
    echo -e "${color}[${level}]${NC} $msg"
    if [[ -w "$LOG_FILE" ]]; then
        echo "[$level] $(date '+%Y-%m-%d %H:%M:%S') $msg" >> "$LOG_FILE"
    fi
}

log_info()    { _log INFO    "$BLUE"   "$1"; }
log_success() { _log SUCCESS "$GREEN"  "$1"; }
log_warning() { _log WARNING "$YELLOW" "$1"; }
log_error()   { _log ERROR   "$RED"    "$1"; }

command_exists() { command -v "$1" &>/dev/null; }

print_banner() {
    echo -e "${CYAN}"
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║                                                               ║"
    echo "║             TikMatrix VPS Bootstrap  v2.0                     ║"
    echo "║                                                               ║"
    echo "║  Creates the deploy user and installs the GitHub Actions key. ║"
    echo "║  Run 'server-provision' afterwards for the rest.              ║"
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

    # shellcheck disable=SC1091
    source /etc/os-release
    if [[ "${ID:-}" != "ubuntu" && "${ID:-}" != "debian" ]]; then
        log_warning "This script targets Ubuntu/Debian. Current OS: ${ID:-unknown}"
        read -rp "Continue anyway? (y/n): " -n 1 reply
        echo
        [[ "$reply" =~ ^[Yy]$ ]] || exit 1
    fi
    log_info "Detected OS: ${PRETTY_NAME:-${ID:-unknown}}"
}

# Detect the port sshd actually listens on — display only, nothing is changed.
detect_ssh_port() {
    local port
    port=$(sshd -T 2>/dev/null | awk '/^port /{print $2; exit}') || true
    SSH_PORT="${port:-22}"
}

# =============================================================================
# Interactive configuration
# =============================================================================
interactive_config() {
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}                    Configuration Setup                         ${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}GitHub Actions SSH Public Key:${NC}"
    echo "  Used by GitHub Actions to deploy and run server operations."
    echo "  Generate with: ssh-keygen -t ed25519 -C 'github-actions'"
    echo "  Paste the PUBLIC key (starts with 'ssh-ed25519' or 'ssh-rsa')."
    echo "  Leave empty to skip (you can add it later)."
    echo ""

    while true; do
        read -rp "GitHub deploy public key: " GITHUB_PUBKEY
        [[ -z "$GITHUB_PUBKEY" ]] && break

        if printf '%s\n' "$GITHUB_PUBKEY" | ssh-keygen -l -f - &>/dev/null; then
            break
        fi
        log_error "That does not look like a valid SSH public key. Try again (or press Enter to skip)."
    done

    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}                    Configuration Summary                       ${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo "  Deploy User:     $DEPLOY_USER"
    echo "  SSH Port:        $SSH_PORT (detected, unchanged)"
    if [[ -n "$GITHUB_PUBKEY" ]]; then
        echo "  GitHub Key:      $(printf '%s\n' "$GITHUB_PUBKEY" | ssh-keygen -l -f - 2>/dev/null || echo 'Provided')"
    else
        echo "  GitHub Key:      Not provided (add later)"
    fi
    echo ""

    read -rp "Proceed with these settings? (y/n): " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        log_info "Setup cancelled by user."
        exit 0
    fi
}

# =============================================================================
# Prerequisite: sudo must exist for the deploy user to be useful
# =============================================================================
ensure_sudo() {
    if command_exists sudo; then
        return 0
    fi
    log_warning "sudo is not installed — installing it (required by every server operation)."
    export DEBIAN_FRONTEND=noninteractive
    apt-get update -qq
    apt-get install -y sudo
    log_success "sudo installed."
}

# =============================================================================
# Deploy user
# =============================================================================
setup_deploy_user() {
    log_info "Setting up deploy user..."

    if ! id "$DEPLOY_USER" &>/dev/null; then
        useradd -m -s /bin/bash "$DEPLOY_USER"
        log_info "Created user: $DEPLOY_USER"
    else
        log_warning "User $DEPLOY_USER already exists, updating configuration."
    fi

    # Resolve the real home directory instead of assuming /home/$DEPLOY_USER —
    # a pre-existing account may live elsewhere.
    local home ssh_dir auth_keys
    home=$(getent passwd "$DEPLOY_USER" | cut -d: -f6)
    if [[ -z "$home" ]]; then
        log_error "Could not resolve home directory for $DEPLOY_USER."
        exit 1
    fi
    ssh_dir="$home/.ssh"
    auth_keys="$ssh_dir/authorized_keys"

    mkdir -p "$ssh_dir"
    touch "$auth_keys"
    chmod 700 "$ssh_dir"
    chmod 600 "$auth_keys"
    chown -R "$DEPLOY_USER:$DEPLOY_USER" "$ssh_dir"

    if [[ -n "$GITHUB_PUBKEY" ]]; then
        if grep -qxF "$GITHUB_PUBKEY" "$auth_keys"; then
            log_warning "GitHub deploy key already present in authorized_keys"
        else
            printf '%s\n' "$GITHUB_PUBKEY" >> "$auth_keys"
            log_success "GitHub deploy key added to $auth_keys"
        fi
    fi

    log_success "Deploy user configured (home: $home)."
}

# =============================================================================
# Passwordless sudo — validated before install so a typo cannot break sudo
# =============================================================================
setup_sudoers() {
    log_info "Granting passwordless sudo to $DEPLOY_USER..."

    local tmp
    tmp=$(mktemp)
    cat > "$tmp" << EOF
# Allow deploy user full sudo access for web deployments and system management
# Managed by scripts/setup-vps.sh — see .github/workflows/server-operations.yml
$DEPLOY_USER ALL=(ALL) NOPASSWD: ALL
EOF

    if ! visudo -cf "$tmp" &>/dev/null; then
        rm -f "$tmp"
        log_error "Generated sudoers file is invalid — refusing to install it."
        exit 1
    fi

    install -o root -g root -m 440 "$tmp" /etc/sudoers.d/deploy
    rm -f "$tmp"
    log_success "Sudoers rule installed at /etc/sudoers.d/deploy"
}

# =============================================================================
# Summary
# =============================================================================
print_summary() {
    local server_ip
    server_ip=$(curl -s --connect-timeout 5 ifconfig.me 2>/dev/null \
        || curl -s --connect-timeout 5 icanhazip.com 2>/dev/null \
        || echo 'YOUR_SERVER_IP')

    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}              TikMatrix VPS Bootstrap Complete!                 ${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}Configuration Summary:${NC}"
    echo "  Deploy User:     $DEPLOY_USER"
    echo "  SSH Port:        $SSH_PORT"
    echo "  Server IP:       $server_ip"
    echo ""
    echo -e "${YELLOW}1. Add the server to LinuxConfig/deploy-config.json:${NC}"
    echo ""
    echo "  {"
    echo "    \"id\": \"server-xxx\","
    echo "    \"host\": \"$server_ip\","
    echo "    \"port\": \"$SSH_PORT\","
    echo "    \"user\": \"$DEPLOY_USER\""
    echo "  }"
    echo ""
    echo -e "${YELLOW}2. Ensure the SSH_PRIVATE_KEY repo secret holds the matching private key.${NC}"
    echo ""
    if [[ -z "$GITHUB_PUBKEY" ]]; then
        echo -e "${YELLOW}⚠️  GitHub Deploy Key Not Set${NC}"
        echo "  To add later, run:"
        echo "  echo 'YOUR_PUBLIC_KEY' >> $(getent passwd "$DEPLOY_USER" | cut -d: -f6)/.ssh/authorized_keys"
        echo ""
    fi
    echo -e "${YELLOW}3. Provision the rest from GitHub Actions:${NC}"
    echo ""
    echo "  Actions → Server Operations → Run workflow"
    echo "    operation = server-provision"
    echo "    server    = <this server's id>"
    echo ""
    echo "  That installs packages, iptables rules, fail2ban, nginx, certbot,"
    echo "  kernel hardening and file-descriptor limits."
    echo ""
    echo "  Bootstrap log: $LOG_FILE"
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
}

# =============================================================================
# Main
# =============================================================================
main() {
    print_banner

    check_root
    check_os

    touch "$LOG_FILE"
    chmod 640 "$LOG_FILE"

    detect_ssh_port
    interactive_config

    log_info "Starting TikMatrix VPS bootstrap..."

    ensure_sudo
    setup_deploy_user
    setup_sudoers

    print_summary
}

main "$@"
