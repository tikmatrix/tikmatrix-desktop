# Work Profile 工作资料Configurazione

TikMatrix Supporto为Ogni台Dispositivi单独Configurazione Work Profile 用户，这对于UtilizzoEnterpriseDispositivi或双开Applica非常有用。

## 什么Sì Work Profile

Work Profile（工作资料）Sì Android 的一个Funzionalità，它允许在同一Dispositivi上创建一个独立的工作环境。通过Configurazione不同的用户 ID，您可以：

- 在EnterpriseGestione的Dispositivi上正常Utilizzo TikMatrix
- 为不同的Applica环境Impostazioni不同的用户Configurazione
- 实现更精细的DispositiviGestione和权限控制

## Utilizzo Shelter 工具Clona Applicazione

在Configurazione Work Profile 之前，您需要Utilizzo Shelter 工具克隆 TikTok 和 TikMatrix Applica：

### 什么Sì Shelter

Shelter Sì一个开源ApplicaProgramma，可以在 Android Dispositivi上创建和Gestione Work Profile。它允许您在隔离的工作环境中Esegui重复的ApplicaProgramma。

### Installa Shelter

1. 从 [F-Droid](https://f-droid.org/packages/net.typeblog.shelter/) 或 [Google Play 商店](https://play.google.com/store/apps/details?id=net.typeblog.shelter) Scarica Shelter
2. 在Dispositivi上Installa并Apri Shelter
3. 按照Impostazioni向导创建 Work Profile

### 克隆所需Applica

Impostazioni Shelter 后，您需要克隆 TikTok 和 TikMatrix Applica：

1. **克隆 TikTok Applica**：
   - Apri Shelter 并转到"主界面"选项卡
   - 在ApplicaProgramma列表中找到 TikTok
   - 点击"克隆到工作资料"按钮
   - In Attesa克隆过程Completato

2. **克隆 TikMatrix Applica**：
   - 在 Shelter 中，在ApplicaProgramma列表中找到 TikMatrix
   - 点击"克隆到工作资料"按钮
   - Conferma克隆Operazioni

### 验证克隆Successo

克隆Successo后：

- 您将在Applica抽屉中看到带有公文包图标的 TikTok 和 TikMatrix
- 这些SìApplicaProgramma的 Work Profile Versione
- 主Configurazione文件中的原始ApplicaProgramma保持不变

## 如何Configurazione Work Profile

### 1. ApriDispositivi工具栏

当您的DispositiviConnessione并Mostra在 TikMatrix 主界面时：

1. 双击Dispositivi卡片进入大屏模式
2. 在Dispositivi屏幕右侧会出现一个工具栏
3. 工具栏Predefinito处于收缩状态，鼠标悬停时会AutomaticoEspandi

### 2. 找到 Work Profile 按钮

在工具栏的底部，您会看到一个公文包图标的按钮，这就Sì Work Profile Configurazione按钮。

### 3. Impostazioni用户 ID

1. 点击公文包图标按钮
2. 在弹出的对话框中输入用户 ID（例如：10）
3. 点击"Salva"按钮

### 4. ConfermaConfigurazione

ConfigurazioneSuccesso后，系统会Mostra"工作资料用户Impostazioni已Salva"的Suggerimento消息。

## 用户 ID Istruzioni

### 常用用户 ID

- **0**: 主用户（Predefinito用户）
- **10**: 第一个工作资料用户
- **11**: 第二个工作资料用户
- Altro用户 ID 依此类推

### 如何Trova用户 ID

如果您不确定Dispositivi上的用户 ID，可以通过以下方式Trova：

```bash
adb shell pm list users
```

或在 TikMatrix 的调试工具中Esegui：

```bash
pm list users
```

输出Esempio：

```text
Users:
  UserInfo{0:Owner:c13} running
  UserInfo{10:Work profile:1030} running
```

## Configurazione文件存储

Work Profile Configurazione会AutomaticoSalva到 `data/work_profile_user.json` 文件中，格式如下：

```json
{
  "设备序列号1": "10",
  "设备序列号2": "0",
  "设备序列号3": "11"
}
```

## Gestisci DispositiviConfigurazione

### 查看CorrenteConfigurazione

Ogni台Dispositivi的 Work Profile ConfigurazioneSì独立的，您可以：

1. 为Ogni台DispositiviImpostazioni不同的用户 ID
2. 随时Modifica现有Dispositivi的用户Configurazione
3. SvuotaConfigurazione（输入空值并Salva即可EliminaConfigurazione）

### In MassaGestione

如果您需要Gestione大量Dispositivi，可以直接Modifica `data/work_profile_user.json` 文件：

1. Chiudi TikMatrix Applica
2. ApriConfigurazione文件
3. 按 JSON 格式Aggiungi或ModificaDispositiviConfigurazione
4. 重新Avvia TikMatrix

## Risoluzione dei Problemi

### Domande Frequenti

#### Q: Impostazioni Work Profile 后命令EseguiFallito

A: 请Conferma：

- 用户 ID Vuoi正确
- Dispositivi上Vuoi存在对应的用户
- Vuoi有足够的权限访问该用户

#### Q: 如何Annulla Work Profile Configurazione

A: 在Configurazione对话框中Svuota用户 ID 输入框，然后点击Salva即可。

#### Q: Configurazione丢失了怎么办

A: Configurazione存储在本地 JSON 文件中，如果丢失可以重新Impostazioni，或者从备份中恢复 `data/work_profile_user.json` 文件。

#### Q: Shelter 相关问题

A: 如果遇到 Shelter 相关问题：

- **克隆Fallito**: 确保您拥有Gestione员权限和足够的存储空间
- **Clona Applicazione不可见**: 检查 Shelter 中的 Work Profile Vuoi正确Attivazione
- **Applica在 Work Profile 中崩溃**: 尝试重新Clona ApplicazioneProgramma或Aggiorna Shelter
- **找不到Clona Applicazione**: 在Applica抽屉中Trova带有公文包图标的Applica

## 最佳实践

### Enterprise环境Utilizzo

1. **统一Gestione**: 为TuttiEnterpriseDispositiviImpostazioni相同的用户 ID
2. **权限分离**: Utilizzo不同用户 ID 区分不同权限级别
3. **备份Configurazione**: 定期备份 `work_profile_user.json` 文件

### 个人Utilizzo

1. **Applica隔离**: 为不同用途的ApplicaImpostazioni不同用户环境
2. **测试环境**: Utilizzo独立的用户 ID 进行Applica测试
3. **隐私保护**: 通过用户分离提高隐私安全性

### Shelter 工具Gestione

1. **定期Aggiorna**: 保持 Shelter ApplicaProgrammaUltimi以确保兼容性
2. **ApplicaSincronizzazione**: 确保在Configurazione Work Profile 之前克隆了 TikTok 和 TikMatrix
3. **备份 Shelter Impostazioni**: Esporta并备份 Shelter Configurazione以便轻松恢复
4. **监控ApplicaAggiorna**: 当 TikTok 或 TikMatrix Aggiorna时，您可能需要Aggiorna克隆Versione

## 技术Istruzioni

Work Profile Funzionalità通过在 ADB 命令中Aggiungi `--user` 参数实现：

```bash
# 不使用 Work Profile
adb shell input tap 100 200

# 使用 Work Profile (用户 ID: 10)
adb shell --user 10 input tap 100 200
```

这确保了命令在正确的用户环境中Esegui，避免权限问题和环境冲突。

---

通过合理Configurazione Work Profile，您可以在各种复杂的Dispositivi环境中顺利Utilizzo TikMatrix，提高工作效率和Gestione便利性。
