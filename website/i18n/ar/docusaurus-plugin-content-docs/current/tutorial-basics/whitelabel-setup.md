---
sidebar_position: 9
---

# 白标功能设置

:::info 需要年付订阅
白标功能仅对**年付订阅**用户开放。购买年付计划后，请通过 [Telegram](https://t.me/tikmatrix_agent_bot) 联系客服获取解锁码。
:::

白标功能允许您自定义 TikMatrix 的品牌标识以匹配您的公司形象。您可以修改应用名称、Logo和品牌معلومات，创建个性化的 TikMatrix 版本。

## 功能特性

### 基本设置

- **应用名称**: 自定义应用显示名称
- **Logo上传**: 上传您的自定义主Logo（موصى به128x128px）
- **网站图标**: 设置应用的自定义图标

### 品牌设置

- **支持邮箱**: 客户支持邮箱地址
- **教程链接**: 自定义教程/文档链接
- **Telegram链接**: 设置您的Telegram群组أو频道链接

### 功能开关

- **显示教程链接**: 控制教程链接的显示
- **显示品牌معلومات**: 控制品牌معلومات的显示

## 设置方法

### 方法一：界面التكوين

1. 启动 TikMatrix 应用
2. 点击标题栏的调色板图标 🎨
3. 在إعداد العلامة البيضاء对话框中التكوينالمعاملات：
   - **应用名称**: 输入您的自定义应用名称
   - **主Logo**: 上传您的Logo文件（PNG/JPG，موصى به128x128px）
   - **支持邮箱**: 输入您的支持邮箱地址
   - **教程链接**: 输入您的自定义教程链接
   - **Telegram链接**: 输入您的Telegram群组/频道链接
   - **功能开关**: 启用/禁用教程链接和品牌معلومات显示
4. 点击"保存"应用设置

### 方法二：التكوين文件

1. 复制أمثلةالتكوين文件：

   ```bash
   cp examples/whitelabel-config.json src/config/whitelabel-custom.json
   ```

2. 编辑التكوين文件：

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

3. 保存文件并重启应用

### 方法三：命令行工具

1. 进入项目جدول المحتويات：

   ```bash
   cd tikmatrix-desktop
   ```

2. 运行التكوين工具：

   ```bash
   node scripts/whitelabel-config.js
   ```

3. 按照تلميح逐步التكوين各项المعاملات

## 构建自定义版本

### 1. 准备资源文件

```bash
# 将您的Logo文件放在正确位置
src/assets/your-logo.webp       # 主Logo
public/your-favicon.ico        # 网页图标
src-tauri/icons/               # 应用图标（各种尺寸）
```

### 2. التكوين构建المعاملات

استخدام命令行工具أو手动编辑التكوين：

```bash
# 使用命令行工具
node scripts/whitelabel-config.js

# 或手动编辑
src/config/whitelabel-build.json
```

### 3. 构建应用

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 构建Tauri应用
npm run tauri build
```

## التكوين优先级

系统按فيما يلي优先顺序استخدامالتكوين：

1. **运行时التكوين**: 浏览器LocalStorage中的 `whitelabel_config`
2. **构建التكوين**: `src/config/whitelabel-build.json`（构建时استخدام）
3. **أمثلةالتكوين**: `examples/whitelabel-config.json`
4. **默认التكوين**: 内置القيمة الافتراضية

## Logo要求

### 主Logo

- **格式**: PNG、JPGأوSVG
- **尺寸**: 128x128px（موصى به）
- **背景**: 透明背景（PNG格式）
- **用途**: 标题栏、启动画面、关于对话框

### 网站图标

- **格式**: ICOأوPNG
- **尺寸**: 32x32pxأو16x16px
- **用途**: 浏览器标签页、窗口图标

### 应用图标（用于构建）

- **格式**: PNG、ICO、ICNS
- **尺寸**: 32x32、128x128、256x256、512x512
- **位置**: `src-tauri/icons/` جدول المحتويات

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

## 最佳实践

### Logo设计

- استخدام高分辨率图像以获得清晰显示
- 在所有Logo尺寸中保持一致的品牌形象
- 在明暗背景下测试Logo效果
- 确保Logo在小尺寸下仍可读

### 品牌一致性

- 在整个界面中استخدام一致的颜色和字体
- 与您现有的品牌指南保持一致
- 在不同屏幕尺寸下测试自定义界面
- 保持专业外观

### 链接التكوين

- 对所有外部链接استخدامHTTPS
- 部署前测试所有链接
- 确保支持渠道得到适عندما监控
- 保持文档链接的最新状态

## 故障排除

### 常见问题

**Logo未显示：**

- 检查文件路径和权限
- 验证图像格式受支持
- 确保图像尺寸合适
- 清除浏览器缓存并重启应用

**التكوين未保存：**

- 检查文件系统权限
- 验证JSON语法正确
- 确保التكوينجدول المحتويات存在
- 尝试以管理员身份运行（如需要）

**构建失败：**

- 验证所有资源文件存在
- 检查التكوين文件语法
- 确保图标文件格式正确
- 查看构建日志获取具体错误

### 获取帮助

如果在إعداد العلامة البيضاء过程中遇到问题：

1. 查看上述故障排除部分
2. 检查التكوين文件语法
3. 通过 [Telegram](https://t.me/tikmatrix_agent_bot) 联系技术支持
4. 报告问题时请包含您的التكوين文件和错误معلومات

## 许可和استخدام

- 白标功能仅对年付订阅用户开放
- 自定义品牌权利包含在您的订阅中
- 分发自定义版本可能需要额外许可
- 企业许可الخيارات请联系客服

---

**需要解锁码？** 请携带您的年付订阅详情通过 [Telegram](https://t.me/tikmatrix_agent_bot) 联系客服团队。
