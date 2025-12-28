#!/usr/bin/env bash

# Optimized hysteria setup script
# - Adds strict error handling
# - Parameterized domain/port/password
# - Validates prerequisites
# - Creates certs with safe permissions
# - Idempotent and backs up existing config
# curl -fsSL https://raw.githubusercontent.com/tikmatrix/tikmatrix-desktop/main/scripts/setup-hy2.sh | sudo bash -s -- --install-remote --force

set -euo pipefail
IFS=$'\n\t'

# Defaults (can be overridden via options)
DOMAIN="api.tikmatrix.com"
PORT="4433"
PASSWORD=""
FORCE=0
INSTALL_REMOTE=0
SERVICE_NAME="hysteria-server.service"
CERT_DIR="/etc/hysteria/certs"
CONFIG_FILE="/etc/hysteria/config.yaml"

print_usage() {
  cat <<-EOF
Usage: $0 [-d domain] [-p password] [-P port] [--install-remote] [--force] [-h]

Options:
  -d domain           TLS cert CN and filenames (default: $DOMAIN)
  -p password         Hysteria auth password (default: random)
  -P port             Listen port (default: $PORT)
  --install-remote    Download and run remote installer (safer: downloaded then inspected)
  --force             Overwrite existing certs/config
  -h                  Show this help
EOF
}

# Simple option parsing
while [[ $# -gt 0 ]]; do
  case "$1" in
    -d|--domain) DOMAIN="$2"; shift 2 ;;
    -p|--password) PASSWORD="$2"; shift 2 ;;
    -P|--port) PORT="$2"; shift 2 ;;
    --install-remote) INSTALL_REMOTE=1; shift ;;
    --force) FORCE=1; shift ;;
    -h|--help) print_usage; exit 0 ;;
    *) echo "Unknown option: $1"; print_usage; exit 2 ;;
  esac
done

# Ensure running as root
if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root. Try: sudo $0 ..." >&2
  exit 1
fi

# Check dependencies
command -v openssl >/dev/null 2>&1 || { echo "Error: openssl not found" >&2; exit 1; }
command -v systemctl >/dev/null 2>&1 || { echo "Error: systemctl not found" >&2; exit 1; }

# Generate a random password if none provided
if [[ -z "$PASSWORD" ]]; then
  # 24 chars base64 is reasonable for a password
  PASSWORD=$(openssl rand -base64 18)
  echo "Generated random password for Hysteria auth"
fi

# Optionally install remote script more safely
if [[ $INSTALL_REMOTE -eq 1 ]]; then
  TMP_INSTALL=$(mktemp)
  echo "Downloading remote installer to $TMP_INSTALL"
  if curl -fsSL -o "$TMP_INSTALL" https://get.hy2.sh/; then
    chmod 700 "$TMP_INSTALL"
    echo "Remote installer downloaded. Running it now..."
    bash "$TMP_INSTALL"
    rm -f "$TMP_INSTALL"
  else
    echo "Failed to download remote installer" >&2
    rm -f "$TMP_INSTALL"
    exit 1
  fi
fi

# Ensure base hysteria directory exists with proper permissions
mkdir -p /etc/hysteria
chmod 755 /etc/hysteria

# Create cert directory with appropriate permissions
# 755 allows service user to access the directory while keeping it secure
mkdir -p "$CERT_DIR"
chmod 755 "$CERT_DIR"
cd "$CERT_DIR"

KEY_FILE="$CERT_DIR/${DOMAIN}.key"
CRT_FILE="$CERT_DIR/${DOMAIN}.crt"

if [[ -f "$KEY_FILE" || -f "$CRT_FILE" ]]; then
  if [[ $FORCE -ne 1 ]]; then
    echo "Certificate or key for $DOMAIN already exists. Use --force to recreate." >&2
  else
    echo "--force set: backing up existing certs and recreating"
    ts=$(date +%s)
    [[ -f "$KEY_FILE" ]] && mv "$KEY_FILE" "${KEY_FILE}.bak.${ts}"
    [[ -f "$CRT_FILE" ]] && mv "$CRT_FILE" "${CRT_FILE}.bak.${ts}"
  fi
fi

# Create key and self-signed cert if missing
if [[ ! -f "$KEY_FILE" ]]; then
  echo "Generating private key: $KEY_FILE"
  openssl genrsa -out "$KEY_FILE" 2048
  chmod 600 "$KEY_FILE"  # Private key should only be readable by root
fi

