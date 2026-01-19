---
sidebar_position: 3
title: Configuração do Script Post
description: Referência completa de configuração para o script post
---

Esta página documenta os parâmetros de configuração para o script `post` usado na criação de tarefas.

## Visão Geral

O script `post` é usado para publicar automaticamente conteúdo (vídeos ou imagens) no TikTok ou Instagram. Ele suporta vários métodos de publicação, fontes de material e opções de som.

## Configuração do Script (`script_config`)

O objeto `script_config` contém os parâmetros para o script post. Abaixo estão os parâmetros disponíveis:

### Parâmetros Comuns (TikTok & Instagram)

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-------------|---------|-----------|
| content_type | integer | Não | 0 | Tipo de conteúdo: `0` = Vídeo, `1` = Imagens |
| image_count | integer | Não | 1 | Número de imagens a selecionar (quando content_type = 1) |
| captions | string | Não | "" | Texto da legenda para a postagem. Suporta formato spintax: `{opção1\|opção2\|opção3}` |
| post_way | string | Não | "share" | Método de postagem: `share`, `addButton` ou `useSound` |
| material_source | string | Não | "materialLibrary" | Fonte do material: `materialLibrary` ou `localFolder` (ignorado se material_list for fornecido) |
| material_path | string | Condicional | "" | Caminho da pasta local (obrigatório quando material_source = "localFolder") |
| material_list | string[] | Não | [] | **Array de caminhos diretos de arquivos de material.** Quando fornecido, ignora a lógica de material_source e material_path. Ideal para automação via API. |
| materials_tags | string | Não | "" | Tags de material separadas por vírgula para filtrar da biblioteca |
| upload_wait_time | integer | Não | 30 | Segundos para aguardar a conclusão do upload |
| sound_wait_time | integer | Não | 10 | Segundos para aguardar o carregamento do som |
| add_sound | string/integer | Não | "-1" | Opção de som: `-1` = padrão, `0` = desabilitar, `1` = habilitar, `custom` = usar som personalizado |
| sound_name | string | Condicional | "" | Nome/URL do som (obrigatório quando post_way = "useSound") |
| custom_sound_keyword | string | Condicional | "" | Palavra-chave para buscar som personalizado (obrigatório quando add_sound = "custom") |
| origin_sound_volume | integer | Não | 50 | Volume do som original (0-100) |
| add_sound_volume | integer | Não | 50 | Volume do som adicionado (0-100) |

### Parâmetros Específicos do TikTok

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-------------|---------|-----------|
| add_product_link | integer | Não | 0 | Adicionar link de produto: `0` = Não, `1` = Sim |

### Parâmetros Específicos do Instagram

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-------------|---------|-----------|
| placement | string | Não | "reel" | Posicionamento da postagem: `reel` ou `story` |

## Exemplos

### Tarefa Básica de Postagem com Lista Direta de Material

Esta é a abordagem recomendada para automação via API - passe os caminhos do material diretamente sem depender da biblioteca de materiais ou varredura de pastas:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Check out my new video! #viral #fyp",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Tarefa de Postagem com Biblioteca de Materiais (TikTok)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Check out my new video! #viral #fyp",
      "post_way": "share",
      "material_source": "materialLibrary",
      "materials_tags": "trending, dance",
      "upload_wait_time": 60,
      "add_sound": "-1"
    },
    "enable_multi_account": false
  }'
```

### Tarefa de Postagem por Lista de Usuários

Este modo permite criar tarefas diretamente para contas específicas sem precisar saber seus números de série do dispositivo:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@user1", "@user2", "@user3"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Check out my new video! #viral #fyp",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Tarefa de Postagem com Pasta Local (Instagram)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Amazing content! #instagram #reels",
      "post_way": "addButton",
      "placement": "reel",
      "material_source": "localFolder",
      "material_path": "C:/Videos/instagram",
      "upload_wait_time": 45
    },
    "enable_multi_account": true
  }'
```

### Postagem com Som Personalizado

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Dancing to this trending sound!",
      "post_way": "share",
      "add_sound": "custom",
      "custom_sound_keyword": "trending dance 2024",
      "origin_sound_volume": 30,
      "add_sound_volume": 70,
      "material_source": "materialLibrary",
      "upload_wait_time": 60
    }
  }'
```

### Postagem Usando URL de Som Específico

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "post_way": "useSound",
      "sound_name": "https://www.tiktok.com/music/original-sound-7123456789",
      "captions": "Using this awesome sound!",
      "material_source": "materialLibrary"
    }
  }'
```

### Postagem de Imagens (Carrossel)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "image_count": 5,
      "captions": "Check out these photos! #photocarousel",
      "material_source": "localFolder",
      "material_path": "C:/Images/carousel",
      "upload_wait_time": 45
    }
  }'
```

## Resposta

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

## Veja Também

- [API de Gerenciamento de Tarefas](./task-management.md) - Criar, listar e gerenciar tarefas
