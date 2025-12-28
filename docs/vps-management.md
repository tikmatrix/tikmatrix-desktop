# VPS Management via GitHub Actions

本文档说明如何通过 GitHub Actions 管理 VPS 服务器，实现自动化部署和运维。

> **2024 重构说明：** 我们已将原来的单一 `vps-management.yml` 工作流按职责拆分为三个独立工作流，并提取了可复用的辅助脚本。这大大提高了代码的可读性、可维护性和可扩展性。

## 概述

我们提供了两层管理方案：

1. **初始化脚本** (`init-vps.sh`) - 在新 VPS 上手动运行一次，配置基础环境
2. **GitHub Actions 工作流** - 后续所有操作通过 GitHub Actions 自动化管理
   - `deploy-site.yml` - 站点部署
   - `server-operations.yml` - 服务器运维（健康检查、文件推送、备份管理）
   - `server-config.yml` - 服务器配置（Nginx 配置、SSL 证书）

### 辅助脚本

所有工作流都基于 `scripts/` 目录下的可复用辅助脚本构建：

- `lib-common.sh` - 公共函数库
- `deploy-site.sh` - 站点部署逻辑
- `health-check.sh` - 健康检查逻辑
- `backup-manage.sh` - 备份管理逻辑
- `push-files.sh` - 文件推送逻辑
- `ssl-renew.sh` - SSL 续期逻辑
- `nginx-config.sh` - Nginx 配置逻辑

## 初始化新 VPS

### 前提条件

- Ubuntu 22.04 LTS 或 Debian 11+ 系统
- Root 访问权限
- 服务器可访问互联网

### 步骤 1: 生成 SSH 密钥对

在本地机器上生成 SSH 密钥对（如果还没有）：

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy_key
```

这将生成两个文件：

- `~/.ssh/github_deploy_key` - 私钥（配置到 GitHub Secrets）
- `~/.ssh/github_deploy_key.pub` - 公钥（配置到 VPS）

### 步骤 2: 在 VPS 上运行初始化脚本

SSH 登录到新 VPS，然后执行：

```bash
# 下载初始化脚本
curl -O https://raw.githubusercontent.com/tikmatrix/tikmatrix-desktop/main/scripts/init-vps.sh

# 设置执行权限
chmod +x init-vps.sh

# 设置公钥环境变量（使用你生成的公钥内容）
export GITHUB_PUBKEY="ssh-ed25519 AAAAC3Nza... your-public-key-here"

# 可选：自定义 SSH 端口（默认 22）
export SSH_PORT=22

# 运行初始化脚本
sudo ./init-vps.sh
```

脚本将自动安装和配置：

- ✅ 系统更新和必要软件包
- ✅ Deploy 用户和 SSH 密钥认证
- ✅ UFW 防火墙（开放 SSH, HTTP, HTTPS）
- ✅ Fail2Ban 安全防护
- ✅ Nginx Web 服务器
- ✅ Certbot SSL 证书工具
- ✅ 系统优化和安全加固

### 步骤 3: 配置 GitHub Secrets

在 GitHub 仓库中配置以下 Secrets（Settings → Secrets and variables → Actions）：

**必需的 Secrets:**

- `SSH_PRIVATE_KEY` - SSH 私钥内容（`~/.ssh/github_deploy_key` 的内容）

**可选的 Secrets（用于 Route53 SSL 验证）:**

- `AWS_ACCESS_KEY_ID` - AWS 访问密钥 ID
- `AWS_SECRET_ACCESS_KEY` - AWS 密钥

### 步骤 4: 更新部署配置

编辑 `deploy-config.json`，添加新服务器信息：

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

## 使用 GitHub Actions 管理 VPS

初始化完成后，所有后续操作都可以通过 GitHub Actions 完成。

### 可用工作流

我们将 VPS 管理操作拆分为三个独立的工作流，职责更清晰，使用更方便：

#### 工作流 1: Deploy Site (站点部署)

用于构建和部署站点到 VPS 服务器。

访问 GitHub 仓库的 **Actions** 标签页，选择 **Deploy Site** 工作流，点击 **Run workflow**。

#### 1. 部署站点 (Deploy Site 工作流)

构建并部署站点到 VPS。

**参数：**

- `site`: 选择要部署的站点（tikmatrix, igmatrix, ytmatrix, tikzenx）
- `server`: 目标服务器（留空则部署到配置文件中该站点的所有服务器）

**示例场景：**

```
部署 TikMatrix 站点到所有配置的服务器
- site: tikmatrix
- server: (留空)
```

**工作流程：**

1. 根据配置确定目标服务器
2. 安装依赖并构建项目
3. 如果需要，运行品牌替换
4. 创建部署压缩包
5. 并行部署到所有目标服务器
6. 自动创建备份（保留最近 3 个）

---

#### 工作流 2: Server Operations (服务器运维)

用于日常服务器运维操作。

访问 GitHub 仓库的 **Actions** 标签页，选择 **Server Operations** 工作流，点击 **Run workflow**。

**支持的操作：**

- `health-check` - 健康检查
- `push-files` - 推送文件
- `manage-backup` - 备份管理

#### 2. 健康检查 (health-check)

检查服务器状态和服务运行情况。

**参数：**

- `operation`: 选择 `health-check`
- `server`: 目标服务器（留空检查所有服务器）

**检查内容：**

- ✅ 系统信息（OS, 运行时间）
- ✅ 磁盘使用率
- ✅ 内存使用率
- ✅ Nginx 状态和配置
- ✅ 防火墙状态
- ✅ Fail2Ban 状态
- ✅ 已配置的站点列表
- ✅ SSL 证书列表

#### 3. 推送文件 (push-files)

推送任意文件或目录到服务器，支持自动覆盖和上传后执行命令。

**参数：**

- `operation`: 选择 `push-files`
- `local_path`: 本地路径（如 `./scripts`）
- `remote_path`: 远程路径（如 `/home/deploy/scripts`）
- `post_upload_commands`: 上传后执行的命令（可选，如 `sudo nginx -t && sudo nginx -s reload`）
- `server`: 目标服务器（可选）

**特性：**

- ✅ 自动创建远程目录（如果不存在）
- ✅ 自动覆盖现有文件（使用 `rsync --delete`）
- ✅ 支持上传后执行命令（如重载配置、重启服务等）

**示例场景 1 - 推送配置文件：**

```
推送配置文件到服务器
- operation: push-files
- local_path: ./config
- remote_path: /etc/myapp/config
- server: server-us
```

**示例场景 2 - 更新 Nginx 配置并重载：**

```
更新 Nginx 配置文件并自动重载
- operation: push-files
- local_path: ./nginx-configs
- remote_path: /etc/nginx/conf.d
- post_upload_commands: sudo nginx -t && sudo nginx -s reload
- server: server-us
```

#### 4. 管理备份 (manage-backup)

创建或列出站点备份。

**参数：**

- `operation`: 选择 `manage-backup`
- `backup_action`: `create` 或 `list`
- `backup_site`: 站点域名（创建备份时需要，如 `tikmatrix.com`）
- `server`: 目标服务器（可选）

**示例场景：**

```
创建 TikMatrix 站点备份
- operation: manage-backup
- backup_action: create
- backup_site: tikmatrix.com
- server: server-us

