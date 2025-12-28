# GitHub Actions Workflow Usage Examples

This document provides practical examples of using the VPS Management workflow.

## Prerequisites

1. VPS initialized with `init-vps.sh`
2. GitHub Secrets configured:
   - `SSH_PRIVATE_KEY` (required)
   - `AWS_ACCESS_KEY_ID` (optional, for Route53)
   - `AWS_SECRET_ACCESS_KEY` (optional, for Route53)
3. Server added to `deploy-config.json`

## Example 1: Deploy TikMatrix Site

**Scenario:** Deploy TikMatrix to all configured servers

**Steps:**
1. Go to **Actions** → **VPS Management** → **Run workflow**
2. Fill in parameters:
   ```
   operation: deploy-site
   site: tikmatrix
   server: (leave empty for all servers)
   ```
3. Click **Run workflow**

**What happens:**
- Checks out code
- Installs dependencies
- Builds the site
- Creates deployment archive
- Deploys to all servers in parallel
- Creates automatic backup before deployment
- Sets correct permissions

**Result:** TikMatrix is live on all servers! 🚀

---

## Example 2: Configure New Static Site

**Scenario:** Add a new static site `example.com`

**Steps:**
1. Go to **Actions** → **VPS Management** → **Run workflow**
2. Configure Nginx first:
   ```
   operation: configure-nginx
   domain: example.com
   site_type: static
   enable_ssl: true
   ssl_method: http
   server: server-us
   ```
3. Wait for SSL certificate to be issued
4. Update `deploy-config.json` to add the new site
5. Run workflow again to deploy:
   ```
   operation: deploy-site
   site: example
   server: server-us
   ```

**Result:** New site is configured and deployed with SSL! 🔒

---

## Example 3: Setup Reverse Proxy

**Scenario:** Proxy `api.example.com` to local backend at `http://127.0.0.1:3000`

**Steps:**
1. Ensure your backend service is running on the VPS
2. Go to **Actions** → **VPS Management** → **Run workflow**
3. Configure:
   ```
   operation: configure-nginx
   domain: api.example.com
   site_type: proxy
   proxy_backend: http://127.0.0.1:3000
   enable_ssl: true
   ssl_method: http
   server: server-us
   ```

**What happens:**
- Creates Nginx reverse proxy configuration
- Configures WebSocket support
- Sets up security headers
- Issues SSL certificate
- Tests and reloads Nginx

**Result:** API is accessible at `https://api.example.com` 🌐

---

## Example 4: Push Configuration Files

**Scenario:** Update server configuration files

**Steps:**
1. Update files in your local repository (e.g., `./server-configs/nginx.conf`)
2. Go to **Actions** → **VPS Management** → **Run workflow**
3. Configure:
   ```
   operation: push-files
   local_path: ./server-configs
   remote_path: /home/deploy/configs
   post_upload_commands: "sudo systemctl restart myservice"  # optional
   server: server-us
   ```

**What happens:**
- Automatically creates remote directory if needed
- Uses rsync to efficiently transfer files with automatic overwrite
- Maintains file permissions
- Shows progress
- Sets correct ownership
- Executes post-upload commands if specified

**Result:** Config files updated on server! 📁

---

## Example 5: Weekly Health Check

**Scenario:** Check all servers health status

**Steps:**
1. Go to **Actions** → **VPS Management** → **Run workflow**
2. Configure:
   ```
   operation: health-check
   server: (leave empty for all servers)
   ```

**Output shows:**
```
================================
System Health Check
================================

📊 System Info:
  Hostname: server-us
  OS: Ubuntu 22.04.3 LTS
  Uptime: up 15 days, 3 hours

💾 Disk Usage:
  Root: 12G / 80G (15% used)

🧠 Memory Usage:
  Memory: 2.1G / 8.0G (26% used)

🌐 Nginx Status:
  ✅ Nginx is running
  nginx: configuration file /etc/nginx/nginx.conf syntax is ok

🔥 Firewall Status:
Status: active

🔒 Fail2Ban Status:
  ✅ Fail2Ban is running

📁 Configured Sites:
  Total: 3 site(s)
  - tikmatrix.com
  - igmatrix.com
  - ytmatrix.com

🔐 SSL Certificates:
  Total: 3 certificate(s)
  - tikmatrix.com
  - igmatrix.com
  - ytmatrix.com
```

**Result:** Complete health overview! 🏥

---

## Example 6: Create Backup

**Scenario:** Create manual backup before major update

**Steps:**
1. Go to **Actions** → **VPS Management** → **Run workflow**
2. Configure:
   ```
   operation: manage-backup
   backup_action: create
   backup_site: tikmatrix.com
   server: server-us
   ```

**What happens:**
- Creates compressed archive of site files
- Stores in `/var/backups/www/`
- Names with timestamp: `tikmatrix.com-manual-20241221_120530.tar.gz`
- Shows backup size and location

**Result:** Manual backup created! 💾

---

## Example 7: List All Backups

**Scenario:** Check available backups