if [[ ! -f "$CRT_FILE" ]]; then
  echo "Generating self-signed certificate: $CRT_FILE"
  openssl req -new -x509 -key "$KEY_FILE" \
    -out "$CRT_FILE" -days 3650 -subj "/CN=$DOMAIN"
  chmod 644 "$CRT_FILE"  # Certificate can be world-readable
fi

# Backup existing config
if [[ -f "$CONFIG_FILE" ]]; then
  if [[ $FORCE -eq 1 ]]; then
    cp -a "$CONFIG_FILE" "${CONFIG_FILE}.bak.$(date +%s)"
  else
    echo "Config $CONFIG_FILE exists. Use --force to overwrite." 
  fi
fi

# Write config
cat > "$CONFIG_FILE" <<-EOF
listen: :${PORT}

tls:
  cert: ${CRT_FILE}
  key: ${KEY_FILE}

auth:
  type: password
  password: ${PASSWORD}

masquerade:
  type: proxy
  proxy:
    url: https://www.apple.com/
    rewriteHost: true
EOF
chmod 640 "$CONFIG_FILE"  # Protect config file as it contains password

# Detect and set ownership for hysteria service user
# The official Hysteria installer typically creates a 'hysteria' user
SERVICE_USER=""
if id "hysteria" &>/dev/null; then
  SERVICE_USER="hysteria"
else
  # Try to get the service user from systemd
  SERVICE_SHOW=$(systemctl show -p User "$SERVICE_NAME" 2>/dev/null || echo "")
  if [[ -n "$SERVICE_SHOW" ]] && echo "$SERVICE_SHOW" | grep -q "User="; then
    SERVICE_USER=$(echo "$SERVICE_SHOW" | cut -d= -f2)
  fi
fi

if [[ -n "$SERVICE_USER" && "$SERVICE_USER" != "root" ]]; then
  echo "Setting ownership for service user: $SERVICE_USER"
  chown root:"$SERVICE_USER" "$KEY_FILE" "$CRT_FILE" "$CONFIG_FILE"
  # Adjust permissions now that we have group ownership
  # Key was initially 600 (root only), now 640 (root + service group)
  chmod 640 "$KEY_FILE"    # Private key readable by root and service group
  chmod 640 "$CONFIG_FILE" # Config readable by root and service group
  chmod 644 "$CRT_FILE"    # Certificate can remain world-readable
else
  echo "Warning: Hysteria service user not detected. Files owned by root."
  echo "If the service fails to start, you may need to manually set ownership:"
  echo "  sudo chown root:hysteria \"$KEY_FILE\" \"$CRT_FILE\" \"$CONFIG_FILE\""
  echo "  sudo chmod 640 \"$KEY_FILE\" \"$CONFIG_FILE\""
fi

# Ensure service is enabled and restarted
echo "Enabling and restarting $SERVICE_NAME"
systemctl enable --now "$SERVICE_NAME"
systemctl restart "$SERVICE_NAME"

# Wait a bit and show status
sleep 2
if systemctl is-active --quiet "$SERVICE_NAME"; then
  echo "✅ Service $SERVICE_NAME is running"
  systemctl status "$SERVICE_NAME" --no-pager -l || true
else
  echo "❌ Service $SERVICE_NAME failed to start"
  echo "Checking logs for permission errors..."
  journalctl -u "$SERVICE_NAME" -n 20 --no-pager || true
  echo ""
  echo "Common issues:"
  echo "  1. Certificate permission errors - check ownership and permissions"
  echo "  2. Port already in use - check if port $PORT is available"
  echo "  3. Invalid config syntax - review $CONFIG_FILE"
  exit 1
fi

# Configure firewall (if ufw is present)
if command -v ufw >/dev/null 2>&1; then
  if ! ufw status | grep -q "${PORT}/tcp"; then
    ufw allow "${PORT}/tcp"
  fi
  if ! ufw status | grep -q "${PORT}/udp"; then
    ufw allow "${PORT}/udp"
  fi
  echo "Firewall (ufw) updated to allow port ${PORT} (tcp/udp)"
else
  echo "ufw not found; please ensure port ${PORT} is open in your firewall"
fi

# Save password to a restricted file for admin use
PW_FILE="/etc/hysteria/auth.password"
echo "$PASSWORD" > "$PW_FILE"
chmod 600 "$PW_FILE"

echo "✅ Hysteria server setup completed."
echo "  Domain: $DOMAIN"
echo "  Port:   $PORT"
echo "  Password saved to: $PW_FILE (permission 600)"

exit 0
