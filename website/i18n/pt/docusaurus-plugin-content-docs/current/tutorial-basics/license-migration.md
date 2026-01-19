---
sidebar_position: 9
---

# Migração de Licença

Transfira sua licença do TikMatrix de um computador para outro. Isso é útil ao atualizar hardware ou trocar de computador.

## Requisitos

- Licença ativa no computador atual (código de ativação ou assinatura Stripe)
- Computador de destino sem licença TikMatrix existente
- Máximo de 5 migrações por mês permitidas

## Etapas de Migração

### Passo 1: Abrir Diálogo de Migração

1. Inicie o TikMatrix no seu computador atual
2. Clique no **ícone de Licença** na barra de título
3. Clique no botão **"Migrate License"**

![License Migration Button](../img/migrate-button.webp)

### Passo 2: Obter ID da Máquina de Destino

No seu computador de destino:

1. Instale e inicie o TikMatrix
2. Clique no **ícone de Licença** na barra de título
3. Copie o **Machine ID**
4. Envie este ID para o seu computador atual

![Target Machine ID](../img/target-machine-id.webp)

### Passo 3: Validar e Migrar

De volta ao seu computador atual:

1. Cole o **Target Machine ID** no diálogo de migração
2. Clique em **"Validate"** para verificar a compatibilidade
3. Revise os detalhes da licença mostrados

![Validation Success](../img/validation-success.webp)

1. Marque a caixa de confirmação
2. Clique em **"Migrate License"** e confirme

![Migration Confirmation](../img/migration-confirm.webp)

### Passo 4: Completar a Configuração

1. Aguarde a conclusão da migração
2. No seu computador de destino, reinicie o TikMatrix
3. Sua licença agora está ativa no novo computador

![Migration Success](../img/migration-success.webp)

## Avisos Importantes

⚠️ **A migração de licença não pode ser desfeita**

- A licença se move completamente da origem para o destino
- Seu computador antigo perde o acesso imediatamente
- Máximo de 5 migrações por mês
- Ambos os computadores precisam de internet estável

## O que é Migrado

### Para Códigos de Ativação

- Status da licença e dias restantes
- Informações do código de licença

### Para Assinaturas Stripe

- Status da assinatura e informações de cobrança
- Datas de renovação e detalhes do plano

## Solução de Problemas

### Mensagens de Erro Comuns

#### "Target machine already has a license"

O computador de destino já tem uma licença ativa. A migração só funciona para computadores sem licenças existentes.

#### "Monthly migration limit exceeded"

Você só pode migrar 5 vezes por mês. Aguarde até o próximo mês ou contate o suporte.

#### "Invalid machine ID format"

Certifique-se de ter copiado o Machine ID completo corretamente. Ele deve ter pelo menos 10 caracteres.

#### "Migration validation failed"

Verifique se:

- Sua licença atual está ativa e não expirou
- O Machine ID de destino está correto
- Ambos os computadores têm acesso à internet

### Obtendo Suporte

Contate o [Suporte do Telegram](https://t.me/tikmatrix_agent_bot) com:

- Capturas de tela das mensagens de erro
- Seus Machine IDs atual e de destino
- Descrição do problema

## FAQ

**Posso migrar de volta para o meu computador original?**

Sim, mas conta como outra migração para o seu limite mensal.

**O que acontece com minhas conexões de dispositivos?**

As conexões de dispositivos estão vinculadas ao computador. Você precisará reconectar os dispositivos no novo computador.

**Posso migrar uma licença de teste?**

Não, apenas licenças pagas podem ser migradas.

**A migração afeta os dias de licença restantes?**

Não, seus dias restantes permanecem os mesmos após a migração.
