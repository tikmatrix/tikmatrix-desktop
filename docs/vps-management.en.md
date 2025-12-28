# VPS Management via GitHub Actions

This document explains how to manage VPS servers through GitHub Actions for automated deployment and operations.

> **2024 Refactoring Note:** We have split the original single `vps-management.yml` workflow into three focused workflows by responsibility, and extracted reusable helper scripts. This greatly improves code readability, maintainability, and extensibility.

## Overview

We provide a two-tier management approach:

1. **Initialization Script** (`init-vps.sh`) - Run once on new VPS to configure base environment
2. **GitHub Actions Workflows** - All subsequent operations automated via GitHub Actions
   - `deploy-site.yml` - Site deployment
   - `server-operations.yml` - Server operations (health check, file push, backup management)
   - `server-config.yml` - Server configuration (Nginx config, SSL certificates)

### Helper Scripts

All workflows are built on reusable helper scripts in the `scripts/` directory:

- `lib-common.sh` - Common function library
- `deploy-site.sh` - Site deployment logic
- `health-check.sh` - Health check logic
- `backup-manage.sh` - Backup management logic
- `push-files.sh` - File push logic
- `ssl-renew.sh` - SSL renewal logic
- `nginx-config.sh` - Nginx configuration logic

## Initialize New VPS

### Prerequisites

- Ubuntu 22.04 LTS or Debian 11+ system
- Root access
- Internet connectivity

### Step 1: Generate SSH Key Pair

