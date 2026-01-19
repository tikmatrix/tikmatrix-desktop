---
sidebar_position: 9
---

# Configuração de White Label

:::info Assinatura Anual Necessária
A funcionalidade de White Label está disponível exclusivamente para usuários de **Assinatura Anual**. Entre em contato com nossa equipe de suporte via [Telegram](https://t.me/tikmatrix_agent_bot) para obter seu código de desbloqueio após adquirir um plano anual.
:::

O recurso de White Label permite que você personalize a marca do TikMatrix para corresponder à identidade da sua empresa. Você pode modificar o nome do aplicativo, logotipo e informações da marca para criar uma versão personalizada do TikMatrix.

## Recursos

### Configurações Básicas

- **App Name**: Personalizar o nome de exibição do aplicativo
- **Logo Upload**: Fazer upload do seu logotipo principal personalizado (recomendado 128x128px)
- **Favicon**: Definir favicon personalizado para o aplicativo

### Configurações de Marca

- **Support Email**: Endereço de email de suporte ao cliente
- **Tutorial URL**: Link de tutorial/documentação personalizado
- **Telegram URL**: Definir link do seu grupo ou canal Telegram

### Alternadores de Recursos

- **Show Tutorial Link**: Controlar visibilidade do link do tutorial
- **Show Brand Info**: Controlar exibição de informações da marca

## Métodos de Configuração

### Método 1: Configuração via UI

1. Inicie o aplicativo TikMatrix
2. Clique no ícone de paleta 🎨 na barra de título
3. Configure os parâmetros no diálogo de Configurações de White Label:
   - **App Name**: Insira o nome do seu aplicativo personalizado
   - **Main Logo**: Faça upload do seu arquivo de logotipo (PNG/JPG, 128x128px recomendado)
   - **Support Email**: Insira seu endereço de email de suporte
   - **Tutorial URL**: Insira sua URL de tutorial personalizada
   - **Telegram URL**: Insira sua URL de grupo/canal Telegram
   - **Feature Toggles**: Habilite/desabilite links de tutorial e exibição de informações da marca
4. Clique em "Save" para aplicar as configurações

### Método 2: Arquivo de Configuração

1. Copie o arquivo de configuração de exemplo:

   ```bash
   cp examples/whitelabel-config.json src/config/whitelabel-custom.json
   ```

2. Edite o arquivo de configuração:

   ```json
   {
     "appName": "Your App Name",
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

3. Salve o arquivo e reinicie o aplicativo

### Método 3: Ferramenta de Linha de Comando

1. Navegue até o diretório do projeto:

   ```bash
   cd tikmatrix-desktop
   ```

2. Execute a ferramenta de configuração:

   ```bash
   node scripts/whitelabel-config.js
   ```

3. Siga as instruções para configurar cada parâmetro passo a passo

## Construindo Versão Personalizada

### 1. Preparar Arquivos de Recursos

```bash
# Coloque seus arquivos de logotipo nos locais corretos
src/assets/your-logo.webp       # Logotipo principal
public/your-favicon.ico        # Favicon web
src-tauri/icons/               # Ícones do aplicativo (vários tamanhos)
```

### 2. Configurar Parâmetros de Build

Use a ferramenta de linha de comando ou edite manualmente a configuração:

```bash
# Usando ferramenta de linha de comando
node scripts/whitelabel-config.js

# Ou editar manualmente
src/config/whitelabel-build.json
```

### 3. Construir Aplicativo

```bash
# Modo de desenvolvimento
npm run dev

# Build de produção
npm run build

# Construir aplicativo Tauri
npm run tauri build
```

## Prioridade de Configuração

O sistema usa a seguinte ordem de prioridade para configuração:

1. **Runtime Config**: Browser LocalStorage `whitelabel_config`
2. **Build Config**: `src/config/whitelabel-build.json` (usado durante o build)
3. **Example Config**: `examples/whitelabel-config.json`
4. **Default Config**: Valores padrão integrados

## Requisitos de Logotipo

### Logotipo Principal

- **Formato**: PNG, JPG ou SVG
- **Tamanho**: 128x128px (recomendado)
- **Fundo**: Transparente (para PNG)
- **Uso**: Cabeçalho, tela de splash, diálogo sobre

### Favicon

- **Formato**: ICO ou PNG
- **Tamanho**: 32x32px ou 16x16px
- **Uso**: Aba do navegador, ícone da janela

### Ícones do Aplicativo (para builds)

- **Formatos**: PNG, ICO, ICNS
- **Tamanhos**: 32x32, 128x128, 256x256, 512x512
- **Localização**: Diretório `src-tauri/icons/`

## Integração de API

### API JavaScript

```javascript
import { 
  getWhiteLabelConfig,
  saveWhiteLabelConfig, 
  resetWhiteLabelConfig,
  validateWhiteLabelConfig 
} from './config/whitelabel.js';

// Obter configuração atual
const config = getWhiteLabelConfig();

// Salvar nova configuração
saveWhiteLabelConfig(newConfig);

// Redefinir para padrões
resetWhiteLabelConfig();

// Validar configuração
validateWhiteLabelConfig(config);
```

### Funções Utilitárias

```javascript
import { 
  initWhiteLabel,
  updateDocumentTitle,
  updateFavicon
} from './utils/whitelabel.js';

// Inicializar white label ao iniciar o aplicativo
initWhiteLabel();

// Atualizar título do documento
updateDocumentTitle('Your App Name');

// Atualizar favicon
updateFavicon('/path/to/favicon.ico');
```

## Melhores Práticas

### Design de Logotipo

- Use imagens de alta resolução para exibição nítida
- Mantenha a marca consistente em todos os tamanhos de logotipo
- Teste logotipos em fundos claros e escuros
- Certifique-se de que os logotipos sejam legíveis em tamanhos pequenos

### Consistência de Marca

- Use cores e fontes consistentes por todo o aplicativo
- Alinhe com suas diretrizes de marca existentes
- Teste a interface personalizada em diferentes tamanhos de tela
- Mantenha aparência profissional

### Configuração de URL

- Use URLs HTTPS para todos os links externos
- Teste todos os links antes da implantação
- Certifique-se de que os canais de suporte sejam monitorados adequadamente
- Mantenha URLs de documentação atualizadas

## Solução de Problemas

### Problemas Comuns

**Logotipo não está sendo exibido:**

- Verifique o caminho do arquivo e permissões
- Verifique se o formato da imagem é suportado
- Certifique-se de que o tamanho da imagem seja apropriado
- Limpe o cache do navegador e reinicie o aplicativo

**Configuração não está sendo salva:**

- Verifique as permissões do sistema de arquivos
- Verifique se a sintaxe JSON está correta
- Certifique-se de que o diretório de configuração exista
- Tente executar como administrador (se necessário)

**Build falhando:**

- Verifique se todos os arquivos de recursos existem
- Verifique a sintaxe do arquivo de configuração
- Certifique-se de que os arquivos de ícone estejam no formato correto
- Revise os logs de build para erros específicos

### Obtendo Ajuda

Se você encontrar problemas com a configuração de White Label:

1. Verifique a seção de solução de problemas acima
2. Revise a sintaxe do arquivo de configuração
3. Entre em contato com o suporte via [Telegram](https://t.me/tikmatrix_agent_bot)
4. Inclua seu arquivo de configuração e mensagens de erro ao relatar problemas

## Licença e Uso

- A funcionalidade de White Label está disponível apenas para usuários de Assinatura Anual
- Direitos de marca personalizada estão incluídos na sua assinatura
- A redistribuição de versões personalizadas pode exigir licenciamento adicional
- Entre em contato com o suporte para opções de licenciamento empresarial

---

**Precisa do código de desbloqueio?** Entre em contato com nossa equipe de suporte via [Telegram](https://t.me/tikmatrix_agent_bot) com os detalhes da sua assinatura anual.
