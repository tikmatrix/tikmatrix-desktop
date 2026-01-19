---
sidebar_position: 2
title: API de Gerenciamento de Tarefas
description: Referência completa da API para endpoints de gerenciamento de tarefas
---

Esta página documenta todos os endpoints da API disponíveis para gerenciar tarefas no TikMatrix.

## Criar Tarefa

Cria uma nova tarefa para um ou mais dispositivos ou usuários.

- **Endpoint:** `POST /api/v1/task`
- **Content-Type:** `application/json`

### Parâmetros da Requisição

A API suporta dois modos para criar tarefas:

**Modo 1: Baseado em Dispositivo** - Use `serials` para criar tarefas para dispositivos
**Modo 2: Baseado em Usuário** - Use `usernames` para criar tarefas diretamente para contas específicas

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| serials | string[] | Condicional | Array de números de série dos dispositivos (obrigatório se `usernames` não for fornecido) |
| usernames | string[] | Condicional | Array de nomes de usuário para criar tarefas (obrigatório se `serials` não for fornecido). Quando fornecido, as tarefas são criadas diretamente para essas contas. |
| script_name | string | Sim | Nome do script a ser executado |
| script_config | object | Sim | Parâmetros de configuração para o script (veja documentação específica do script) |
| enable_multi_account | boolean | Não | Habilitar modo de múltiplas contas (padrão: false). Aplicável apenas no modo baseado em dispositivo. |
| start_time | string | Não | Horário de início agendado no formato "HH:MM" |

### Scripts Suportados

| Nome do Script | Descrição | Documentação |
|----------------|-----------|--------------|
| post | Publicar vídeos ou imagens no TikTok/Instagram | [Configuração do Script Post](./post-script.md) |
| follow | Seguir ou deixar de seguir usuários | [Configuração do Script Follow](./follow-script.md) |

### Exemplo

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Check out my new video! #viral #fyp",
      "material_list": ["C:/Videos/video1.mp4"],
      "upload_wait_time": 60
    }
  }'
```

Para parâmetros detalhados de `script_config` e mais exemplos, veja [Configuração do Script Post](./post-script.md) e [Configuração do Script Follow](./follow-script.md).

### Resposta

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [101, 102],
    "created_count": 2
  }
}
```

## Listar Tarefas

Consultar tarefas com filtros opcionais.

- **Endpoint:** `GET /api/v1/task`

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| status | integer | Não | Filtrar por status (0=pendente, 1=em execução, 2=concluída, 3=falhou) |
| serial | string | Não | Filtrar por número de série do dispositivo |
| script_name | string | Não | Filtrar por nome do script |
| source | string | Não | Filtrar por origem ("ui" ou "api") |
| page | integer | Não | Número da página (padrão: 1) |
| page_size | integer | Não | Itens por página (padrão: 20, máximo: 100) |

## Obter Detalhes da Tarefa

Obter informações detalhadas sobre uma tarefa específica.

- **Endpoint:** `GET /api/v1/task/{task_id}`

## Excluir Tarefa

Excluir uma tarefa. Se a tarefa estiver em execução, ela será interrompida primeiro.

- **Endpoint:** `DELETE /api/v1/task/{task_id}`

## Excluir Tarefas em Lote

Excluir várias tarefas de uma vez. Tarefas em execução serão interrompidas primeiro.

- **Endpoint:** `DELETE /api/v1/task/batch`
- **Body:** `{ "task_ids": [1, 2, 3] }`

## Parar Tarefa

Parar uma tarefa em execução.

- **Endpoint:** `POST /api/v1/task/{task_id}/stop`

## Retentar Tarefa Falhada

Retentar uma tarefa que falhou.

- **Endpoint:** `POST /api/v1/task/{task_id}/retry`

## Retentar Todas as Tarefas Falhadas

Retentar todas as tarefas falhadas de uma vez.

- **Endpoint:** `POST /api/v1/task/retry-all`

## Obter Estatísticas de Tarefas

Obter estatísticas sobre todas as tarefas.

- **Endpoint:** `GET /api/v1/task/stats`
- **Resposta:** Retorna contagem total, pendente, em execução, concluída e falha.

## Verificar Licença da API

Verificar se sua licença suporta acesso à API.

- **Endpoint:** `GET /api/v1/license/check`
- **Nota:** Plano Starter retorna código de erro 40301. Planos Pro, Team e Business têm acesso à API.
