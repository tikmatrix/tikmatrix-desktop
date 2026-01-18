---
sidebar_position: 2
title: API de Gestión de Tareas
description: Referencia completa de endpoints de gestión de tareas
---

Esta página documenta todos los endpoints de API disponibles para gestionar tareas de TikMatrix.

## Crear Tarea

Crea una nueva tarea para uno o más dispositivos o nombres de usuario.

- **Endpoint:** `POST /api/v1/task`
- **Content-Type:** `application/json`

### Parámetros de Request

La API soporta dos modos para crear tareas:

**Modo 1: Modo Dispositivo** - Usa `serials` para crear tareas para dispositivos
**Modo 2: Modo Nombre de Usuario** - Usa `usernames` para crear tareas directamente para cuentas específicas

| Parámetro | Tipo | Requerido | Descripción |
|------|------|------|------|
| serials | string[] | Condicional | Array de números de serie de dispositivos (requerido si no se proporciona `usernames`) |
| usernames | string[] | Condicional | Array de nombres de usuario (requerido si no se proporciona `serials`). Cuando se proporciona, crea tareas directamente para estas cuentas. |
| script_name | string | Sí | Nombre del script a ejecutar |
| script_config | object | Sí | Parámetros de configuración del script (ver documentación del script correspondiente) |
| enable_multi_account | boolean | No | Habilitar modo multi-cuenta (por defecto: false). Solo efectivo en modo dispositivo. |
| start_time | string | No | Hora de ejecución programada, formato "HH:MM" |

### Scripts Soportados

| Nombre del Script | Descripción | Documentación |
|----------|------|------|
| post | Publicar video o imagen en TikTok/Instagram | [Configuración del Script Post](./post-script.md) |

### Ejemplo

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "¡Mira mi nuevo video! #viral #trending",
      "material_list": ["C:/Videos/video1.mp4"],
      "upload_wait_time": 60
    }
  }'
```

Para parámetros detallados de `script_config` y más ejemplos, consulta [Configuración del Script Post](./post-script.md).

### Respuesta

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

## Listar Tareas

Consulta tareas con condiciones de filtro opcionales.

- **Endpoint:** `GET /api/v1/task`

| Parámetro | Tipo | Requerido | Descripción |
|------|------|------|------|
| status | integer | No | Filtrar por estado (0=pending, 1=running, 2=completed, 3=failed) |
| serial | string | No | Filtrar por número de serie del dispositivo |
| script_name | string | No | Filtrar por nombre del script |
| source | string | No | Filtrar por origen ("ui" o "api") |
| page | integer | No | Número de página (por defecto: 1) |
| page_size | integer | No | Entradas por página (por defecto: 20, máximo: 100) |

## Obtener Detalles de Tarea

Obtiene información detallada de una tarea específica.

- **Endpoint:** `GET /api/v1/task/{task_id}`

## Eliminar Tarea

Elimina una tarea. Si la tarea está en ejecución, intentará detenerla primero.

- **Endpoint:** `DELETE /api/v1/task/{task_id}`

## Eliminar Tareas por Lotes

Elimina múltiples tareas a la vez, las tareas en ejecución se detendrán primero.

- **Endpoint:** `DELETE /api/v1/task/batch`
- **Request Body:** `{ "task_ids": [1, 2, 3] }`

## Detener Tarea

Detiene una tarea en ejecución.

- **Endpoint:** `POST /api/v1/task/{task_id}/stop`

## Reintentar Tarea Fallida

Reintenta una tarea fallida individual.

- **Endpoint:** `POST /api/v1/task/{task_id}/retry`

## Reintentar Todas las Tareas Fallidas

Reintenta todas las tareas fallidas de una vez.

- **Endpoint:** `POST /api/v1/task/retry-all`

## Obtener Estadísticas de Tareas

Obtiene datos estadísticos generales de tareas.

- **Endpoint:** `GET /api/v1/task/stats`
- **Respuesta:** Devuelve conteos de total, pending, running, completed, failed.

## Verificar Licencia API

Verifica si tu licencia soporta acceso a la API.

- **Endpoint:** `GET /api/v1/license/check`
- **Nota:** El plan Starter devolverá código de error 40301; los planes Pro/Team/Business pueden acceder a la API.