列出所有备份
- operation: manage-backup
- backup_action: list
```

---

#### 工作流 3: Server Configuration (服务器配置)

用于 Nginx 和 SSL 证书配置管理。

访问 GitHub 仓库的 **Actions** 标签页，选择 **Server Configuration** 工作流，点击 **Run workflow**。

**支持的操作：**

- `configure-nginx` - 配置 Nginx
- `renew-ssl` - 续期 SSL 证书

#### 5. 配置 Nginx (configure-nginx)

为新域名配置 Nginx 站点。

**参数：**

- `operation`: 选择 `configure-nginx`
- `domain`: 域名（如 `example.com`）
- `site_type`: `static`（静态站点）或 `proxy`（反向代理）
- `proxy_backend`: 后端 URL（仅 proxy 类型需要，如 `http://127.0.0.1:3000`）
- `enable_ssl`: 是否启用 SSL
- `ssl_method`: `http`（HTTP 验证）或 `route53`（DNS 验证）
- `server`: 目标服务器（可选）

**示例场景 1 - 静态站点：**

```
配置新的静态站点
- operation: configure-nginx
- domain: newsite.com
- site_type: static
- enable_ssl: true
- ssl_method: http
```

**示例场景 2 - 反向代理：**

```
配置反向代理到本地服务
- operation: configure-nginx
- domain: api.example.com
- site_type: proxy
- proxy_backend: http://127.0.0.1:3000
- enable_ssl: true
- ssl_method: route53
```

#### 6. 续期 SSL 证书 (renew-ssl)

手动触发 SSL 证书续期。

**参数：**

- `operation`: 选择 `renew-ssl`
- `server`: 目标服务器（留空则所有服务器）

**注意：** Certbot 已配置自动续期（每天凌晨 3 点），此操作用于手动触发。

## 工作流程示例

### 场景 1: 部署新站点到现有服务器

```bash
1. 在 GitHub Actions 中运行 VPS Management 工作流
   - operation: configure-nginx
   - domain: newsite.com
   - site_type: static
   - enable_ssl: true
   - ssl_method: http

2. 更新 deploy-config.json，添加新站点配置

3. 再次运行工作流部署站点
   - operation: deploy-site
   - site: newsite
```

### 场景 2: 添加新服务器

```bash
1. 在新 VPS 上运行 init-vps.sh 初始化脚本

2. 更新 deploy-config.json，添加新服务器

3. 提交并推送更改

4. 使用 GitHub Actions 部署站点到新服务器
   - operation: deploy-site
   - site: tikmatrix
   - server: server-new
```

### 场景 3: 日常维护

