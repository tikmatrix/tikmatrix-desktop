# Scripts Directory

This directory contains scripts for VPS management and deployment automation.

## Available Scripts

### 1. `init-vps.sh` ⭐ **Recommended for GitHub Actions**

**Purpose:** Non-interactive VPS initialization script for GitHub Actions automation.

**Usage:**
```bash
# On new VPS (run as root)
export GITHUB_PUBKEY="ssh-ed25519 AAAAC3... your-public-key"
export SSH_PORT=22  # optional, default is 22
sudo ./init-vps.sh
```

**What it does:**
- Sets up deploy user with SSH key authentication
- Installs Nginx, Certbot, Fail2Ban, and essential packages
- Configures firewall (UFW) and security hardening
- Prepares VPS for GitHub Actions management
- **No interactive prompts** - reads from environment variables

**After running this:**
- Configure `SSH_PRIVATE_KEY` in GitHub Secrets
- Use GitHub Actions workflows for all operations
- See `docs/vps-management.md` for full workflow

---

### 2. `setup-vps.sh` - Interactive Setup

**Purpose:** Interactive, full-featured VPS setup script for manual configuration.

**Usage:**
```bash
# On new VPS (run as root)
sudo ./setup-vps.sh
```

**What it does:**
- Everything `init-vps.sh` does, plus:
- Interactive prompts for domain, SSL, site type
- Immediate site configuration (static or reverse proxy)
- Can add multiple sites to same VPS
- SSL certificate setup during installation

**Best for:**
- Manual VPS setup without GitHub Actions
- Quick one-time server configuration
- Learning how the system works

---

### 3. `fix-deploy-permissions.sh`

**Purpose:** Fix file permissions for web deployment directories.

**Usage:**
```bash
sudo ./fix-deploy-permissions.sh
```

**What it does:**
- Sets correct ownership (deploy:www-data)
- Sets correct permissions (775)
- Fixes ACLs for deployment directories

---

### 4. Helper Scripts for GitHub Actions

These scripts are used by the GitHub Actions workflows and can also be run manually:

#### `lib-common.sh`
Common library functions for all VPS management scripts.

#### `deploy-site.sh`
Deploy a site archive to a VPS server.
```bash
./deploy-site.sh <server_id> <site_name> <archive_path>
```

#### `health-check.sh`
Run health checks on a VPS server.
```bash
./health-check.sh <server_id>
```

#### `backup-manage.sh`
Manage backups on a VPS server.
```bash
./backup-manage.sh <server_id> <action> [site]
# Actions: list, create
```

#### `push-files.sh`
Push files to a VPS server using rsync.
```bash
./push-files.sh <server_id> <local_path> <remote_path> [post_commands]
```

#### `ssl-renew.sh`
Renew SSL certificates on a VPS server.
```bash
./ssl-renew.sh <server_id>
```

#### `nginx-config.sh`
Configure Nginx for a domain on a VPS server.
```bash
./nginx-config.sh <server_id> <domain> <site_type> [proxy_backend] [enable_ssl] [ssl_method]
```

---

## Which Script Should I Use?

### For GitHub Actions Automation (Recommended) ✅

1. Run `init-vps.sh` once on new VPS
2. Use GitHub Actions workflows for everything else:
   - Deploy sites
   - Configure domains
   - Manage backups
   - Check server health
   - Renew SSL certificates

**Advantages:**
- Centralized management
- Version controlled operations
- Audit trail in GitHub
- No need to SSH into servers
- Consistent deployments

### For Manual Setup

Use `setup-vps.sh` if:
- You prefer interactive configuration
- You don't use GitHub Actions
- You want to quickly set up a server manually
- You're testing or learning

## Comparison

| Feature | init-vps.sh | setup-vps.sh |
|---------|-------------|--------------|
| **Mode** | Non-interactive | Interactive |
| **Purpose** | GitHub Actions prep | Full manual setup |
| **Site Config** | Via GitHub Actions | During installation |
| **SSL Setup** | Via GitHub Actions | During installation |
| **Multi-site** | Via GitHub Actions | Via re-run |
| **Best for** | Automation | Manual setup |

## Related Documentation

- **Full Guide:** `docs/vps-management.md`
- **Quick Start:** `docs/vps-management-quickstart.md`
- **English Docs:** `docs/vps-management.en.md`
- **Workflows:**
  - `deploy-site.yml` - Site deployment
  - `server-operations.yml` - Health checks, file push, backups
  - `server-config.yml` - Nginx and SSL configuration

## Examples

### Example 1: Automated Setup

```bash
# On new VPS (one-time)
export GITHUB_PUBKEY="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIExample..."
sudo ./init-vps.sh

# Then use GitHub Actions for:
# - Deploying sites
# - Configuring Nginx
# - Managing SSL
# - Creating backups
# - Health checks
```

### Example 2: Manual Setup

```bash
# On new VPS
sudo ./setup-vps.sh

# Follow interactive prompts:
# - Choose site (tikmatrix, igmatrix, etc.)
# - Choose site type (static or proxy)
# - Configure SSL (yes/no)
# - Enter GitHub public key
```

## Troubleshooting

### init-vps.sh Issues

**Problem:** Script fails to add SSH key

**Solution:**
```bash
# Verify public key format
echo "$GITHUB_PUBKEY"  # Should start with ssh-ed25519 or ssh-rsa

# Manually add key
echo "your-public-key" | sudo tee -a /home/deploy/.ssh/authorized_keys
```

**Problem:** Can't connect after initialization

**Solution:**
```bash
# Check SSH key was added correctly
sudo cat /home/deploy/.ssh/authorized_keys

# Check firewall allows SSH
sudo ufw status

# Test connection
ssh -i ~/.ssh/private_key deploy@server-ip
```

### setup-vps.sh Issues

**Problem:** Nginx configuration test fails

**Solution:**
```bash
# Check syntax
sudo nginx -t

# View error details
sudo tail -f /var/log/nginx/error.log
```

**Problem:** SSL certificate acquisition fails

**Solution:**
```bash
# Verify DNS points to server
dig yourdomain.com

# Try manual certbot
sudo certbot --nginx -d yourdomain.com
```

## Support

For issues or questions:
1. Check documentation in `docs/` directory
2. Review GitHub Actions logs
3. Open an issue on GitHub

## License

MIT License
