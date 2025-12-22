# 白标配置说明

本目录包含所有白标品牌的配置文件。每个品牌都有自己的子目录，包含配置和资源文件。

## 目录结构

```
whitelable/
├── README.md              # 本文件
├── IgMatrix/             # IgMatrix 白标配置
│   ├── config.json       # 配置文件
│   └── app-icon.png      # 应用图标
├── AGACloud/             # AGA Cloud 白标配置
│   ├── config.json
│   └── app-icon.png
└── TikZenX/              # TikZenX 白标配置
    ├── config.json
    └── app-icon.png
```

## 配置文件格式

每个白标品牌的 `config.json` 文件包含以下字段：

```json
{
  "appName": "应用名称",
  "officialWebsite": "官方网站 URL (可选)",
  "emailSupport": "支持邮箱 (可选)",
  "telegramSupport": "Telegram 支持链接 (可选)",
  "whatsappSupport": "WhatsApp 支持链接 (可选)",
  "iconFile": "app-icon.png",
  "enablePay": true,
  "enableSupportEntry": true,
  "showAppNameInTitle": false,
  "targetApp": "tiktok 或 instagram"
}
```

### 字段说明

- **appName** (必填): 应用名称，显示在应用标题栏和系统中
  - 会自动转换为 `appId`：转小写并移除所有空格和特殊字符
  - 示例：`"IgMatrix"` → appId: `"igmatrix"`
  - 示例：`"AGA Cloud"` → appId: `"agacloud"`

- **officialWebsite** (可选): 官方网站 URL
  - 用于应用内的链接跳转

- **emailSupport** (可选): 支持邮箱地址
  - 用于用户联系技术支持

- **telegramSupport** (可选): Telegram 支持链接
  - 格式：`https://t.me/your_bot`

- **whatsappSupport** (可选): WhatsApp 支持链接
  - 格式：`https://wa.me/+phone_number`

- **iconFile** (必填): 应用图标文件名
  - 默认为 `app-icon.png`
  - 文件需放在品牌目录下
  - 推荐尺寸：512x512 或更高

- **enablePay** (可选): 是否启用支付功能
  - 默认：`true`
  - 设为 `false` 可禁用支付相关功能

- **enableSupportEntry** (可选): 是否启用支持入口
  - 默认：`true`
  - 设为 `false` 可隐藏技术支持入口

- **showAppNameInTitle** (可选): 是否在标题栏显示应用名
  - 默认：`false`
  - 设为 `true` 会在标题栏显示品牌名称

- **targetApp** (必填): 目标应用类型
  - 可选值：`"tiktok"` 或 `"instagram"`
  - 决定应用的功能和界面

## Android APK 包名规则

基于 `appName` 自动生成的 `appId`，APK 的包名格式为：`com.github.{appId}`

示例：

- IgMatrix → appId: `igmatrix` → 包名: `com.github.igmatrix`
- AGA Cloud → appId: `agacloud` → 包名: `com.github.agacloud`
- TikZenX → appId: `tikzenx` → 包名: `com.github.tikzenx`

APK 文件命名：

- 主 APK: `com.github.{appId}.apk`
- 测试 APK: `com.github.{appId}.test.apk`

## 构建白标客户端

### 桌面端 (Windows/macOS)

```bash
# 构建 IgMatrix 白标
npm run build:whitelabel:IgMatrix

# 构建 AGACloud 白标
npm run build:whitelabel:AGACloud

# 或者指定品牌目录
node scripts/build-whitelabel.js <品牌目录>
```

可选参数：

- `--skip-icon`：跳过运行 `npm run tauri icon`
- `--skip-build`：跳过构建步骤，仅更新配置
- `--verbose`：显示详细日志

### Android APK

```bash
# 构建 IgMatrix APK
npm run build:whitelabel-apk:IgMatrix

# 构建 AGACloud APK
npm run build:whitelabel-apk:AGACloud

# 或者指定品牌目录
node scripts/build-whitelabel-apk.js <品牌目录> --verbose
```

**注意**: APK 构建需要 `tikmatrix-android` 仓库在同一父目录下。

## 创建新的白标品牌

1. 在 `whitelable/` 目录下创建新的品牌目录
2. 复制 `config.json` 模板并修改配置
3. 准备 512x512 的应用图标 (PNG 格式)
4. 运行构建脚本测试

示例：

```bash
mkdir whitelable/MyBrand
cp whitelable/IgMatrix/config.json whitelable/MyBrand/
# 编辑配置文件
vim whitelable/MyBrand/config.json
# 添加图标
cp /path/to/icon.png whitelable/MyBrand/app-icon.png
# 构建测试
node scripts/build-whitelabel.js MyBrand --verbose
```

## GitHub Actions 自动构建

所有白标品牌都会在 GitHub Actions 中自动构建：

- **Windows 客户端**: `.github/workflows/build-matrix-windows.yml`
- **macOS 客户端**: `.github/workflows/build-matrix-mac.yml`
- **Android APK**: `.github/workflows/build-apk-all.yml`

构建产物会自动上传到 R2 存储，并更新版本信息。

## 支持的白标配置说明

1. appName: 应用名称
    - tauri.conf.json 中的 windows.title 需要替换为 {appName}
    - tauri.conf.json 中的 package.productName 需要替换为 {appName}
    - src\config\whitelabel.js 中的 DEFAULT_WHITELABEL_CONFIG.appName 需要替换为 {appName}

2. appId: 应用 ID（不再需要手动配置，自动从 appName 生成）
    - 自动把 appName 转为小写并去掉空格和特殊字符
    - tauri.conf.json 中的 updater.endpoint 需要替换为 `https://api.niostack.com/front-api/check_update?app={appId}`
    - tauri.conf.json 中的 bundle.identifier 需要替换为 `com.github.{appId}`
    - Android APK 的包名为 `com.github.{appId}`

3. icon: 应用图标
    - 需要替换 app-icon.png
    - 然后运行 `npm run tauri icon` 生成各个平台的图标
    - 需要替换 src\assets\logo.png, 用于标题栏图标

4. 官网域名: officialWebsite
    - src\config\whitelabel.js 中的 DEFAULT_WHITELABEL_CONFIG.officialWebsite 需要配置为 {officialWebsite}

5. 客服邮箱
    - src\config\whitelabel.js 中的 DEFAULT_WHITELABEL_CONFIG.emailSupport 需要配置为 {emailSupport}

6. 客服telegram
    - src\config\whitelabel.js 中的 DEFAULT_WHITELABEL_CONFIG.telegramSupport 需要配置为 {telegramSupport}

7. 客服whatsapp
    - src\config\whitelabel.js 中的 DEFAULT_WHITELABEL_CONFIG.whatsappSupport 需要配置为 {whatsappSupport}

## 注意事项

1. **appId 自动生成**: 不再需要手动设置 `appId` 字段，系统会从 `appName` 自动生成
2. **包名传递**: Android APK 的包名会传递给 agent，用于设备初始化时的应用安装
3. **图标要求**: 应用图标需为 PNG 格式，推荐 512x512 或更高分辨率
4. **命名规范**: 品牌目录名建议使用 PascalCase（首字母大写驼峰）
5. **配置验证**: 构建前会验证必填字段，缺失时会报错并退出

- `--skip-build`：仅应用配置，不执行 `npm run tauri build`
- `--verbose`：输出详细日志

脚本会在构建完成后自动还原原始配置文件与图标。若构建过程中出现错误，脚本同样会尝试恢复原始状态。
