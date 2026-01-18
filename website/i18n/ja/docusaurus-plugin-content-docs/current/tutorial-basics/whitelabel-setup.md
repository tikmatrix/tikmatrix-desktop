---
sidebar_position: 9
---

# 白标機能設定

:::info 需要年付订阅
白标機能仅对**年付订阅**用户开放。购买年付计划后，请通じて [Telegram](https://t.me/tikmatrix_agent_bot) 联系客服获取解锁码。
:::

白标機能允许您カスタム TikMatrix の品牌标识以匹配您の公司形象。您できます以修改アプリ名称、Logo和品牌信息，创建パーソナライズの TikMatrix 版本。

## 機能と特徴

### 基本設定

- **アプリ名称**: カスタムアプリ显示名称
- **Logo上で传**: 上で传您のカスタム主Logo（推荐128x128px）
- **网站图标**: 設定アプリのカスタム图标

### 品牌設定

- **サポート邮箱**: 客户サポート邮箱地址
- **教程リンク**: カスタム教程/文档リンク
- **Telegramリンク**: 設定您のTelegram群组または频道リンク

### 機能开关

- **显示教程リンク**: 制御教程リンクの显示
- **显示品牌信息**: 制御品牌信息の显示

## 設定方法

### 方法一：界面配置

1. 启动 TikMatrix アプリ
2. 点击タイトル栏の调色板图标 🎨
3. 在白标設定对话框中配置参数：
   - **アプリ名称**: 输入您のカスタムアプリ名称
   - **主Logo**: 上で传您のLogo文件（PNG/JPG，推荐128x128px）
   - **サポート邮箱**: 输入您のサポート邮箱地址
   - **教程リンク**: 输入您のカスタム教程リンク
   - **Telegramリンク**: 输入您のTelegram群组/频道リンク
   - **機能开关**: 启用/禁用教程リンク和品牌信息显示
4. 点击"保存"アプリ設定

### 方法二：配置文件

1. 复制示例配置文件：

   ```bash
   cp examples/whitelabel-config.json src/config/whitelabel-custom.json
   ```

2. 编辑配置文件：

   ```json
   {
     "appName": "您的应用名称",
     "logo": {
       "main": "/path/to/your/logo.webp",
       "favicon": "/path/to/your/favicon.ico"
     },
     "brand": {
       "supportEmail": "support@yourcompany.com",
       "tutorialUrl": "https://yourcompany.com/docs",
       "telegramUrl": "https://t.me/yourgroup"
     },
     "features": {
       "showTutorialLink": true,
       "showBrandInfo": true
     }
   }
   ```

3. 保存文件し重启アプリ

### 方法三：命令行工具

1. 进入项目目录：

   ```bash
   cd tikmatrix-desktop
   ```

2. 运行配置工具：

   ```bash
   node scripts/whitelabel-config.js
   ```

3. 按照提示逐步配置各项参数

## 构建カスタム版本

### 1. 准备资源文件

```bash
# 将您的Logo文件放在正确位置
src/assets/your-logo.webp       # 主Logo
public/your-favicon.ico        # 网页图标
src-tauri/icons/               # 应用图标（各种尺寸）
```

### 2. 配置构建参数

使用命令行工具または手動编辑配置：

```bash
# 使用命令行工具
node scripts/whitelabel-config.js

# 或手动编辑
src/config/whitelabel-build.json
```

### 3. 构建アプリ

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 构建Tauri应用
npm run tauri build
```

## 配置优先级

系统按以下优先顺序使用配置：

1. **运行时配置**: 閲覧器LocalStorage中の `whitelabel_config`
2. **构建配置**: `src/config/whitelabel-build.json`（构建时使用）
3. **示例配置**: `examples/whitelabel-config.json`
4. **默认配置**: 内置默认值

## Logo必要

### 主Logo

- **形式**: PNG、JPGまたはSVG
- **尺寸**: 128x128px（推荐）
- **背景**: 透明背景（PNG形式）
- **用途**: タイトル栏、启动画面、关于对话框

### 网站图标

- **形式**: ICOまたはPNG
- **尺寸**: 32x32pxまたは16x16px
- **用途**: 閲覧器标签页、窗口图标

### アプリ图标（用于构建）

- **形式**: PNG、ICO、ICNS
- **尺寸**: 32x32、128x128、256x256、512x512
- **位置**: `src-tauri/icons/` 目录

## API集成

### JavaScript API

```javascript
import { 
  getWhiteLabelConfig,
  saveWhiteLabelConfig, 
  resetWhiteLabelConfig,
  validateWhiteLabelConfig 
} from './config/whitelabel.js';

// 获取当前配置
const config = getWhiteLabelConfig();

// 保存新配置
saveWhiteLabelConfig(newConfig);

// 重置为默认值
resetWhiteLabelConfig();

// 验证配置
validateWhiteLabelConfig(config);
```

### 实用工具函数

```javascript
import { 
  initWhiteLabel,
  updateDocumentTitle,
  updateFavicon
} from './utils/whitelabel.js';

// 应用启动时初始化白标
initWhiteLabel();

// 更新文档标题
updateDocumentTitle('您的应用名称');

// 更新图标
updateFavicon('/path/to/favicon.ico');
```

## 最適な实践

### Logo设计

- 使用高分辨率图像以得る清晰显示
- 在所有Logo尺寸中保持一致の品牌形象
- 在明暗背景下测试Logoパフォーマンス
- 确保Logo在小尺寸下仍できます读

### 品牌一致性

- 在整个界面中使用一致の颜色和字体
- と您现有の品牌指南保持一致
- 在異なる屏幕尺寸下测试カスタム界面
- 保持专业外观

### リンク配置

- 对所有外部リンク使用HTTPS
- 部署前测试所有リンク
- 确保サポート渠道得到适当监控
- 保持文档リンクの最新状态

## 故障排除

### 常见问题

**Logo未显示：**

- 检查文件パス和权限
- 認証图像形式受サポート
- 确保图像尺寸合适
- 清除閲覧器缓存し重启アプリ

**配置未保存：**

- 检查文件系统权限
- 認証JSON语法正确
- 确保配置目录存在
- 尝试以管理员身份运行（など需要）

**构建失败：**

- 認証所有资源文件存在
- 检查配置文件语法
- 确保图标文件形式正确
- 查看构建日志获取具体错误

### 获取帮助

など果在白标設定过程中遇到问题：

1. 查看上で述故障排除一部
2. 检查配置文件语法
3. 通じて [Telegram](https://t.me/tikmatrix_agent_bot) 联系技术サポート
4. 报告问题时请含む您の配置文件和错误信息

## 许できます和使用

- 白标機能仅对年付订阅用户开放
- カスタム品牌权利含む在您の订阅中
- 分发カスタム版本できます能需要额外许できます
- 企业许できます选项请联系客服

---

**需要解锁码？** 请携带您の年付订阅详情通じて [Telegram](https://t.me/tikmatrix_agent_bot) 联系客服团队。
