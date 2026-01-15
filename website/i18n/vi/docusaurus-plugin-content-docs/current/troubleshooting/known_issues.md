---
sidebar_position: 2
---

# 已知问题

## 端口冲突错误

如果在日志中出现以下错误信息：

```text
tcp connect error: The connection could not be established because the target computer refused the connection request. (os error 10061)"
```

这表示存在端口冲突问题。要解决此问题：

1. **完全重启TikMatrix/IgMatrix软件**后重试
2. **避免在使用TikMatrix/IgMatrix时同时使用其他控制软件**，因为它们可能导致端口冲突
3. 确保没有其他应用程序使用相同的通信端口

此错误通常发生在多个设备控制应用程序同时运行时，导致通信端口冲突。

## 云手机脚本失败

请尽量保证你的电脑与云手机所在机房之间的网络带宽充足且稳定。为获得最佳效果，建议将电脑与云手机机房放在同一国家或同一地区，以降低延迟和丢包，从而保证自动化任务稳定可靠运行。

## 脚本运行不稳定, 随机性错误, 每次运行结果不一致

通常跟ADB连接质量有关, 如果使用USB连接, 请尝试更换数据线或USB接口; 如果使用无线ADB连接, 请确保电脑与设备之间的网络连接稳定, 并且信号强度良好。

## TikTok/Instagram应用更新导致的脚本失败

TikTok和Instagram应用会不定期更新, 有时会导致自动化脚本无法正常运行。请提交工单, 我们会尽快更新脚本以适应最新版本的应用。
