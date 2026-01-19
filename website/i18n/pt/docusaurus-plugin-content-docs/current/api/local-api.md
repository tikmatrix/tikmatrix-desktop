---
sidebar_position: 1
title: Visão Geral da API Local
description: API Local do TikMatrix para gerenciamento programático de tarefas
---

O TikMatrix fornece uma API RESTful local que permite gerenciar tarefas programaticamente. Isso é útil para integrar o TikMatrix com seus próprios sistemas de automação, construir fluxos de trabalho personalizados ou criar operações em lote.

## Requisitos

:::warning Requisito de Licença
**A API Local está disponível apenas para assinantes dos planos Pro, Team e Business.** O plano Starter não tem acesso à API.
:::

## URL Base

A API é executada na sua máquina local em:

```text
http://localhost:50809/api/v1/
```

:::note
A porta `50809` é a porta padrão. Certifique-se de que o TikMatrix esteja em execução antes de fazer requisições à API.
:::

## Formato de Resposta

Todas as respostas da API seguem este formato:

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### Códigos de Resposta

| Código | Descrição |
|--------|-----------|
| 0 | Sucesso |
| 40001 | Requisição Inválida - Parâmetros inválidos |
| 40002 | Requisição Inválida - script_name ausente |
| 40003 | Requisição Inválida - Script não suportado via API |
| 40301 | Proibido - Acesso à API requer plano Pro+ |
| 40401 | Não Encontrado - Recurso não encontrado |
| 50001 | Erro Interno do Servidor |

## Início Rápido

### 1. Verificar Acesso à API

Primeiro, verifique se sua licença suporta acesso à API:

```bash
curl http://localhost:50809/api/v1/license/check
```

Resposta:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "plan_name": "Pro",
    "api_enabled": true,
    "device_limit": 20,
    "message": "API access enabled"
  }
}
```

### 2. Criar uma Tarefa

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "captions": "Check out my new video! #viral"
    },
    "enable_multi_account": false,
    "start_time": "14:30"
  }'
```

### 3. Listar Tarefas

```bash
curl http://localhost:50809/api/v1/task?status=0&page=1&page_size=20
```

## Scripts Disponíveis

O parâmetro `script_name` aceita os seguintes valores:

| Nome do Script | Descrição | Suporte API |
|----------------|-----------|-------------|
| `post` | Publicar conteúdo | ✅ Suportado |
| `follow` | Seguir usuários | ✅ Suportado |
| `unfollow` | Deixar de seguir usuários | ✅ Suportado |
| `account_warmup` | Aquecer contas | ✅ Suportado |
| `comment` | Comentar em posts | ✅ Suportado |
| `like` | Curtir posts | 🔜 Em Breve |
| `message` | Enviar mensagens diretas | 🔜 Em Breve |
| `super_marketing` | Campanha de super marketing | 🔜 Em Breve |
| `profile` | Atualizar perfil | 🔜 Em Breve |
| `scrape_user` | Extrair dados de usuário | 🔜 Em Breve |

## Status da Tarefa

| Código de Status | Texto de Status | Descrição |
|------------------|-----------------|-----------|
| 0 | pending | Tarefa aguardando execução |
| 1 | running | Tarefa em execução no momento |
| 2 | completed | Tarefa concluída com sucesso |
| 3 | failed | Tarefa falhou |

## Próximos Passos

- [API de Gerenciamento de Tarefas](./task-management) - Criar, consultar e gerenciar tarefas
- [Configuração do Script de Post](./post-script) - Configurar parâmetros do script de post
- [Configuração do Script de Follow](./follow-script) - Configurar parâmetros do script de follow
- [Configuração do Script de Unfollow](./unfollow-script) - Configurar parâmetros do script de unfollow
- [Configuração do Script de Aquecimento de Conta](./account-warmup-script) - Configurar parâmetros do script de aquecimento de conta
- [Configuração do Script de Comentário](./comment-script) - Configurar parâmetros do script de comentário
- [Exemplos de API](./examples) - Exemplos de código em diferentes linguagens