**Steps:**
1. Go to **Actions** → **VPS Management** → **Run workflow**
2. Configure:
   ```
   operation: manage-backup
   backup_action: list
   server: (leave empty for all servers)
   ```

**Output shows:**
```
📋 Available backups in /var/backups/www:

  Dec 21 12:05  2.3M  tikmatrix.com-manual-20241221_120530.tar.gz
  Dec 20 15:30  2.3M  tikmatrix.com-20241220_153045.tar.gz
  Dec 19 10:15  2.2M  tikmatrix.com-20241219_101523.tar.gz
  
  Total size: 6.8M
```

**Result:** Overview of all backups! 📋

---

## Example 8: Renew SSL Certificates

**Scenario:** Manually trigger SSL renewal (normally automatic)

**Steps:**
1. Go to **Actions** → **VPS Management** → **Run workflow**
2. Configure:
   ```
   operation: renew-ssl
   server: (leave empty for all servers)
   ```

**What happens:**
- Runs `certbot renew`
- Reloads Nginx if certificates renewed
- Shows current certificate status

**Note:** Certbot auto-renews daily at 3 AM. This is for manual triggering.

**Result:** Certificates renewed! 🔐

---

## Example 9: Update Nginx Configuration

**Scenario:** You updated Nginx config files and need to reload Nginx

**Steps:**
1. Update your Nginx config files in the repository
2. Go to **Actions** → **VPS Management** → **Run workflow**
3. Configure:
   ```
   operation: push-files
   local_path: ./nginx-configs
   remote_path: /etc/nginx/conf.d
   post_upload_commands: sudo nginx -t && sudo nginx -s reload
   server: server-us
   ```

**What happens:**
- Uploads the Nginx config files
- Tests Nginx configuration (`nginx -t`)
- Reloads Nginx gracefully if tests pass
- No downtime

**Result:** Nginx reloaded with new config! 🔄

---

## Example 10: Multi-Server Deployment

**Scenario:** Deploy to specific subset of servers

**Steps:**

**Option 1: Deploy to single server**
```
operation: deploy-site
site: tikmatrix
server: server-dublin
```

**Option 2: Deploy to all servers** (default from `deploy-config.json`)
```
operation: deploy-site
site: tikmatrix
server: (leave empty)
```

**What happens:**
- Builds once
- Deploys in parallel to selected server(s)
- Each deployment independent
- Failure on one doesn't stop others (fail-fast: false)

**Result:** Site deployed to selected servers! 🌍

---

## Tips & Best Practices

### 1. Test on Single Server First

When deploying new configurations:
```
Step 1: Deploy to single test server
  server: server-us

Step 2: Verify it works

Step 3: Deploy to all servers
  server: (empty)
```

### 2. Regular Health Checks

Schedule manual checks:
- Weekly: Run health-check
- After deployments: Check status
- Before major updates: Verify system health

### 3. Backup Before Major Changes

Always create manual backup:
```
Step 1: Create backup
  operation: manage-backup
  backup_action: create

Step 2: Make changes

Step 3: Verify changes work
```

### 4. SSL Certificate Management

- HTTP validation: Easiest, requires DNS pointing to server
- Route53 validation: For internal servers or wildcard certs
- Auto-renewal: Configured automatically, check monthly

### 5. Monitor Disk Space

Check health-check output for disk usage:
- < 50%: Good ✅
- 50-80%: Warning ⚠️
- > 80%: Clean up old backups 🧹

---

## Troubleshooting Common Issues

### Issue: Deploy fails with "Permission denied"

**Solution:**
```
operation: push-files
local_path: ./fix-permissions.sh
remote_path: /home/deploy/

Then SSH in and run:
sudo ./fix-permissions.sh
```

### Issue: SSL certificate fails

**Solution:**
1. Check DNS: `dig yourdomain.com`
2. Verify ports 80/443 open: Run health-check
3. Try HTTP validation first, then Route53 if needed

### Issue: Site shows old content after deploy

**Solution:**
```
Clear browser cache or use hard refresh (Ctrl+F5)
If issue persists, try clearing server-side cache
```

### Issue: Can't SSH to server

**Solution:**
1. Verify `SSH_PRIVATE_KEY` secret is correct
2. Check server firewall (run health-check if accessible)
3. Verify deploy user exists and has correct authorized_keys

---

## Quick Reference

| Operation | Common Use Case | Required Parameters |
|-----------|-----------------|---------------------|
| deploy-site | Deploy site | site |
| configure-nginx | Add new domain | domain, site_type |
| push-files | Upload files & run commands | local_path, remote_path |
| health-check | Check status | (none) |
| manage-backup | Backup site | backup_action, backup_site (for create) |
| renew-ssl | Renew certs | (none) |

---

## Need Help?

- 📖 Read full docs: `docs/vps-management.md`
- 🚀 Quick start: `docs/vps-management-quickstart.md`
- 🔧 Scripts guide: `scripts/README.md`
- 🐛 Check logs in GitHub Actions workflow runs
- 💬 Open an issue on GitHub
