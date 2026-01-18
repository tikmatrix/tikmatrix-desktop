---
sidebar_position: 2
---

# Problemi Noti

## Porta冲突Errore

如果在日志中出现以下Errore信息：

```text
tcp connect error: The connection could not be established because the target computer refused the connection request. (os error 10061)"
```

这表示存在Porta冲突问题。要解决此问题：

1. **完全重启TikMatrix/IgMatrixSoftware**后Riprova
2. **避免在UtilizzoTikMatrix/IgMatrix时同时Utilizzo其他控制Software**，因为它们可能导致Porta冲突
3. 确保没有其他ApplicaProgrammaUtilizzo相同的通信Porta

此Errore通常发生在多个Dispositivi控制ApplicaProgramma同时Esegui时，导致通信Porta冲突。

## Cloud PhoneScriptFallito

请尽量保证你的电脑与Cloud Phone所在机房之间的Rete带宽充足且稳定。为获得最佳效果，Consigliato将电脑与Cloud Phone机房放在同一国家或同一地区，以降低延迟和丢包，从而保证Automatico化Attività稳定可靠Esegui。

## ScriptEsegui不稳定, Casuale性Errore, OgnivolteEsegui结果不一致

通常跟ADBConnessione质量有关, 如果UtilizzoUSBConnessione, 请尝试更换数据线或USB接口; 如果Utilizzo无线ADBConnessione, 请确保电脑与Dispositivi之间的ReteConnessione稳定, 并且信号强度良好。

## TikTok/InstagramApplicaAggiorna导致的ScriptFallito

TikTok和InstagramApplica会不定期Aggiorna, 有时会导致Automatico化Script无法正常Esegui。请提交工单, 我们会尽快AggiornaScript以适应UltimiVersione的Applica。
