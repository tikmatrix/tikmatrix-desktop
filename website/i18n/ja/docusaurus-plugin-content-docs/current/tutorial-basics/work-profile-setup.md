# Work Profile 工作资料配置

TikMatrix サポートに每台デバイス单独配置 Work Profile 用户，这对于使用企业デバイスまたは双开アプリ非常有用。

## 什么是 Work Profile

Work Profile（工作资料）是 Android の一个機能，它允许在同じデバイス上で创建一个独立の工作环境。通じて配置異なるの用户 ID，您できます以：

- 在企业管理のデバイス上で正常使用 TikMatrix
- に異なるのアプリ环境設定異なるの用户配置
- 实现更精细のデバイス管理和权限制御

## 使用 Shelter 工具クローンアプリ

在配置 Work Profile 之前，您需要使用 Shelter 工具克隆 TikTok 和 TikMatrix アプリ：

### 什么是 Shelter

Shelter 是一个开源アプリ程序，できます以在 Android デバイス上で创建和管理 Work Profile。它允许您在隔离の工作环境中运行重复のアプリ程序。

### 安装 Shelter

1. 从 [F-Droid](https://f-droid.org/packages/net.typeblog.shelter/) または [Google Play 商店](https://play.google.com/store/apps/details?id=net.typeblog.shelter) 下载 Shelter
2. 在デバイス上で安装し開く Shelter
3. 按照設定向导创建 Work Profile

### 克隆所需アプリ

設定 Shelter 后，您需要克隆 TikTok 和 TikMatrix アプリ：

1. **克隆 TikTok アプリ**：
   - 開く Shelter し转到"主界面"选项卡
   - 在アプリ程序列表中找到 TikTok
   - 点击"克隆到工作资料"按钮
   - など待克隆过程完成

2. **克隆 TikMatrix アプリ**：
   - 在 Shelter 中，在アプリ程序列表中找到 TikMatrix
   - 点击"克隆到工作资料"按钮
   - 确认克隆操作

### 認証克隆成功

克隆成功后：

- 您将在アプリ抽屉中看到带有公文包图标の TikTok 和 TikMatrix
- 这些是アプリ程序の Work Profile 版本
- 主配置文件中の原始アプリ程序保持不变

## など何配置 Work Profile

### 1. 開くデバイス工具栏

当您のデバイス接続し显示在 TikMatrix 主界面时：

1. 双击デバイス卡片进入大屏模式
2. 在デバイス屏幕右侧会出现一个工具栏
3. 工具栏默认处于收缩状态，マウス悬停时会自動展开

### 2. 找到 Work Profile 按钮

在工具栏の底部，您会看到一个公文包图标の按钮，这就是 Work Profile 配置按钮。

### 3. 設定用户 ID

1. 点击公文包图标按钮
2. 在弹出の对话框中输入用户 ID（例など：10）
3. 点击"保存"按钮

### 4. 确认配置

配置成功后，系统会显示"工作资料用户設定済み保存"の提示消息。

## 用户 ID 说明

### 常用用户 ID

- **0**: 主用户（默认用户）
- **10**: 第一个工作资料用户
- **11**: 第二个工作资料用户
- 更多用户 ID 依此类推

### など何查找用户 ID

など果您不确定デバイス上での用户 ID，できます以通じて以下方式查找：

```bash
adb shell pm list users
```

または在 TikMatrix の调试工具中実行：

```bash
pm list users
```

输出示例：

```text
Users:
  UserInfo{0:Owner:c13} running
  UserInfo{10:Work profile:1030} running
```

## 配置文件存储

Work Profile 配置会自動保存到 `data/work_profile_user.json` 文件中，形式など下：

```json
{
  "设备序列号1": "10",
  "设备序列号2": "0",
  "设备序列号3": "11"
}
```

## 管理デバイス配置

### 查看当前配置

每台デバイスの Work Profile 配置是独立の，您できます以：

1. に每台デバイス設定異なるの用户 ID
2. 随时修改现有デバイスの用户配置
3. 清空配置（输入空值し保存即できます删除配置）

### 一括管理

など果您需要管理大量デバイス，できます以直接编辑 `data/work_profile_user.json` 文件：

1. 关闭 TikMatrix アプリ
2. 開く配置文件
3. 按 JSON 形式添加または修改デバイス配置
4. 重新启动 TikMatrix

## 故障排除

### 常见问题

#### Q: 設定 Work Profile 后命令実行失败

A: 请确认：

- 用户 ID 是否正确
- デバイス上で是否存在对应の用户
- 是否有足够の权限訪問该用户

#### Q: など何取消 Work Profile 配置

A: 在配置对话框中清空用户 ID 输入框，然后点击保存即できます。

#### Q: 配置丢失怎么办

A: 配置存储在本地 JSON 文件中，など果丢失できます以重新設定，または者从备份中恢复 `data/work_profile_user.json` 文件。

#### Q: Shelter 相关问题

A: など果遇到 Shelter 相关问题：

- **克隆失败**: 确保您拥有管理员权限和足够の存储空间
- **クローンアプリ不できます见**: 检查 Shelter 中の Work Profile 是否正确激活
- **アプリ在 Work Profile 中崩溃**: 尝试重新クローンアプリ程序または更新 Shelter
- **找不到クローンアプリ**: 在アプリ抽屉中查找带有公文包图标のアプリ

## 最適な实践

### 企业环境使用

1. **统一管理**: に所有企业デバイス設定相同の用户 ID
2. **权限分离**: 使用異なる用户 ID 区分異なる权限级别
3. **备份配置**: 定期备份 `work_profile_user.json` 文件

### 个人使用

1. **アプリ隔离**: に異なる用途のアプリ設定異なる用户环境
2. **测试环境**: 使用独立の用户 ID 进行アプリ测试
3. **隐私保护**: 通じて用户分离提高隐私安全性

### Shelter 工具管理

1. **定期更新**: 保持 Shelter アプリ程序最新以确保互換性
2. **アプリ同步**: 确保在配置 Work Profile 之前克隆 TikTok 和 TikMatrix
3. **备份 Shelter 設定**: エクスポートし备份 Shelter 配置以便轻松恢复
4. **监控アプリ更新**: 当 TikTok または TikMatrix 更新时，您できます能需要更新克隆版本

## 技术说明

Work Profile 機能通じて在 ADB 命令中添加 `--user` 参数实现：

```bash
# 不使用 Work Profile
adb shell input tap 100 200

# 使用 Work Profile (用户 ID: 10)
adb shell --user 10 input tap 100 200
```

这确保命令在正确の用户环境中実行，避免权限问题和环境冲突。

---

通过合理配置 Work Profile，您可以在各种复杂的设备环境中顺利使用 TikMatrix，提高工作效率和管理便利性。
