---
sidebar_position: 5
title: Configuração do Script de Comentário
description: Referência completa de configuração para o script de comentário
---

Esta página documenta os parâmetros de configuração para o script `comment` usado na criação de tarefas.

## Visão Geral

O script `comment` é usado para postar comentários automaticamente em posts do TikTok ou Instagram. Quando você fornece múltiplas URLs de posts de destino via API, **uma tarefa é criada por URL de post de destino**. Você pode controlar quando cada tarefa é executada usando o parâmetro `start_time`.

## Configuração do Script (`script_config`)

O objeto `script_config` contém os parâmetros para o script de comentário. Abaixo estão os parâmetros disponíveis:

### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-------------|--------|-----------|
| target_post_urls | string[] | Sim* | [] | Array de URLs de posts de destino para comentar (uma tarefa por URL) |
| target_post_url | string | Sim* | "" | URL de post única ou múltiplas URLs separadas por novas linhas/vírgulas |
| comment_content | string | Sim | "" | Conteúdo de texto do comentário. Pode conter múltiplos comentários separados por novas linhas |
| comment_order | string | Não | "random" | Como selecionar comentários: `random` ou `sequential` |
| insert_emoji | boolean | Não | false | Se deve inserir emoji aleatório no comentário |
| comment_image_path | string | Não | "" | Caminho para arquivo de imagem para comentário com imagem (somente TikTok). Suporta caminho absoluto ou caminho relativo a work_dir/upload/ |

:::note
Ou `target_post_urls` array ou `target_post_url` string deve ser fornecido. Se ambos forem fornecidos, `target_post_urls` tem prioridade.
:::

:::tip Comentário com Imagem (Somente TikTok)
O parâmetro `comment_image_path` permite anexar uma imagem ao seu comentário. Este recurso é **suportado apenas no TikTok** - comentários do Instagram não suportam anexos de imagem. A imagem será enviada para o dispositivo e selecionada como a primeira imagem na galeria.
:::

:::info Criação de Tarefa
Quando múltiplas URLs de posts de destino são fornecidas, a API cria **uma tarefa por URL de post de destino**. Por exemplo, se você especificar 3 URLs de posts e 2 dispositivos, 6 tarefas serão criadas. Use o parâmetro `start_time` para controlar quando as tarefas começam a executar.
:::

## Exemplos

### Comentar em Post Único

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Great content! 🔥"
    }
  }'
```

### Comentar com Múltiplas Opções de Comentário

Fornecer múltiplos comentários separados por novas linhas. O sistema selecionará um com base no `comment_order`:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Amazing video!\nLove this content!\nKeep it up! 👏\nThis is so good!",
      "comment_order": "random"
    }
  }'
```

### Comentar em Múltiplos Posts

Ao comentar em múltiplos posts, uma tarefa é criada por post:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_urls": [
        "https://www.tiktok.com/@user1/video/111",
        "https://www.tiktok.com/@user2/video/222",
        "https://www.tiktok.com/@user3/video/333"
      ],
      "comment_content": "Great video!\nAwesome!\nLove it!",
      "comment_order": "sequential"
    }
  }'
```

Isso cria 3 tarefas separadas que executam imediatamente.

### Agendar Comentários com Horário de Início

Use `start_time` para agendar quando as tarefas devem começar:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Scheduled comment!"
    },
    "start_time": "14:30"
  }'
```

### Comentar com Inserção de Emoji

Ativar inserção automática de emoji para tornar os comentários mais envolventes:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "This is amazing",
      "insert_emoji": true
    }
  }'
```

### Comentar por Modo de Lista de Nomes de Usuário

Criar tarefas de comentário diretamente para contas específicas:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@target/video/123",
      "comment_content": "Nice video!"
    }
  }'
```

### Comentário em Lote em Múltiplos Dispositivos

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@viral/video/999",
      "comment_content": "Great content!\nAmazing work!\nLove this!",
      "comment_order": "random"
    },
    "enable_multi_account": true
  }'
```

### Exemplo de Comentário no Instagram

A mesma API funciona para posts do Instagram:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.instagram.com/p/ABC123/",
      "comment_content": "Beautiful photo! 📸",
      "insert_emoji": true
    }
  }'
```

### Exemplo de Comentário com Imagem no TikTok

Anexar uma imagem ao seu comentário do TikTok (não suportado no Instagram):

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Check out this image!",
      "comment_image_path": "C:/images/my_image.jpg"
    }
  }'
```

:::info Caminho da Imagem
O `comment_image_path` pode ser:

- **Caminho absoluto**: `C:/images/my_image.jpg` ou `/home/user/images/my_image.jpg`
- **Caminho relativo**: `my_image.jpg` (relativo a `work_dir/upload/`)

:::

## Resposta

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [301, 302, 303],
    "created_count": 3
  }
}
```

## Ordem dos Comentários

### Ordem Aleatória (`random`)

- Seleciona aleatoriamente um comentário da lista fornecida
- Bom para fazer comentários parecerem mais naturais
- Comportamento padrão

### Ordem Sequencial (`sequential`)

- Seleciona comentários em ordem com base no `job_count`
- Primeira tarefa usa primeiro comentário, segunda tarefa usa segundo comentário, etc.
- Retorna ao início quando chega ao fim da lista
- Bom para distribuir diferentes comentários entre múltiplas tarefas

## Formatos de URL de Post

### TikTok

```text
https://www.tiktok.com/@username/video/1234567890123456
https://vm.tiktok.com/ABCDEFG/
```

### Instagram

```text
https://www.instagram.com/p/ABCDEFGHIJK/
https://www.instagram.com/reel/ABCDEFGHIJK/
```

## Melhores Práticas

1. **Varie seus comentários**: Forneça múltiplas opções de comentários para evitar parecer spam.

2. **Use ordem sequencial para variedade**: Ao comentar em múltiplos posts com o mesmo dispositivo, use ordem `sequential` para distribuir diferentes comentários.

3. **Ative inserção de emoji**: Defina `insert_emoji: true` para fazer os comentários parecerem mais naturais e envolventes.

4. **Agende tarefas**: Use o parâmetro `start_time` para distribuir comentários ao longo do tempo, reduzindo a chance de limitação de taxa.

5. **Respeite os limites da plataforma**: Não crie muitas tarefas de comentário de uma vez. A maioria das plataformas tem limites de taxa para comentários.

## Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 40001 | URL de post de destino ou conteúdo de comentário ausente |
| 40003 | Script não suportado via API |
| 40301 | Acesso à API requer plano Pro+ |

## Veja Também

- [API de Gerenciamento de Tarefas](./task-management.md) - Criar, listar e gerenciar tarefas
- [Configuração do Script de Post](./post-script.md) - Configurar parâmetros do script de post
- [Configuração do Script de Follow](./follow-script.md) - Configurar parâmetros do script de follow
- [Visão Geral da API Local](./local-api.md) - Visão geral da API e início rápido
