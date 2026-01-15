# Work Profile 工作资料التكوين

TikMatrix 支持为每台设备单独التكوين Work Profile 用户，这对于استخدام企业设备أو双开应用非常有用。

## ما هو Work Profile

Work Profile（工作资料）نعم Android 的一个功能，它允许在同一设备上创建一个独立的工作环境。通过التكوين不同的用户 ID，您可以：

- 在企业管理的设备上正常استخدام TikMatrix
- 为不同的应用环境设置不同的用户التكوين
- 实现更精细的设备管理和权限控制

## استخدام Shelter 工具克隆应用

在التكوين Work Profile 之前，您需要استخدام Shelter 工具克隆 TikTok 和 TikMatrix 应用：

### ما هو Shelter

Shelter نعم一个开源应用程序，可以在 Android 设备上创建和管理 Work Profile。它允许您在隔离的工作环境中运行重复的应用程序。

### 安装 Shelter

1. 从 [F-Droid](https://f-droid.org/packages/net.typeblog.shelter/) أو [Google Play 商店](https://play.google.com/store/apps/details?id=net.typeblog.shelter) 下载 Shelter
2. 在设备上安装并打开 Shelter
3. 按照设置向导创建 Work Profile

### 克隆所需应用

设置 Shelter 后，您需要克隆 TikTok 和 TikMatrix 应用：

1. **克隆 TikTok 应用**：
   - 打开 Shelter 并转到"主界面"الخيارات卡
   - 在应用程序列表中找到 TikTok
   - 点击"克隆到工作资料"按钮
   - 等待克隆过程完成

2. **克隆 TikMatrix 应用**：
   - 在 Shelter 中，在应用程序列表中找到 TikMatrix
   - 点击"克隆到工作资料"按钮
   - 确认克隆操作

### 验证克隆成功

克隆成功后：

- 您将在应用抽屉中看到带有公文包图标的 TikTok 和 TikMatrix
- 这些نعم应用程序的 Work Profile 版本
- 主التكوين文件中的原始应用程序保持不变

## 如何التكوين Work Profile

### 1. 打开设备工具栏

عندما您的设备连接并显示在 TikMatrix 主界面时：

1. 双击设备卡片进入大屏模式
2. 在设备屏幕右侧会出现一个工具栏
3. 工具栏默认处于收缩状态，鼠标悬停时会自动展开

### 2. 找到 Work Profile 按钮

在工具栏的底部，您会看到一个公文包图标的按钮，这就نعم Work Profile التكوين按钮。

### 3. 设置用户 ID

1. 点击公文包图标按钮
2. 在弹出的对话框中输入用户 ID（على سبيل المثال：10）
3. 点击"保存"按钮

### 4. 确认التكوين

التكوين成功后，系统会显示"工作资料用户设置已保存"的تلميح消息。

## 用户 ID الوصف

### 常用用户 ID

- **0**: 主用户（默认用户）
- **10**: 第一个工作资料用户
- **11**: 第二个工作资料用户
- 更多用户 ID 依此类推

### 如何查找用户 ID

如果您不确定设备上的用户 ID，可以通过فيما يلي方式查找：

```bash
adb shell pm list users
```

أو在 TikMatrix 的调试工具中执行：

```bash
pm list users
```

输出أمثلة：

```text
Users:
  UserInfo{0:Owner:c13} running
  UserInfo{10:Work profile:1030} running
```

## التكوين文件存储

Work Profile التكوين会自动保存到 `data/work_profile_user.json` 文件中，格式كما يلي：

```json
{
  "设备序列号1": "10",
  "设备序列号2": "0",
  "设备序列号3": "11"
}
```

## 管理设备التكوين

### 查看عندما前التكوين

每台设备的 Work Profile التكويننعم独立的，您可以：

1. 为每台设备设置不同的用户 ID
2. 随时修改现有设备的用户التكوين
3. 清空التكوين（输入空值并保存即可删除التكوين）

### 批量管理

如果您需要管理大量设备，可以直接编辑 `data/work_profile_user.json` 文件：

1. 关闭 TikMatrix 应用
2. 打开التكوين文件
3. 按 JSON 格式添加أو修改设备التكوين
4. 重新启动 TikMatrix

## 故障排除

### 常见问题

#### Q: 设置 Work Profile 后命令执行失败

A: 请确认：

- 用户 ID نعملا正确
- 设备上نعملا存在对应的用户
- نعملا有足够的权限访问该用户

#### Q: 如何取消 Work Profile التكوين

A: 在التكوين对话框中清空用户 ID 输入框，然后点击保存即可。

#### Q: التكوين丢失了怎么办

A: التكوين存储在本地 JSON 文件中，如果丢失可以重新设置，أو者从备份中恢复 `data/work_profile_user.json` 文件。

#### Q: Shelter 相关问题

A: 如果遇到 Shelter 相关问题：

- **克隆失败**: 确保您拥有管理员权限和足够的存储空间
- **克隆应用不可见**: 检查 Shelter 中的 Work Profile نعملا正确激活
- **应用在 Work Profile 中崩溃**: 尝试重新克隆应用程序أو更新 Shelter
- **找不到克隆应用**: 在应用抽屉中查找带有公文包图标的应用

## 最佳实践

### 企业环境استخدام

1. **统一管理**: 为所有企业设备设置相同的用户 ID
2. **权限分离**: استخدام不同用户 ID 区分不同权限级别
3. **备份التكوين**: 定期备份 `work_profile_user.json` 文件

### 个人استخدام

1. **应用隔离**: 为不同用途的应用设置不同用户环境
2. **测试环境**: استخدام独立的用户 ID 进行应用测试
3. **隐私保护**: 通过用户分离提高隐私安全性

### Shelter 工具管理

1. **定期更新**: 保持 Shelter 应用程序最新以确保兼容性
2. **应用同步**: 确保在التكوين Work Profile 之前克隆了 TikTok 和 TikMatrix
3. **备份 Shelter 设置**: 导出并备份 Shelter التكوين以便轻松恢复
4. **监控应用更新**: عندما TikTok أو TikMatrix 更新时，您可能需要更新克隆版本

## 技术الوصف

Work Profile 功能通过在 ADB 命令中添加 `--user` المعاملات实现：

```bash
# 不使用 Work Profile
adb shell input tap 100 200

# 使用 Work Profile (用户 ID: 10)
adb shell --user 10 input tap 100 200
```

这确保了命令在正确的用户环境中执行，避免权限问题和环境冲突。

---

通过合理التكوين Work Profile，您可以在各种复杂的设备环境中顺利استخدام TikMatrix，提高工作效率和管理便利性。
