#!/bin/bash
# Common library functions for VPS management scripts
# Usage: source scripts/lib-common.sh

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}" >&2
}

# Validate required environment variable
require_env() {
    local var_name="$1"
    local var_value="${!var_name:-}"
    
    if [[ -z "$var_value" ]]; then
        log_error "Required environment variable $var_name is not set"
        exit 1
    fi
}

# Setup SSH configuration
setup_ssh() {
    local ssh_key="$1"
    local ssh_dir="${HOME}/.ssh"
    local key_file="${ssh_dir}/deploy_key"
    
    log_info "Setting up SSH configuration"
    
    mkdir -p "$ssh_dir"
    echo "$ssh_key" > "$key_file"
    chmod 600 "$key_file"
    
    log_success "SSH key configured"
    echo "$key_file"
}

# Cleanup SSH key
cleanup_ssh() {
    local key_file="${HOME}/.ssh/deploy_key"
    
    if [[ -f "$key_file" ]]; then
        rm -f "$key_file"
        log_info "SSH key cleaned up"
    fi
}

# Execute SSH command
ssh_exec() {
    local host="$1"
    local port="$2"
    local user="$3"
    local key_file="$4"
    shift 4
    local command="$*"
    
    ssh -i "$key_file" -p "$port" \
        -o StrictHostKeyChecking=no \
        -o UserKnownHostsFile=/dev/null \
        -o ConnectTimeout=10 \
        "$user@$host" "$command"
}

# Execute SCP upload
scp_upload() {
    local host="$1"
    local port="$2"
    local user="$3"
    local key_file="$4"
    local local_path="$5"
    local remote_path="$6"
    
    scp -i "$key_file" -P "$port" \
        -o StrictHostKeyChecking=no \
        -o UserKnownHostsFile=/dev/null \
        -o ConnectTimeout=10 \
        "$local_path" "$user@$host:$remote_path"
}

# Execute rsync
rsync_upload() {
    local host="$1"
    local port="$2"
    local user="$3"
    local key_file="$4"
    local local_path="$5"
    local remote_path="$6"
    
    rsync -avz --progress --delete \
        -e "ssh -i $key_file -p $port -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" \
        "$local_path/" \
        "$user@$host:$remote_path/"
}

# Parse JSON config and get server details
get_server_config() {
    local config_file="$1"
    local server_id="$2"
    
    if [[ ! -f "$config_file" ]]; then
        log_error "Config file not found: $config_file"
        exit 1
    fi
    
    local server_json
    server_json=$(jq -r --arg id "$server_id" '.servers[] | select(.id == $id)' "$config_file")
    
    if [[ -z "$server_json" || "$server_json" == "null" ]]; then
        log_error "Server '$server_id' not found in config"
        exit 1
    fi
    
    echo "$server_json"
}

# Get site configuration
get_site_config() {
    local config_file="$1"
    local site_name="$2"
    
    if [[ ! -f "$config_file" ]]; then
        log_error "Config file not found: $config_file"
        exit 1
    fi
    
    local site_json
    site_json=$(jq -r --arg name "$site_name" '.sites[] | select(.name == $name)' "$config_file")
    
    if [[ -z "$site_json" || "$site_json" == "null" ]]; then
        log_error "Site '$site_name' not found in config"
        exit 1
    fi
    
    echo "$site_json"
}
