# APK 白标构建功能实现说明

## 概述

实现了 Android APK 的白标构建功能，支持为不同品牌自动生成定制的 APK 包。

## 主要更改

### 1. 统一 appId 生成逻辑

- ✅ 删除所有配置文件中的 `appId` 字段
- ✅ `appId` 统一从 `appName` 自动生成（转小写并移除空格和特殊字符）
- ✅ 示例：`"IgMatrix"` → `"igmatrix"`

### 2. 创建 APK 白标构建脚本

**文件**: `scripts/build-whitelabel-apk.js`

功能：

- 读取白标配置 (`whitelable/{brand}/config.json`)
- 从 `appName` 生成 `appId` 和包名 (`com.github.{appId}`)
- 自动修改 Android 项目配置：
  - `app/build.gradle` - 更新 `applicationId`（不修改 namespace）
  - `AndroidManifest.xml` - 保持 `package` 属性不变（由 Gradle 管理）
  - `res/values/strings.xml` - 更新 `app_name`
- 构建 APK 并重命名为 `com.github.{appId}.apk` 和 `com.github.{appId}.test.apk`
- 自动恢复所有修改的文件

使用方法：

```bash
# 构建 IgMatrix APK
npm run build:whitelabel-apk:IgMatrix


# 或直接运行脚本
node scripts/build-whitelabel-apk.js <品牌目录> --verbose
```

### 3. 修改桌面端构建脚本

**文件**: `scripts/build-whitelabel.js`

更改：

- 删除了 `appId` 的配置读取
- 统一从 `appName` 生成 `appId`
- 简化了错误提示信息

### 4. 更新 GitHub Actions 工作流

**文件**: `.github/workflows/build-apk-all.yml`

更改：

- 新增 `tikmatrix-desktop` 仓库检出步骤（获取白标配置）
- 新增 Node.js 环境配置（运行白标构建脚本）
- 调整工作目录结构：
  - `tikmatrix-desktop/` - 桌面端仓库（包含白标配置）
  - `tikmatrix-android/` - Android 仓库（构建 APK）
- 新增 IgMatrix APK 构建和上传步骤
- 自动更新库版本信息到 API

### 5. 更新配置文件

修改的配置文件：

- `whitelable/IgMatrix/config.json` - 删除 `appId` 字段

### 6. 添加 npm 脚本

**文件**: `package.json`

新增脚本：

```json
{
  "build:whitelabel-apk:IgMatrix": "node scripts/build-whitelabel-apk.js IgMatrix --verbose",
  "build:whitelabel-apk": "node scripts/build-whitelabel-apk.js"
}
```

### 7. 更新文档

**文件**: `whitelable/README.md`

新增内容：

- Android APK 包名规则说明
- APK 构建命令和使用方法
- 包名命名规范（`com.github.{appId}`）
- APK 文件命名规范
- GitHub Actions 自动构建说明

## 包名命名规则

| 品牌 | appName | appId | 包名 |
|------|---------|-------|------|
| TikMatrix | TikMatrix | tikmatrix | com.github.tikmatrix |
| IgMatrix | IgMatrix | igmatrix | com.github.igmatrix |

## APK 文件命名

- 主 APK: `com.github.{appId}.apk`
- 测试 APK: `com.github.{appId}.test.apk`

示例：

- `com.github.igmatrix.apk`
- `com.github.igmatrix.test.apk`

## Agent 集成

包名会传递给 agent，agent 在初始化手机时会使用包名进行 APK 安装：

```rust
// agent 中使用包名安装 APK
let package_name = format!("com.github.{}", app_id);
agent.install_apk(&package_name).await?;
```

## 构建流程

### 本地构建

1. 确保 `tikmatrix-android` 仓库在同一父目录下
2. 运行构建命令：

   ```bash
   npm run build:whitelabel-apk:IgMatrix
   ```

3. APK 文件生成在：`tikmatrix-android/app/build/apk/`

### CI/CD 构建

GitHub Actions 会自动构建所有白标 APK：

1. 触发条件：手动触发 workflow
2. 构建步骤：
   - 检出两个仓库（desktop + android）
   - 配置 Java 和 Node.js 环境
   - 构建官方 TikMatrix APK
   - 构建 IgMatrix 白标 APK
   - 上传到 R2 存储
   - 更新 API 版本信息

## 测试

构建完成后，测试清单：

- [ ] APK 包名正确（`com.github.{appId}`）
- [ ] APK 文件名正确（`com.github.{appId}.apk`）
- [ ] 应用名称显示正确
- [ ] 应用图标正确
- [ ] 包可以正常安装
- [ ] Agent 可以识别并安装 APK

## 注意事项

1. **目录结构**：APK 构建脚本假设 `tikmatrix-android` 和 `tikmatrix-desktop` 在同一父目录下
2. **文件恢复**：脚本会自动备份并恢复所有修改的文件，即使构建失败也能正确恢复
3. **包名规范**：包名只能包含小写字母和数字，特殊字符会被自动移除
4. **Java 环境**：需要 JDK 17 来构建 APK
5. **Gradle 版本**：使用项目自带的 `gradlew`，无需单独安装 Gradle

## 下一步

如需添加更多白标品牌的 APK 构建：

1. 在 `.github/workflows/build-apk-all.yml` 中添加新的构建步骤
2. 参考 IgMatrix 的构建配置
3. 修改对应的 R2 上传路径和 API 更新参数