```bash
# 每周检查服务器健康状态
- operation: health-check

# 定期创建备份
- operation: manage-backup
- backup_action: create
- backup_site: tikmatrix.com

# 查看备份列表
- operation: manage-backup
- backup_action: list
```

## 安全最佳实践

1. **SSH 密钥管理**
   - 使用 ED25519 密钥（更安全，更小）
   - 私钥仅存储在 GitHub Secrets 中
   - 定期轮换密钥

2. **防火墙规则**
   - 仅开放必要端口（SSH, HTTP, HTTPS）
   - 使用 Fail2Ban 防止暴力破解

3. **SSL 证书**
   - 使用 Let's Encrypt 免费证书
   - 配置自动续期
   - HTTP 验证适用于大多数场景
   - Route53 验证适用于内网服务器或泛域名证书

4. **权限管理**
   - Deploy 用户仅有必要的 sudo 权限（通过 `/etc/sudoers.d/deploy` 配置）
   - Web 文件归 deploy 用户所有，www-data 组可读

   Deploy 用户的 sudo 权限包括：
   - Nginx 管理：`systemctl reload/restart nginx`
   - Systemd 服务管理：`systemctl daemon-reload/enable/start/stop/restart`
   - 文件权限管理：`chown -R deploy:www-data /var/www.*` 和 `chmod -R 775 /var/www.*`
   - 服务文件部署：`mv /tmp/*.service /etc/systemd/system/`

   > **安全说明：** Systemd 服务管理权限使用通配符以支持 TikMatrix 生态系统中的多种服务（如 tikmatrix-api-rs, igmatrix-api 等）。这些服务器专用于 TikMatrix 部署，且 deploy 用户通过 SSH 密钥认证访问。如需更严格的安全策略，可以将通配符替换为具体的服务名称列表。

   如果服务器上的 sudoers 配置过旧，运行以下命令更新：

   ```bash
   sudo bash scripts/fix-deploy-permissions.sh
   ```

5. **备份策略**
   - 自动保留最近 3 个部署备份
   - 定期创建手动备份
   - 备份存储在 `/var/backups/www`

## 故障排查

### 问题 1: SSH 连接失败

```bash
# 检查 SSH 密钥是否正确配置
ssh -i /path/to/private/key deploy@server-ip

# 检查服务器防火墙
sudo ufw status

# 查看 SSH 日志
sudo tail -f /var/log/auth.log
```

### 问题 2: Nginx 配置错误

```bash
# 测试配置
sudo nginx -t

# 查看错误日志
sudo tail -f /var/log/nginx/error.log

# 检查站点配置
cat /etc/nginx/conf.d/domain.conf
```

### 问题 3: SSL 证书获取失败

```bash
# HTTP 验证失败 - 检查 DNS 是否指向服务器
dig domain.com

# Route53 验证失败 - 检查 AWS 凭证
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
sudo certbot certificates
```

### 问题 4: 部署失败

```bash
# 检查磁盘空间
df -h

# 检查权限
ls -la /var/www/domain.com

# 查看部署日志
# 在 GitHub Actions 工作流运行详情中查看
```

### 问题 5: sudo 权限错误

如果在 GitHub Actions 部署过程中遇到类似以下错误：

```
sudo: a terminal is required to read the password; either use the -S option to read from standard input or configure an askpass helper
sudo: a password is required
```

这通常意味着 deploy 用户没有执行特定命令的 NOPASSWD sudo 权限。解决方法：

1. SSH 登录到服务器
2. 运行权限修复脚本：

   ```bash
   sudo bash scripts/fix-deploy-permissions.sh
   ```

3. 验证 sudoers 配置：

   ```bash
   sudo cat /etc/sudoers.d/deploy
   ```

4. 重新运行失败的 GitHub Actions 工作流

## 高级功能

### 自定义域名配置

如果需要为子域名或特殊域名配置 Nginx：

```bash
# 使用 configure-nginx 操作
- operation: configure-nginx
- domain: subdomain.example.com
- site_type: static
```

脚本会自动检测：

- 根域名（如 `example.com`）会同时配置 `www.example.com`
- 子域名（如 `api.example.com`）仅配置单个域名

### 反向代理高级配置

对于需要代理到后端服务的场景：

```bash
- operation: configure-nginx
- domain: api.example.com
- site_type: proxy
- proxy_backend: http://127.0.0.1:3000
```

生成的配置包括：

- WebSocket 支持
- 连接保持（keepalive）
- 安全头
- Gzip 压缩

### 批量操作

利用 `deploy-config.json` 中的 `deployTo` 配置，可以一次性部署到多个服务器：

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

运行部署时会自动并行部署到所有配置的服务器。

## 日志和监控

- **Nginx 访问日志**: `/var/log/nginx/{domain}.access.log`
- **Nginx 错误日志**: `/var/log/nginx/{domain}.error.log`
- **初始化日志**: `/var/log/tikmatrix-init.log`
- **站点备份**: `/var/backups/www/`

## 贡献

欢迎提交 Issue 和 Pull Request 改进此管理系统。

## 许可

MIT License
