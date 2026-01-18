---
sidebar_position: 9
---

# White LabelFunzionalitàImpostazioni

:::info 需要anni付订阅
White LabelFunzionalità仅对**anni付订阅**用户开放。Acquistaanni付计划后，请通过 [Telegram](https://t.me/tikmatrix_agent_bot) ContattaAssistenza获取解锁码。
:::

White LabelFunzionalità允许您Personalizzato TikMatrix 的品牌标识以匹配您的公司形象。您可以ModificaApplica名称、Logo和品牌信息，创建个性化的 TikMatrix Versione。

## FunzionalitàCaratteristiche

### 基本Impostazioni

- **Applica名称**: PersonalizzatoApplicaMostra名称
- **LogoCarica**: Carica您的Personalizzato主Logo（Consigliati128x128px）
- **网站图标**: ImpostazioniApplica的Personalizzato图标

### 品牌Impostazioni

- **Supporto邮箱**: 客户Supporto邮箱地址
- **Tutorial链接**: PersonalizzatoTutorial/Documentazione链接
- **Telegram链接**: Impostazioni您的TelegramGruppo或频道链接

### Funzionalità开关

- **MostraTutorial链接**: 控制Tutorial链接的Mostra
- **Mostra品牌信息**: 控制品牌信息的Mostra

## Impostazioni方法

### 方法一：界面Configurazione

1. Avvia TikMatrix Applica
2. 点击Titolo栏的调色板图标 🎨
3. 在Impostazioni White Label对话框中Configurazione参数：
   - **Applica名称**: 输入您的PersonalizzatoApplica名称
   - **主Logo**: Carica您的Logo文件（PNG/JPG，Consigliati128x128px）
   - **Supporto邮箱**: 输入您的Supporto邮箱地址
   - **Tutorial链接**: 输入您的PersonalizzatoTutorial链接
   - **Telegram链接**: 输入您的TelegramGruppo/频道链接
   - **Funzionalità开关**: Abilita/DisabilitaTutorial链接和品牌信息Mostra
4. 点击"Salva"ApplicaImpostazioni

### 方法二：Configurazione文件

1. CopiaEsempioConfigurazione文件：

   ```bash
   cp examples/whitelabel-config.json src/config/whitelabel-custom.json
   ```

2. ModificaConfigurazione文件：

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

3. Salva文件并重启Applica

### 方法三：命令行工具

1. 进入项目目录：

   ```bash
   cd tikmatrix-desktop
   ```

2. EseguiConfigurazione工具：

   ```bash
   node scripts/whitelabel-config.js
   ```

3. 按照Suggerimento逐步Configurazione各项参数

## 构建PersonalizzatoVersione

### 1. 准备资源文件

```bash
# 将您的Logo文件放在正确位置
src/assets/your-logo.webp       # 主Logo
public/your-favicon.ico        # 网页图标
src-tauri/icons/               # 应用图标（各种尺寸）
```

### 2. Configurazione构建参数

Utilizzo命令行工具或ManualeModificaConfigurazione：

```bash
# 使用命令行工具
node scripts/whitelabel-config.js

# 或手动编辑
src/config/whitelabel-build.json
```

### 3. 构建Applica

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 构建Tauri应用
npm run tauri build
```

## Configurazione优先级

系统按以下优先顺序UtilizzoConfigurazione：

1. **Esegui时Configurazione**: Visualizzazioni器LocalStorage中的 `whitelabel_config`
2. **构建Configurazione**: `src/config/whitelabel-build.json`（构建时Utilizzo）
3. **EsempioConfigurazione**: `examples/whitelabel-config.json`
4. **PredefinitoConfigurazione**: 内置Predefinito值

## Logo要求

### 主Logo

- **格式**: PNG、JPG或SVG
- **尺寸**: 128x128px（Consigliati）
- **Sfondo**: 透明Sfondo（PNG格式）
- **用途**: Titolo栏、Avvia画面、Info对话框

### 网站图标

- **格式**: ICO或PNG
- **尺寸**: 32x32px或16x16px
- **用途**: Visualizzazioni器Tag页、窗口图标

### Applica图标（用于构建）

- **格式**: PNG、ICO、ICNS
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

## 最佳实践

### Logo设计

- Utilizzo高分辨率图像以获得清晰Mostra
- 在TuttiLogo尺寸中保持一致的品牌形象
- 在明暗Sfondo下测试Logo效果
- 确保Logo在小尺寸下仍可读

### 品牌一致性

- 在整个界面中Utilizzo一致的颜色和字体
- 与您现有的品牌Guida保持一致
- 在不同屏幕尺寸下测试Personalizzato界面
- 保持Professionale外观

### 链接Configurazione

- 对Tutti外部链接UtilizzoHTTPS
- 部署前测试Tutti链接
- 确保Supporto渠道得到适当监控
- 保持Documentazione链接的Ultimi状态

## Risoluzione dei Problemi

### Domande Frequenti

**Logo未Mostra：**

- 检查文件路径和权限
- 验证图像格式受Supporto
- 确保图像尺寸合适
- CancellaVisualizzazioni器缓存并重启Applica

**Configurazione未Salva：**

- 检查文件系统权限
- 验证JSON语法正确
- 确保Configurazione目录存在
- 尝试以Gestione员身份Esegui（如需要）

**构建Fallito：**

- 验证Tutti资源文件存在
- 检查Configurazione文件语法
- 确保图标文件格式正确
- 查看构建日志获取具体Errore

### 获取Aiuto

如果在Impostazioni White Label过程中遇到问题：

1. 查看上述Risoluzione dei Problemi部分
2. 检查Configurazione文件语法
3. 通过 [Telegram](https://t.me/tikmatrix_agent_bot) Contatta技术Supporto
4. 报告问题时请包含您的Configurazione文件和Errore信息

## 许可和Utilizzo

- White LabelFunzionalità仅对anni付订阅用户开放
- Personalizzato品牌权利包含在您的订阅中
- 分发PersonalizzatoVersione可能需要额外许可
- Enterprise许Opzionale项请ContattaAssistenza

---

**需要解锁码？** 请携带您的anni付订阅Dettagli通过 [Telegram](https://t.me/tikmatrix_agent_bot) ContattaAssistenza团队。
