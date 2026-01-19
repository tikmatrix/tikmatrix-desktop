# Configuração de Perfil de Trabalho

O TikMatrix suporta a configuração de usuários de Perfil de Trabalho para cada dispositivo individualmente, o que é muito útil para dispositivos gerenciados por empresas ou ambientes de aplicativos duplos.

## O que é Perfil de Trabalho

Perfil de Trabalho é um recurso do Android que permite criar um ambiente de trabalho independente no mesmo dispositivo. Ao configurar diferentes IDs de usuário, você pode:

- Usar o TikMatrix normalmente em dispositivos gerenciados por empresas
- Definir diferentes configurações de usuário para diferentes ambientes de aplicativo
- Alcançar gerenciamento de dispositivos e controle de permissões mais granular

## Usando a Ferramenta Shelter para Clonar Aplicativos

Antes de configurar o Perfil de Trabalho, você precisa usar a ferramenta Shelter para clonar os aplicativos TikTok e TikMatrix:

### O que é Shelter

Shelter é um aplicativo de código aberto que cria e gerencia Perfil de Trabalho em dispositivos Android. Ele permite que você execute aplicativos duplicados em um ambiente de trabalho isolado.

### Instalando o Shelter

1. Baixe o Shelter do [F-Droid](https://f-droid.org/packages/net.typeblog.shelter/) ou [Google Play Store](https://play.google.com/store/apps/details?id=net.typeblog.shelter)
2. Instale e abra o Shelter no seu dispositivo
3. Siga o assistente de configuração para criar um Perfil de Trabalho

### Clonando Aplicativos Necessários

Após configurar o Shelter, você precisa clonar tanto os aplicativos TikTok quanto TikMatrix:

1. **Clonar Aplicativo TikTok**:
   - Abra o Shelter e vá para a aba "Main"
   - Encontre o TikTok na lista de aplicativos
   - Toque no botão "Clone to Work Profile"
   - Aguarde a conclusão do processo de clonagem

2. **Clonar Aplicativo TikMatrix**:
   - No Shelter, localize o TikMatrix na lista de aplicativos
   - Toque no botão "Clone to Work Profile"
   - Confirme a operação de clonagem

### Verificar Sucesso da Clonagem

Após clonagem bem-sucedida:

- Você verá tanto o TikTok quanto o TikMatrix com um ícone de maleta na gaveta de aplicativos
- Estas são as versões de Perfil de Trabalho dos aplicativos
- Os aplicativos originais permanecem inalterados no perfil principal

## Como Configurar Perfil de Trabalho

### 1. Abrir Barra de Ferramentas do Dispositivo

Quando seu dispositivo está conectado e exibido na interface principal do TikMatrix:

1. Clique duas vezes no cartão do dispositivo para entrar no modo de tela cheia
2. Uma barra de ferramentas aparecerá no lado direito da tela do dispositivo
3. A barra de ferramentas está recolhida por padrão e se expandirá automaticamente quando você passar o mouse sobre ela

### 2. Encontrar o Botão de Perfil de Trabalho

Na parte inferior da barra de ferramentas, você verá um botão de ícone de maleta, que é o botão de configuração do Perfil de Trabalho.

### 3. Definir ID de Usuário

1. Clique no botão de ícone de maleta
2. Insira o ID de usuário no diálogo popup (ex.: 10)
3. Clique no botão "Save"

### 4. Confirmar Configuração

Após configuração bem-sucedida, o sistema exibirá uma notificação "Work Profile user settings saved".

## Descrição do ID de Usuário

### IDs de Usuário Comuns

- **0**: Usuário principal (usuário padrão)
- **10**: Primeiro usuário de perfil de trabalho
- **11**: Segundo usuário de perfil de trabalho
- IDs de usuário adicionais seguem este padrão

### Como Encontrar o ID de Usuário

Se você não tiver certeza sobre os IDs de usuário no seu dispositivo, pode encontrá-los usando:

```bash
adb shell pm list users
```

Ou executar nas ferramentas de depuração do TikMatrix:

```bash
pm list users
```

Exemplo de saída:

```text
Users:
  UserInfo{0:Owner:c13} running
  UserInfo{10:Work profile:1030} running
```

## Armazenamento do Arquivo de Configuração

As configurações de Perfil de Trabalho são automaticamente salvas no arquivo `data/work_profile_user.json` com o seguinte formato:

```json
{
  "device_serial_1": "10",
  "device_serial_2": "0",
  "device_serial_3": "11"
}
```

## Gerenciando Configurações de Dispositivos

### Ver Configuração Atual

A configuração de Perfil de Trabalho de cada dispositivo é independente. Você pode:

1. Definir diferentes IDs de usuário para cada dispositivo
2. Modificar configurações de usuário de dispositivos existentes a qualquer momento
3. Limpar configuração (insira valor vazio e salve para excluir configuração)

### Gerenciamento em Lote

Se você precisar gerenciar um grande número de dispositivos, pode editar diretamente o arquivo `data/work_profile_user.json`:

1. Feche o aplicativo TikMatrix
2. Abra o arquivo de configuração
3. Adicione ou modifique configurações de dispositivos no formato JSON
4. Reinicie o TikMatrix

## Solução de Problemas

### Problemas Comuns

#### P: Comandos falham após definir Perfil de Trabalho

R: Por favor confirme:

- Se o ID de usuário está correto
- Se o usuário correspondente existe no dispositivo
- Se você tem permissões suficientes para acessar aquele usuário

#### P: Como cancelar a configuração de Perfil de Trabalho

R: Limpe o campo de entrada de ID de usuário no diálogo de configuração e clique em salvar.

#### P: O que fazer se a configuração for perdida

R: As configurações são armazenadas em um arquivo JSON local. Se perdidas, você pode reconfigurar ou restaurar o arquivo `data/work_profile_user.json` do backup.

#### P: Problemas relacionados ao Shelter

R: Se você encontrar problemas com o Shelter:

- **Clonagem falha**: Certifique-se de ter permissões de administrador e espaço de armazenamento suficiente
- **Aplicativos clonados não visíveis**: Verifique se o Perfil de Trabalho está ativado corretamente no Shelter
- **Aplicativos travam no Perfil de Trabalho**: Tente clonar novamente os aplicativos ou atualizar o Shelter
- **Não consegue encontrar aplicativos clonados**: Procure por aplicativos com ícones de maleta na gaveta de aplicativos

## Melhores Práticas

### Ambiente Empresarial

1. **Gerenciamento Unificado**: Defina o mesmo ID de usuário para todos os dispositivos empresariais
2. **Separação de Permissões**: Use diferentes IDs de usuário para distinguir diferentes níveis de permissão
3. **Backup de Configuração**: Faça backup regularmente do arquivo `work_profile_user.json`

### Uso Pessoal

1. **Isolamento de Aplicativos**: Defina diferentes ambientes de usuário para diferentes propósitos
2. **Ambiente de Teste**: Use IDs de usuário independentes para testes de aplicativos
3. **Proteção de Privacidade**: Melhore a segurança da privacidade através da separação de usuários

### Gerenciamento da Ferramenta Shelter

1. **Atualizações Regulares**: Mantenha o aplicativo Shelter atualizado para garantir compatibilidade
2. **Sincronização de Aplicativos**: Certifique-se de que tanto o TikTok quanto o TikMatrix estejam clonados antes de configurar o Perfil de Trabalho
3. **Backup de Configurações do Shelter**: Exporte e faça backup das configurações do Shelter para fácil recuperação
4. **Monitorar Atualizações de Aplicativos**: Quando o TikTok ou TikMatrix atualizar, você pode precisar atualizar as versões clonadas também

## Detalhes Técnicos

A função de Perfil de Trabalho é implementada adicionando o parâmetro `--user` aos comandos ADB:

```bash
# Sem Perfil de Trabalho
adb shell input tap 100 200

# Com Perfil de Trabalho (ID de Usuário: 10)
adb shell --user 10 input tap 100 200
```

Isso garante que os comandos sejam executados no ambiente de usuário correto, evitando problemas de permissão e conflitos de ambiente.

---

Ao configurar adequadamente o Perfil de Trabalho, você pode usar o TikMatrix suavemente em vários ambientes de dispositivos complexos, melhorando a eficiência do trabalho e a conveniência de gerenciamento.
