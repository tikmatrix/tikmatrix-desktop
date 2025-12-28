# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Environment

- OS: Ubuntu 22.04 LTS
- Web Server: Nginx

## Quick Setup (One-Click)

For new VPS, run the interactive setup script to automatically configure everything:

```bash
# Download and run the setup script
curl -fsSL https://raw.githubusercontent.com/tikmatrix/www.tikmatrix.com/main/scripts/setup-vps.sh -o setup-vps.sh
chmod +x setup-vps.sh
sudo ./setup-vps.sh
```

Or clone the repository first:

```bash
git clone https://github.com/tikmatrix/www.tikmatrix.com.git
cd www.tikmatrix.com
chmod +x scripts/setup-vps.sh
sudo ./scripts/setup-vps.sh
```

The interactive script will guide you through:

- ✅ Select site (tikmatrix.com, igmatrix.com, ytmatrix.com, tikzenx.com, or custom)
- ✅ Configure SSH port
- ✅ Add GitHub Actions deploy key
- ✅ Setup SSL certificate (optional, with HTTP or Route 53 validation)
- ✅ Install and configure Nginx with security hardening
- ✅ Setup UFW firewall and Fail2Ban
- ✅ Create deploy user with proper permissions
- ✅ Configure auto-backup and auto-renewal

## GitHub Actions Configuration

After running the setup script, configure these secrets in your GitHub repository:

| Secret | Value | Description |
|--------|-------|-------------|
| `SERVER_HOST` | Your server IP | Primary server IP address |
| `SERVER_HOST_2` | Second server IP | (Optional) Secondary server |
| `SERVER_USER` | `deploy` | Deploy user created by script |
| `SERVER_PORT` | `22` | SSH port (or custom port) |
| `SSH_PRIVATE_KEY` | Private key content | Ed25519 private key |

### Generate SSH Key Pair

```bash
# Generate key pair locally
ssh-keygen -t ed25519 -C "github-actions-deploy" -f github_deploy_key -N ""

# Display public key (add this during VPS setup)
cat github_deploy_key.pub

# Display private key (add this as GitHub secret SSH_PRIVATE_KEY)
cat github_deploy_key
```

### Deployment Directories

| Site | Directory |
|------|-----------|
| tikmatrix.com | `/var/www.tikmatrix.com` |
| igmatrix.com | `/var/www.igmatrix.com` |
| ytmatrix.com | `/var/www.ytmatrix.com` |
| tikzenx.com | `/var/www.tikzenx.com` |

## Manual SSL Setup (if skipped during installation)

### HTTP Validation (DNS must point to server)

```bash
sudo certbot --nginx -d tikmatrix.com -d www.tikmatrix.com --agree-tos --no-eff-email
```

### Route 53 DNS Validation

```bash
export AWS_ACCESS_KEY_ID="your_access_key_id"
export AWS_SECRET_ACCESS_KEY="your_secret_access_key"
sudo certbot -i nginx -d tikmatrix.com -d www.tikmatrix.com --dns-route53 --agree-tos --no-eff-email
```

## Useful Commands

```bash
# Check Nginx status
systemctl status nginx

# Test Nginx configuration
nginx -t

# Reload Nginx
systemctl reload nginx

# View logs
tail -f /var/log/nginx/tikmatrix.access.log
tail -f /var/log/nginx/tikmatrix.error.log

# Check firewall status
ufw status

# Check Fail2Ban status
fail2ban-client status
```
