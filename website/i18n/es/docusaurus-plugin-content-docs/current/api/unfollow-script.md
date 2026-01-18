---
sidebar_position: 5
title: Configuración del Script Unfollow
description: Referencia completa de configuración para el script Unfollow
---

Esta página presenta los parámetros de configuración para el script `unfollow` en la creación de tareas.

## Visión General

El script `unfollow` se utiliza para dejar de seguir automáticamente usuarios en TikTok o Instagram. Cuando proporcionas múltiples usuarios objetivo a través de la API, **el sistema creará una tarea por cada usuario objetivo**. Puedes usar el parámetro `start_time` para controlar el tiempo de ejecución de las tareas.

## Configuración del Script (`script_config`)

El objeto `script_config` contiene los parámetros de configuración para el script de dejar de seguir. Los siguientes son los parámetros disponibles:

### Parámetros

| Parámetro | Tipo | Requerido | Por Defecto | Descripción |
|------|------|------|--------|------|
| target_users | string[] | Sí* | [] | Array de nombres de usuario objetivo para dejar de seguir (una tarea por usuario) |
| target_user | string | Sí* | "" | Nombre de usuario único, o múltiples nombres separados por salto de línea/coma |
| access_method | string | No | "direct" | Método para navegar al perfil de usuario: `direct` (por URL) o `search` |

:::note
Debe proporcionarse el array `target_users` o la cadena `target_user`. Si se proporcionan ambos, `target_users` tiene prioridad.
:::

:::info Creación de Tareas
Cuando se proporcionan múltiples usuarios objetivo, la API **creará una tarea por cada usuario objetivo**. Por ejemplo, si especificas 3 usuarios objetivo y 2 dispositivos, se crearán 6 tareas. Usa el parámetro `start_time` para controlar el tiempo de ejecución de las tareas.
:::

## Ejemplos

### Dejar de Seguir Usuario Individual

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@username_to_unfollow"],
      "access_method": "direct"
    }
  }'
```

### Dejar de Seguir Múltiples Usuarios

Al dejar de seguir múltiples usuarios, se crea una tarea por cada usuario:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@user1", "@user2", "@user3"],
      "access_method": "direct"
    }
  }'
```

Esto creará 3 tareas independientes para ejecución inmediata.

### Programar Tareas con Hora de Inicio

Usa `start_time` para programar la hora de inicio de las tareas:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@user1", "@user2"],
      "access_method": "direct"
    },
    "start_time": "14:30"
  }'
```

### Dejar de Seguir Usuario por Método de Búsqueda

Usa el método de búsqueda cuando el acceso directo por URL no funciona:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["username1", "username2"],
      "access_method": "search"
    }
  }'
```

### Dejar de Seguir por Lotes en Múltiples Dispositivos

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@old_account"],
      "access_method": "direct"
    },
    "enable_multi_account": true
  }'
```

## Respuesta

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

## Métodos de Acceso

### Acceso Directo (`direct`)

- Abre el perfil de usuario por URL: `tiktok.com/@username` o `instagram.com/username`
- Más rápido y confiable
- Recomendado para la mayoría de casos

### Acceso por Búsqueda (`search`)

- Navega a búsqueda, introduce el nombre de usuario, hace clic en el resultado
- Más lento pero funciona cuando el acceso directo por URL está bloqueado
- Puede ser menos preciso si existen múltiples nombres de usuario similares

## Mejores Prácticas

1. **Usa start_time para Programar**: Utiliza el parámetro `start_time` para programar el tiempo de ejecución de las tareas (formato: "HH:MM").

2. **Prioriza Acceso Directo**: El método de acceso `direct` es más rápido y confiable que `search`.

3. **Procesar por Lotes Razonablemente**: No dejes de seguir demasiados usuarios a la vez. El sistema creará una tarea por cada usuario objetivo, por lo que listas grandes generarán muchas tareas.

## Ver También

- [API de Gestión de Tareas](./task-management.md) - Crear, consultar y gestionar tareas
- [Configuración del Script Post](./post-script.md) - Configurar parámetros del script de publicación
- [Configuración del Script Follow](./follow-script.md) - Configurar parámetros del script de seguir