Generate SSH key pair on your local machine (if you haven't already):

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy_key
```

This generates two files:

- `~/.ssh/github_deploy_key` - Private key (configure in GitHub Secrets)
- `~/.ssh/github_deploy_key.pub` - Public key (configure on VPS)

### Step 2: Run Initialization Script on VPS

SSH into the new VPS and execute:

```bash
# Download initialization script
curl -O https://raw.githubusercontent.com/tikmatrix/tikmatrix-desktop/main/scripts/init-vps.sh

# Set execute permission
chmod +x init-vps.sh

# Set public key environment variable (use your generated public key content)
export GITHUB_PUBKEY="ssh-ed25519 AAAAC3Nza... your-public-key-here"

# Optional: Custom SSH port (default 22)
export SSH_PORT=22

# Run initialization script
sudo ./init-vps.sh
```

The script will automatically install and configure:

- ✅ System updates and essential packages
- ✅ Deploy user and SSH key authentication
- ✅ UFW firewall (open SSH, HTTP, HTTPS)
- ✅ Fail2Ban security protection
- ✅ Nginx web server
- ✅ Certbot SSL certificate tool
- ✅ System optimization and security hardening

### Step 3: Configure GitHub Secrets

Configure the following Secrets in your GitHub repository (Settings → Secrets and variables → Actions):

**Required Secrets:**

- `SSH_PRIVATE_KEY` - SSH private key content (content of `~/.ssh/github_deploy_key`)

**Optional Secrets (for Route53 SSL validation):**

- `AWS_ACCESS_KEY_ID` - AWS Access Key ID
- `AWS_SECRET_ACCESS_KEY` - AWS Secret Key

### Step 4: Update Deployment Configuration

Edit `deploy-config.json` to add new server information:

```json
{
  "servers": [
    {
      "id": "server-new",
      "host": "your-server-ip",
      "port": 22,
      "user": "deploy"
    }
  ],
  "sites": [
    {
      "name": "tikmatrix",
      "domain": "tikmatrix.com",
      "branch": "main",
      "brandReplace": false,
      "deployTo": ["server-new"]
    }
  ]
}
```

## Manage VPS via GitHub Actions

After initialization, all subsequent operations can be done through GitHub Actions.

### Available Workflows

We have split VPS management operations into three independent workflows with clearer responsibilities and easier usage:

#### Workflow 1: Deploy Site

Used for building and deploying sites to VPS servers.

Visit the **Actions** tab in your GitHub repository, select **Deploy Site** workflow, and click **Run workflow**.

#### 1. Deploy Site (Deploy Site workflow)

Build and deploy site to VPS.

**Parameters:**

- `site`: Select site to deploy (tikmatrix, igmatrix, ytmatrix, tikzenx)
- `server`: Target server (leave empty to deploy to all configured servers for this site)

**Example:**

```
Deploy TikMatrix site to all configured servers
- site: tikmatrix
- server: (empty)
```

**Workflow:**

1. Determine target servers based on configuration
2. Install dependencies and build project
3. Run brand replacement if needed
4. Create deployment archive
5. Deploy to all target servers in parallel
6. Automatically create backups (keep last 3)

---

#### Workflow 2: Server Operations

Used for daily server operations.

Visit the **Actions** tab in your GitHub repository, select **Server Operations** workflow, and click **Run workflow**.

**Supported operations:**

- `health-check` - Health check
- `push-files` - Push files
- `manage-backup` - Backup management

#### 2. Health Check (health-check)

Check server status and service health.

**Parameters:**

- `operation`: Select `health-check`
- `server`: Target server (leave empty to check all servers)

**Checks:**

- ✅ System info (OS, uptime)
- ✅ Disk usage
- ✅ Memory usage
- ✅ Nginx status and configuration
- ✅ Firewall status
- ✅ Fail2Ban status
- ✅ Configured sites list
- ✅ SSL certificates list

#### 3. Push Files (push-files)

Push any files or directories to server with automatic overwrite and post-upload command execution.

**Parameters:**

- `operation`: Select `push-files`
- `local_path`: Local path (e.g., `./scripts`)
- `remote_path`: Remote path (e.g., `/home/deploy/scripts`)
- `post_upload_commands`: Commands to run after upload (optional, e.g., `sudo nginx -t && sudo nginx -s reload`)
- `server`: Target server (optional)

**Features:**

- ✅ Automatically creates remote directory if it doesn't exist
- ✅ Automatically overwrites existing files (using `rsync --delete`)
- ✅ Supports post-upload command execution (e.g., reload config, restart service)

**Example 1 - Push configuration files:**

```
Push configuration files to server
- operation: push-files
- local_path: ./config
- remote_path: /etc/myapp/config
- server: server-us
```

**Example 2 - Update Nginx config and reload:**

```
Update Nginx configuration and automatically reload
- operation: push-files
- local_path: ./nginx-configs
- remote_path: /etc/nginx/conf.d
- post_upload_commands: sudo nginx -t && sudo nginx -s reload
- server: server-us
```

#### 4. Manage Backup (manage-backup)

Create or list site backups.

**Parameters:**

- `operation`: Select `manage-backup`
- `backup_action`: `create` or `list`
- `backup_site`: Site domain (required for create, e.g., `tikmatrix.com`)
- `server`: Target server (optional)

**Examples:**

```
Create TikMatrix site backup
- operation: manage-backup
- backup_action: create
- backup_site: tikmatrix.com
- server: server-us

List all backups
- operation: manage-backup
- backup_action: list
```

---

#### Workflow 3: Server Configuration

Used for Nginx and SSL certificate configuration management.

Visit the **Actions** tab in your GitHub repository, select **Server Configuration** workflow, and click **Run workflow**.

**Supported operations:**

- `configure-nginx` - Configure Nginx
- `renew-ssl` - Renew SSL certificates

#### 5. Configure Nginx (configure-nginx)

Configure Nginx site for new domain.

**Parameters:**

- `operation`: Select `configure-nginx`
- `domain`: Domain name (e.g., `example.com`)
- `site_type`: `static` (static site) or `proxy` (reverse proxy)
- `proxy_backend`: Backend URL (only for proxy type, e.g., `http://127.0.0.1:3000`)
- `enable_ssl`: Enable SSL certificate setup
- `ssl_method`: `http` (HTTP validation) or `route53` (DNS validation)
- `server`: Target server (optional)

**Example 1 - Static Site:**

```
Configure new static site
- operation: configure-nginx
- domain: newsite.com
- site_type: static
- enable_ssl: true
- ssl_method: http
```

**Example 2 - Reverse Proxy:**

```
Configure reverse proxy to local service
- operation: configure-nginx
- domain: api.example.com
- site_type: proxy
- proxy_backend: http://127.0.0.1:3000
- enable_ssl: true
- ssl_method: route53
```

#### 6. Renew SSL (renew-ssl)

Manually trigger SSL certificate renewal.

**Parameters:**

- `operation`: Select `renew-ssl`
- `server`: Target server (leave empty for all servers)

**Note:** Certbot is configured for auto-renewal (daily at 3 AM). This operation is for manual triggering.

```

## Workflow Examples

### Scenario 1: Deploy New Site to Existing Server

```bash
1. Run VPS Management workflow in GitHub Actions
   - operation: configure-nginx
   - domain: newsite.com
   - site_type: static
   - enable_ssl: true
   - ssl_method: http

2. Update deploy-config.json with new site configuration

3. Run workflow again to deploy site
   - operation: deploy-site
   - site: newsite
```

### Scenario 2: Add New Server

```bash
1. Run init-vps.sh initialization script on new VPS

2. Update deploy-config.json to add new server

3. Commit and push changes

4. Use GitHub Actions to deploy site to new server
   - operation: deploy-site
   - site: tikmatrix
   - server: server-new
```

### Scenario 3: Daily Maintenance

```bash
# Weekly server health check
- operation: health-check

# Regular backups
- operation: manage-backup
- backup_action: create
- backup_site: tikmatrix.com

# View backup list
- operation: manage-backup
- backup_action: list
```

## Security Best Practices

1. **SSH Key Management**
   - Use ED25519 keys (more secure, smaller)
   - Store private key only in GitHub Secrets
   - Rotate keys regularly

2. **Firewall Rules**
   - Only open necessary ports (SSH, HTTP, HTTPS)
   - Use Fail2Ban to prevent brute force attacks

3. **SSL Certificates**
   - Use Let's Encrypt free certificates
   - Configure auto-renewal
   - HTTP validation for most scenarios
   - Route53 validation for internal servers or wildcard certificates

4. **Permission Management**
   - Deploy user has only necessary sudo permissions (configured via `/etc/sudoers.d/deploy`)
   - Web files owned by deploy user, readable by www-data group

   Deploy user's sudo permissions include:
   - Nginx management: `systemctl reload/restart nginx`
   - Systemd service management: `systemctl daemon-reload/enable/start/stop/restart`
   - File permission management: `chown -R deploy:www-data /var/www.*` and `chmod -R 775 /var/www.*`
   - Service file deployment: `mv /tmp/*.service /etc/systemd/system/`

   > **Security Note:** Systemd service management permissions use wildcards to support multiple services in the TikMatrix ecosystem (e.g., tikmatrix-api-rs, igmatrix-api, etc.). These servers are dedicated to TikMatrix deployments and the deploy user is accessed via SSH key authentication. For stricter security policies, the wildcards can be replaced with an explicit list of service names.

   If the sudoers configuration on the server is outdated, run the following command to update it:

   ```bash
   sudo bash scripts/fix-deploy-permissions.sh
   ```

5. **Backup Strategy**
   - Auto-keep last 3 deployment backups
   - Create manual backups regularly
   - Backups stored in `/var/backups/www`

## Troubleshooting

### Issue 1: SSH Connection Failed

```bash
# Check if SSH key is correctly configured
ssh -i /path/to/private/key deploy@server-ip

# Check server firewall
sudo ufw status

# View SSH logs
sudo tail -f /var/log/auth.log
```

### Issue 2: Nginx Configuration Error

```bash
# Test configuration
sudo nginx -t

# View error logs
sudo tail -f /var/log/nginx/error.log

# Check site configuration
cat /etc/nginx/conf.d/domain.conf
```

### Issue 3: SSL Certificate Acquisition Failed

```bash
# HTTP validation failed - check if DNS points to server
dig domain.com

# Route53 validation failed - check AWS credentials
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
sudo certbot certificates
```

### Issue 4: Deployment Failed

```bash
# Check disk space
df -h

# Check permissions
ls -la /var/www/domain.com

# View deployment logs
# Check GitHub Actions workflow run details
```

### Issue 5: sudo Permission Error

If you encounter errors like the following during GitHub Actions deployment:

```
sudo: a terminal is required to read the password; either use the -S option to read from standard input or configure an askpass helper
sudo: a password is required
```

This usually means the deploy user doesn't have NOPASSWD sudo permission for specific commands. Solution:

1. SSH into the server
2. Run the permission fix script:

   ```bash
   sudo bash scripts/fix-deploy-permissions.sh
   ```

3. Verify sudoers configuration:

   ```bash
   sudo cat /etc/sudoers.d/deploy
   ```

4. Re-run the failed GitHub Actions workflow

## Advanced Features

### Custom Domain Configuration

To configure Nginx for subdomains or special domains:

```bash
# Use configure-nginx operation
- operation: configure-nginx
- domain: subdomain.example.com
- site_type: static
```

The script automatically detects:

- Root domains (e.g., `example.com`) configure both `example.com` and `www.example.com`
- Subdomains (e.g., `api.example.com`) configure single domain only

### Advanced Reverse Proxy Configuration

For scenarios requiring proxy to backend services:

```bash
- operation: configure-nginx
- domain: api.example.com
- site_type: proxy
- proxy_backend: http://127.0.0.1:3000
```

Generated configuration includes:

- WebSocket support
- Connection keepalive
- Security headers
- Gzip compression

### Batch Operations

Using `deployTo` configuration in `deploy-config.json`, you can deploy to multiple servers at once:

```json
{
  "sites": [
    {
      "name": "tikmatrix",
      "deployTo": ["server-us", "server-dublin", "server-sgp"]
    }
  ]
}
```

Deployments will automatically run in parallel to all configured servers.

## Logs and Monitoring

- **Nginx Access Logs**: `/var/log/nginx/{domain}.access.log`
- **Nginx Error Logs**: `/var/log/nginx/{domain}.error.log`
- **Initialization Logs**: `/var/log/tikmatrix-init.log`
- **Site Backups**: `/var/backups/www/`

## Contributing

Issues and Pull Requests are welcome to improve this management system.

## License

MIT License
