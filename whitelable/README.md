# 白标功能说明文档

## 支持的白标配置

1. appName: 应用名称
    * tauri.conf.json 中的 windows.title 需要替换为 {appName}
    * tauri.conf.json 中的 package.productName 需要替换为 {appName}
    * src\config\whitelabel.js 中的 DEFAULT_WHITELABEL_CONFIG.appName 需要替换为 {appName}

2. appId: 应用 ID(自动把appName转为小写并去掉空格作为默认值)
    * tauri.conf.json 中的 updater.endpoint 需要替换为 <https://api.tikmatrix.com/front-api/check_update?app={appId}>
    * tauri.conf.json 中的 bundle.identifier 需要替换为 com.{appId}

3. icon: 应用图标
    * 需要替换 app-icon.png
    * 然后运行 `npm run tauri icon` 生成各个平台的图标
    * 需要替换 src\assets\logo.png, 用于标题栏图标

4. 官网域名: officialWebsite
    * src\config\whitelabel.js 中的 DEFAULT_WHITELABEL_CONFIG.officialWebsite 需要配置为 {officialWebsite}

5. 客服邮箱
    * src\config\whitelabel.js 中的 DEFAULT_WHITELABEL_CONFIG.emailSupport 需要配置为 {emailSupport}

6. 客服telegram
    * src\config\whitelabel.js 中的 DEFAULT_WHITELABEL_CONFIG.telegramSupport 需要配置为 {telegramSupport}

7. 客服whatsapp
    * src\config\whitelabel.js 中的 DEFAULT_WHITELABEL_CONFIG.whatsappSupport 需要配置为 {whatsappSupport}

## 自动化打包脚本

现在可以使用 `scripts/build-whitelabel.js` 脚本自动完成白标配置注入与打包流程：

* Windows 平台自动调用 `build.ps1`
* macOS 平台自动调用 `build.sh`

```powershell
node scripts/build-whitelabel.js <品牌目录>
```

例如：

```powershell
node scripts/build-whitelabel.js TikZenx --verbose
```

可选参数：

* `--skip-icon`：跳过运行 `npm run tauri icon`
* `--skip-build`：仅应用配置，不执行 `npm run tauri build`
* `--verbose`：输出详细日志

脚本会在构建完成后自动还原原始配置文件与图标。若构建过程中出现错误，脚本同样会尝试恢复原始状态。
