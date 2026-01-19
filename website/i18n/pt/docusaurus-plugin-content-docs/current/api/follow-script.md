---
sidebar_position: 4
title: Configuração do Script de Follow
description: Referência completa de configuração para o script de follow
---

Esta página documenta os parâmetros de configuração para o script `follow` usado na criação de tarefas.

## Visão Geral

O script `follow` é usado para seguir usuários automaticamente no TikTok ou Instagram. Quando você fornece múltiplos usuários de destino via API, **uma tarefa é criada por usuário de destino**. Você pode controlar quando cada tarefa é executada usando o parâmetro `start_time`.

## Configuração do Script (`script_config`)

O objeto `script_config` contém os parâmetros para o script de follow. Abaixo estão os parâmetros disponíveis:

### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-------------|--------|-----------|
| target_users | string[] | Sim* | [] | Array de nomes de usuário de destino para seguir (uma tarefa por usuário) |
| target_user | string | Sim* | "" | Nome de usuário único ou múltiplos nomes de usuário separados por novas linhas/vírgulas |
| access_method | string | Não | "direct" | Como navegar até o perfil do usuário: `direct` (via URL) ou `search` |

:::note
Ou `target_users` array ou `target_user` string deve ser fornecido. Se ambos forem fornecidos, `target_users` tem prioridade.
:::

:::info Criação de Tarefa
Quando múltiplos usuários de destino são fornecidos, a API cria **uma tarefa por usuário de destino**. Por exemplo, se você especificar 3 usuários de destino e 2 dispositivos, 6 tarefas serão criadas. Use o parâmetro `start_time` para controlar quando as tarefas começam a executar.
:::

## Exemplos

### Seguir Usuário Único

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@username_to_follow"],
      "access_method": "direct"
    }
  }'
```

### Seguir Múltiplos Usuários

Ao seguir múltiplos usuários, uma tarefa é criada por usuário:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@user1", "@user2", "@user3"],
      "access_method": "direct"
    }
  }'
```

Isso cria 3 tarefas separadas que executam imediatamente.

### Agendar Tarefas com Horário de Início

Use `start_time` para agendar quando as tarefas devem começar:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@user1", "@user2"],
      "access_method": "direct"
    },
    "start_time": "14:30"
  }'
```

### Seguir Usuários via Método de Busca

Use o método de busca quando o acesso direto por URL não estiver funcionando:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["username1", "username2"],
      "access_method": "search"
    }
  }'
```

### Seguir Usuários por Modo de Lista de Nomes de Usuário

Criar tarefas de follow diretamente para contas específicas:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@target_user"],
      "access_method": "direct"
    }
  }'
```

### Follow em Lote em Múltiplos Dispositivos

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@influencer_account"],
      "access_method": "direct"
    },
    "enable_multi_account": true
  }'
```

## Resposta

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [201, 202, 203],
    "created_count": 3
  }
}
```

## Métodos de Acesso

### Método Direto (`direct`)

- Abre o perfil do usuário via URL: `tiktok.com/@username` ou `instagram.com/username`
- Mais rápido e confiável
- Recomendado para a maioria dos casos de uso

### Método de Busca (`search`)

- Navega para a busca, digita o nome de usuário, clica no resultado
- Mais lento, mas funciona quando o acesso direto por URL está bloqueado
- Pode ser menos preciso se múltiplos nomes de usuário similares existirem

## Melhores Práticas

1. **Use start_time para agendamento**: Use o parâmetro `start_time` para agendar quando as tarefas devem executar (formato: "HH:MM").

2. **Prefira acesso direto**: O método de acesso `direct` é mais rápido e confiável do que `search`.

3. **Faça lotes com sabedoria**: Não siga muitos usuários de uma vez. O sistema cria uma tarefa por usuário de destino, então listas grandes resultam em muitas tarefas.

## Veja Também

- [API de Gerenciamento de Tarefas](./task-management.md) - Criar, listar e gerenciar tarefas
- [Configuração do Script de Post](./post-script.md) - Configurar parâmetros do script de post
- [Configuração do Script de Unfollow](./unfollow-script.md) - Configurar parâmetros do script de unfollow
