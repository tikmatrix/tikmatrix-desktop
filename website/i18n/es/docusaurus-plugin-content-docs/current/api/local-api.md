---
sidebar_position: 1
title: Visión General de la API Local
description: API local de TikMatrix para gestión programática de tareas
---

TikMatrix proporciona una API RESTful local que te permite gestionar tareas de forma programática. Esto es útil para integrar TikMatrix en tus propios sistemas de automatización, construir flujos de trabajo personalizados o crear operaciones por lotes.

## Requisitos

:::warning Requisito de Licencia
**La API local está disponible solo para usuarios de los planes Pro, Team y Business.** El plan Starter no proporciona acceso a la API.
:::

## URL Base

La API se ejecuta localmente en:

```text
http://localhost:50809/api/v1/
```

:::note
El puerto `50809` es el puerto predeterminado. Asegúrate de que TikMatrix esté en ejecución antes de realizar solicitudes.
:::

## Formato de Respuesta

Todas las respuestas de la API siguen este formato:

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### Códigos de Respuesta

| Code | Descripción |
|------|------|
| 0 | Éxito |
| 40001 | Error de parámetro - Parámetros de solicitud inválidos |
| 40002 | Error de parámetro - Falta script_name |
| 40003 | Error de parámetro - El script no soporta llamadas API actualmente |
| 40301 | Prohibido - El acceso a la API requiere plan Pro+ |
| 40401 | No encontrado - El recurso no existe |
| 50001 | Error interno del servidor |

## Inicio Rápido

### 1. Verificar Acceso a la API

Primero, confirma si tu licencia soporta API:

```bash
curl http://localhost:50809/api/v1/license/check
```

Respuesta de ejemplo:

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

### 2. Crear una Tarea

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "captions": "¡Mira mi nuevo video! #viral"
    },
    "enable_multi_account": false
  }'
```

### 3. Listar Tareas

```bash
curl http://localhost:50809/api/v1/task?status=0&page=1&page_size=20
```

## Scripts Disponibles

:::info Soporte Actual
Actualmente, la API local soporta los scripts `post`, `follow`, `unfollow`, `account_warmup` y `comment`. Más scripts se añadirán en futuras versiones.
:::

El parámetro `script_name` acepta los siguientes valores:

| Nombre del Script | Descripción | Soporte API |
|--------|------|----------|
| `post` | Publicar contenido | ✅ Soportado |
| `follow` | Seguir usuarios | ✅ Soportado |
| `unfollow` | Dejar de seguir | ✅ Soportado |
| `account_warmup` | Calentamiento de cuenta | ✅ Soportado |
| `comment` | Comentar | ✅ Soportado |
| `like` | Me gusta | 🔜 Próximamente |
| `message` | Mensaje directo | 🔜 Próximamente |
| `super_marketing` | Campaña de super marketing | 🔜 Próximamente |
| `profile` | Actualizar perfil | 🔜 Próximamente |
| `scrape_user` | Extraer datos de usuario | 🔜 Próximamente |

## Estados de Tarea

| Código de Estado | Texto de Estado | Descripción |
|--------|----------|------|
| 0 | pending | Tarea esperando ejecución |
| 1 | running | Tarea en ejecución |
| 2 | completed | Tarea completada exitosamente |
| 3 | failed | Tarea fallida |

## Siguiente Paso

- [API de Gestión de Tareas](./task-management) - Crear, consultar y gestionar tareas
- [Configuración del Script Post](./post-script) - Configurar parámetros del script de publicación
- [Configuración del Script Follow](./follow-script) - Configurar parámetros del script de seguir
- [Configuración del Script Unfollow](./unfollow-script) - Configurar parámetros del script de dejar de seguir
- [Configuración del Script Account Warmup](./account-warmup-script) - Configurar parámetros del script de calentamiento
- [Configuración del Script Comment](./comment-script) - Configurar parámetros del script de comentario
- [Ejemplos de API](./examples) - Ejemplos de código en diferentes lenguajes
