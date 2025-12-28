# VPS Management Quick Start

通过 GitHub Actions 管理 VPS 服务器的快速入门指南。

## 快速开始

### 1. 初始化新 VPS（仅需执行一次）

```bash
# SSH 登录到 VPS
ssh root@your-server-ip

# 下载并运行初始化脚本
curl -O https://raw.githubusercontent.com/tikmatrix/tikmatrix-desktop/main/scripts/init-vps.sh
chmod +x init-vps.sh

# 设置你的 GitHub Actions SSH 公钥
export GITHUB_PUBKEY="ssh-ed25519 AAAAC3Nza... your-public-key"

# 运行初始化
sudo ./init-vps.sh
```

### 2. 配置 GitHub Secrets

在仓库的 Settings → Secrets and variables → Actions 中添加：

- `SSH_PRIVATE_KEY` - 你的 SSH 私钥

可选（用于 Route53 SSL）：

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

### 3. 更新部署配置

编辑 `deploy-config.json`，添加服务器信息：

```json
{
  "servers": [
    {
      "id": "my-server",
      "host": "your-server-ip",
      "port": 22,
      "user": "deploy"
    }
  ]
}
```

### 4. 通过 GitHub Actions 管理

访问 Actions → VPS Management → Run workflow

常用操作：

| 操作 | 用途 | 示例 |
|------|------|------|
| **deploy-site** | 部署站点 | 部署 tikmatrix 到所有服务器 |
| **configure-nginx** | 配置新域名 | 为 newsite.com 配置 Nginx |
| **health-check** | 检查服务器状态 | 查看所有服务器健康状态 |
| **push-files** | 推送文件 | 上传配置文件到服务器 |
| **manage-backup** | 备份管理 | 创建或查看站点备份 |
| **renew-ssl** | 续期证书 | 手动续期 SSL 证书 |

## 常见场景

### 部署新站点

```
1. 配置 Nginx:
   - operation: configure-nginx
   - domain: example.com
   - site_type: static
   - enable_ssl: true

2. 部署站点:
   - operation: deploy-site
   - site: example
```

### 健康检查

```
operation: health-check
```

将显示：

- ✅ 系统信息
- ✅ 磁盘和内存使用
- ✅ Nginx 状态
- ✅ 防火墙和 Fail2Ban 状态
- ✅ 已配置站点列表
- ✅ SSL 证书列表

### 创建备份

```
operation: manage-backup
backup_action: create
backup_site: tikmatrix.com
```

## 完整文档

详细文档请查看：[docs/vps-management.md](./vps-management.md)

## 故障排查

### SSH 连接失败

检查：

1. GitHub Secret `SSH_PRIVATE_KEY` 是否正确配置
2. 服务器防火墙是否允许 SSH 端口
3. deploy 用户是否正确创建

### Nginx 配置错误

在服务器上运行：

```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

### SSL 证书失败

HTTP 验证：

- 确保 DNS 已指向服务器
- 防火墙允许 80/443 端口

Route53 验证：

- 检查 AWS 凭证是否配置
- 确认域名托管在 Route53

## 支持

遇到问题？

1. 查看 [完整文档](./vps-management.md)
2. 检查 GitHub Actions 日志
3. 提交 Issue
