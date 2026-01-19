---
sidebar_position: 6
title: Configuração do Script de Aquecimento de Conta
description: Referência completa de configuração para o script de aquecimento de conta
---

Esta página documenta os parâmetros de configuração para o script `account_warmup` usado na criação de tarefas.

## Visão Geral

O script `account_warmup` é usado para aquecer contas do TikTok ou Instagram simulando comportamento natural de usuário. Ele assiste vídeos, curte aleatoriamente, segue, coleciona e comenta com base em probabilidades configuradas. Isso ajuda novas contas a construir histórico de engajamento e evitar detecção de bot.

## Configuração do Script (`script_config`)

O objeto `script_config` contém os parâmetros para o script de aquecimento de conta. Abaixo estão os parâmetros disponíveis:

### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-------------|--------|-----------|
| task_duration | number | Não | 600 | Duração total da tarefa de aquecimento em segundos |
| topic | string | Não | "" | Palavras-chave de tópico de pesquisa (uma por linha, selecionada aleatoriamente) |
| min_duration | number | Não | 15 | Duração mínima de visualização de vídeo em segundos |
| max_duration | number | Não | 30 | Duração máxima de visualização de vídeo em segundos |
| like_probable | number | Não | 0 | Probabilidade (0-100) de curtir um vídeo |
| floow_probable | number | Não | 0 | Probabilidade (0-100) de seguir o criador do vídeo |
| collect_probable | number | Não | 0 | Probabilidade (0-100) de coletar/salvar um vídeo |
| comment_probable | number | Não | 0 | Probabilidade (0-100) de comentar em um vídeo |
| comment | string | Não | "" | Modelos de comentário (um por linha, selecionado aleatoriamente) |
| insert_emoji | boolean | Não | false | Se deve inserir emoji aleatório nos comentários |
| comment_order | string | Não | "random" | Ordem de seleção de comentários: `random` ou `sequential` |
| generate_by_chatgpt | boolean | Não | false | Se deve gerar comentários usando ChatGPT |
| chatgpt_settings | object | Não | {} | Configurações do ChatGPT (veja abaixo) |

### Estrutura das Configurações do ChatGPT

Quando `generate_by_chatgpt` está definido como `true`, você pode configurar a geração de comentários do ChatGPT com o objeto `chatgpt_settings`:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| api_key | string | Sim | Sua chave de API OpenAI |
| model | string | Não | O modelo a ser usado (padrão: "gpt-3.5-turbo"). Opções: "gpt-3.5-turbo", "gpt-4", "gpt-4-turbo" |
| prompt | string | Não | Prompt personalizado para gerar comentários. O padrão gera comentários amigáveis e relevantes |
| max_tokens | number | Não | Tokens máximos para a resposta (padrão: 100) |
| temperature | number | Não | Nível de criatividade 0-2 (padrão: 0.7). Valores maiores = mais criativo |
| base_url | string | Não | URL personalizada do endpoint da API (para Azure OpenAI ou APIs compatíveis) |

Exemplo de objeto `chatgpt_settings`:

```json
{
  "api_key": "sk-your-openai-api-key",
  "model": "gpt-3.5-turbo",
  "prompt": "Generate a short, friendly comment about this video in English",
  "max_tokens": 50,
  "temperature": 0.8,
  "base_url": "https://api.openai.com/v1"
}
```

:::tip Recomendação
Para novas contas, comece com probabilidades de interação baixas (5-15%) e aumente-as gradualmente ao longo do tempo. Isso imita o comportamento natural do usuário.
:::

## Exemplos

### Aquecimento Básico de Conta

Aquecimento simples apenas assistindo vídeos:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 10,
      "max_duration": 30
    }
  }'
```

### Aquecimento com Busca por Tópico

Aquecer conta pesquisando tópicos específicos:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 900,
      "topic": "funny cats\ndog videos\npet compilation",
      "min_duration": 15,
      "max_duration": 45
    }
  }'
```

### Aquecimento com Interações

Aquecimento completo com curtidas, seguidas e comentários:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "cooking\nrecipes\nfood",
      "min_duration": 20,
      "max_duration": 60,
      "like_probable": 30,
      "floow_probable": 10,
      "collect_probable": 5,
      "comment_probable": 15,
      "comment": "This is amazing! 🔥\nLove this content!\nSo good! 👏\nWow, incredible!",
      "insert_emoji": true,
      "comment_order": "random"
    }
  }'
```

### Aquecimento com Comentários do ChatGPT

Gerar comentários inteligentes usando ChatGPT:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1800,
      "topic": "tech reviews\ngadgets",
      "min_duration": 30,
      "max_duration": 90,
      "like_probable": 25,
      "comment_probable": 20,
      "generate_by_chatgpt": true,
      "chatgpt_settings": {
        "api_key": "your-api-key",
        "model": "gpt-3.5-turbo",
        "prompt": "Generate a short, friendly comment about this video"
      }
    }
  }'
```

### Aquecimento em Lote em Múltiplos Dispositivos

Executar aquecimento em múltiplos dispositivos simultaneamente:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 15,
      "max_duration": 30,
      "like_probable": 20
    },
    "enable_multi_account": true
  }'
```

### Agendar Tarefa de Aquecimento

Agendar aquecimento para executar em horário específico:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "music\ndance\ntrending",
      "min_duration": 20,
      "max_duration": 40,
      "like_probable": 15,
      "floow_probable": 5
    },
    "start_time": "09:00"
  }'
```

### Aquecimento por Lista de Nomes de Usuário

Criar tarefas de aquecimento para contas específicas:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 15,
      "max_duration": 30,
      "like_probable": 20,
      "floow_probable": 5
    }
  }'
```

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

## Melhores Práticas

1. **Comece com probabilidades baixas**: Para novas contas, use probabilidades de interação baixas (5-15%) e aumente gradualmente ao longo de dias/semanas.

2. **Use tópicos relevantes**: Escolha tópicos que se alinhem com o nicho da sua conta para construir um histórico de engajamento relevante.

3. **Varie a duração de visualização**: Defina um intervalo entre min_duration e max_duration para simular padrões de visualização naturais.

4. **Duração moderada da tarefa**: Execute sessões de aquecimento de 10-30 minutos, 2-3 vezes por dia, em vez de sessões longas contínuas.

5. **Use comentários diversos**: Forneça múltiplos modelos de comentários para evitar padrões repetitivos que podem acionar detecção de spam.

6. **Agende sabiamente**: Use `start_time` para executar tarefas de aquecimento durante horas ativas no fuso horário do seu público-alvo.

## Veja Também

- [API de Gerenciamento de Tarefas](./task-management.md) - Criar, listar e gerenciar tarefas
- [Configuração do Script de Post](./post-script.md) - Configurar parâmetros do script de post
- [Configuração do Script de Follow](./follow-script.md) - Configurar parâmetros do script de follow
- [Configuração do Script de Unfollow](./unfollow-script.md) - Configurar parâmetros do script de unfollow
