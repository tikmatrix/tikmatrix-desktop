---
sidebar_position: 6
title: Configuración del Script Account Warmup
description: Referencia completa de configuración para el script Account Warmup
---

Esta página documenta los parámetros de configuración para el script `account_warmup` usado en la creación de tareas.

## Visión General

El script `account_warmup` se utiliza para calentar cuentas de TikTok o Instagram simulando comportamiento natural de usuario. Observa videos y realiza aleatoriamente me gusta, seguimientos, favoritos y comentarios según las probabilidades configuradas. Esto ayuda a las nuevas cuentas a construir un historial de interacción y evitar ser detectadas como bots.

## Configuración del Script (`script_config`)

El objeto `script_config` contiene los parámetros para el script de calentamiento de cuenta. Los siguientes son los parámetros disponibles:

### Parámetros

| Parámetro | Tipo | Requerido | Por Defecto | Descripción |
|-----|------|------|-------|------|
| task_duration | number | No | 600 | Duración total de la tarea de calentamiento (segundos) |
| topic | string | No | "" | Palabras clave de tema de búsqueda (una por línea, selección aleatoria) |
| min_duration | number | No | 15 | Duración mínima de visualización de video (segundos) |
| max_duration | number | No | 30 | Duración máxima de visualización de video (segundos) |
| like_probable | number | No | 0 | Probabilidad de dar me gusta a videos (0-100) |
| floow_probable | number | No | 0 | Probabilidad de seguir a creadores de video (0-100) |
| collect_probable | number | No | 0 | Probabilidad de guardar/marcar videos (0-100) |
| comment_probable | number | No | 0 | Probabilidad de comentar videos (0-100) |
| comment | string | No | "" | Plantillas de comentario (una por línea, selección aleatoria) |
| insert_emoji | boolean | No | false | Insertar emojis aleatorios en comentarios |
| comment_order | string | No | "random" | Orden de selección de comentarios: `random` (aleatorio) o `sequential` (secuencial) |
| generate_by_chatgpt | boolean | No | false | Usar ChatGPT para generar comentarios |
| chatgpt_settings | object | No | {} | Configuración de ChatGPT (ver abajo) |

### Estructura de Configuración de ChatGPT

Cuando `generate_by_chatgpt` está establecido en `true`, puedes configurar la generación de comentarios de ChatGPT usando el objeto `chatgpt_settings`:

| Parámetro | Tipo | Requerido | Descripción |
|-----|------|------|------|
| api_key | string | Sí | Tu API key de OpenAI |
| model | string | No | Modelo a usar (por defecto: "gpt-3.5-turbo"). Opciones: "gpt-3.5-turbo", "gpt-4", "gpt-4-turbo" |
| prompt | string | No | Prompt personalizado para generar comentarios. Por defecto genera comentarios amigables y relevantes |
| max_tokens | number | No | Máximo de tokens para respuesta (por defecto: 100) |
| temperature | number | No | Nivel de creatividad 0-2 (por defecto: 0.7). Valor más alto = más creativo |
| base_url | string | No | URL personalizada de endpoint API (para Azure OpenAI o API compatible) |

Ejemplo de objeto `chatgpt_settings`:

```json
{
  "api_key": "sk-your-openai-api-key",
  "model": "gpt-3.5-turbo",
  "prompt": "Genera un comentario breve y amigable en español para este video",
  "max_tokens": 50,
  "temperature": 0.8,
  "base_url": "https://api.openai.com/v1"
}
```

:::tip Recomendación
Para nuevas cuentas, se recomienda comenzar con probabilidades de interacción bajas (5-15%) y aumentarlas gradualmente con el tiempo. Esto simula el comportamiento natural del usuario.
:::

## Ejemplos

### Calentamiento Básico de Cuenta

Calentamiento simple solo con visualización de videos:

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

### Calentamiento con Búsqueda de Temas

Calentar cuenta buscando temas específicos:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 900,
      "topic": "gatos graciosos\nvideos de perros\nmascotas adorables",
      "min_duration": 15,
      "max_duration": 45
    }
  }'
```

### Calentamiento con Interacciones

Calentamiento completo incluyendo me gusta, seguimientos y comentarios:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "comida\nrecetas\ncocina",
      "min_duration": 20,
      "max_duration": 60,
      "like_probable": 30,
      "floow_probable": 10,
      "collect_probable": 5,
      "comment_probable": 15,
      "comment": "¡Increíble! 🔥\n¡Me encanta este contenido!\n¡Muy bueno! 👏\nWow, ¡qué genial!",
      "insert_emoji": true,
      "comment_order": "random"
    }
  }'
```

### Calentamiento con Comentarios de ChatGPT

Usa ChatGPT para generar comentarios inteligentes:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1800,
      "topic": "tecnología\nreseñas de gadgets",
      "min_duration": 30,
      "max_duration": 90,
      "like_probable": 25,
      "comment_probable": 20,
      "generate_by_chatgpt": true,
      "chatgpt_settings": {
        "api_key": "your-api-key",
        "model": "gpt-3.5-turbo",
        "prompt": "Genera un comentario breve y amigable para este video"
      }
    }
  }'
```

### Calentamiento por Lotes en Múltiples Dispositivos

Ejecutar calentamiento simultáneamente en múltiples dispositivos:

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

### Tarea de Calentamiento Programada

Programar calentamiento para ejecutarse a una hora específica:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "música\nbaile\ntendencias",
      "min_duration": 20,
      "max_duration": 40,
      "like_probable": 15,
      "floow_probable": 5
    },
    "start_time": "09:00"
  }'
```

### Calentamiento por Lista de Nombres de Usuario

Crear tareas de calentamiento para cuentas específicas:

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

## Respuesta

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

## Mejores Prácticas

1. **Comenzar con Probabilidades Bajas**: Para nuevas cuentas, usa probabilidades de interacción bajas (5-15%) y luego aumenta gradualmente en días/semanas.

2. **Usar Temas Relevantes**: Elige temas relacionados con el nicho de tu cuenta para construir un historial de interacción relevante.

3. **Variar Duración de Visualización**: Establece un rango entre min_duration y max_duration para simular patrones de visualización naturales.

4. **Duración de Tarea Moderada**: Ejecuta sesiones de calentamiento de 10-30 minutos, 2-3 veces al día, en lugar de sesiones continuas largas.

5. **Usar Comentarios Diversos**: Proporciona múltiples plantillas de comentario para evitar patrones repetitivos que puedan activar detección de spam.

6. **Programar Inteligentemente**: Usa `start_time` para ejecutar tareas de calentamiento durante horas activas en la zona horaria de tu audiencia objetivo.

## Ver También

- [API de Gestión de Tareas](./task-management.md) - Crear, listar y gestionar tareas
- [Configuración del Script Post](./post-script.md) - Configurar parámetros del script de publicación
- [Configuración del Script Follow](./follow-script.md) - Configurar parámetros del script de seguir
- [Configuración del Script Unfollow](./unfollow-script.md) - Configurar parámetros del script de dejar de seguir
