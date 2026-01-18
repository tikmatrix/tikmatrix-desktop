---
sidebar_position: 5
title: Configuración del Script Comment
description: Referencia completa de configuración para el script Comment
---

Esta página presenta los parámetros de configuración para el script `comment` usado en la creación de tareas.

## Visión General

El script `comment` se utiliza para publicar automáticamente comentarios en publicaciones de TikTok o Instagram. Cuando proporcionas múltiples URLs de publicaciones objetivo a través de la API, **se crea una tarea por cada URL de publicación objetivo**. Puedes usar el parámetro `start_time` para controlar el tiempo de ejecución de cada tarea.

## Configuración del Script (`script_config`)

El objeto `script_config` contiene los parámetros para el script de comentarios. Los siguientes son los parámetros disponibles:

### Parámetros

| Parámetro | Tipo | Requerido | Por Defecto | Descripción |
|-----------|------|----------|---------|-------------|
| target_post_urls | string[] | Sí* | [] | Array de URLs de publicaciones objetivo a comentar (una tarea por URL) |
| target_post_url | string | Sí* | "" | URL de publicación única o múltiples URLs separadas por salto de línea/coma |
| comment_content | string | Sí | "" | Contenido del texto del comentario. Puede contener múltiples comentarios separados por salto de línea |
| comment_order | string | No | "random" | Cómo seleccionar comentarios: `random` (aleatorio) o `sequential` (secuencial) |
| insert_emoji | boolean | No | false | Insertar emojis aleatorios en comentarios |
| comment_image_path | string | No | "" | Ruta de archivo de imagen para comentario con imagen (solo TikTok). Soporta ruta absoluta o ruta relativa a work_dir/upload/ |

:::note
Debe proporcionarse el array `target_post_urls` o la cadena `target_post_url`. Si se proporcionan ambos, `target_post_urls` tiene prioridad.
:::

:::tip Comentarios con Imagen (Solo TikTok)
El parámetro `comment_image_path` te permite adjuntar una imagen al comentario. Esta función **solo está soportada en TikTok** - los comentarios de Instagram no soportan adjuntos de imagen. La imagen se enviará al dispositivo y se seleccionará como la primera imagen de la galería.
:::

:::info Creación de Tareas
Cuando se proporcionan múltiples URLs de publicaciones objetivo, la API **creará una tarea por cada URL de publicación objetivo**. Por ejemplo, si especificas 3 URLs de publicación y 2 dispositivos, se crearán 6 tareas. Usa el parámetro `start_time` para controlar cuándo las tareas comienzan a ejecutarse.
:::

## Ejemplos

### Comentar en Publicación Individual

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "¡Contenido increíble! 🔥"
    }
  }'
```

### Usar Múltiples Opciones de Comentario

Proporciona múltiples comentarios separados por saltos de línea. El sistema seleccionará uno según `comment_order`:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "¡Video increíble!\n¡Me encanta este contenido!\n¡Sigue así! 👏\n¡Realmente genial!",
      "comment_order": "random"
    }
  }'
```

### Comentar en Múltiples Publicaciones

Al comentar múltiples publicaciones, se crea una tarea por cada publicación:

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
      "comment_content": "¡Buen video!\n¡Genial!\n¡Me encanta!",
      "comment_order": "sequential"
    }
  }'
```

Esto creará 3 tareas independientes para ejecución inmediata.

### Comentario Programado

Usa `start_time` para programar cuándo la tarea comienza a ejecutarse:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "¡Comentario programado!"
    },
    "start_time": "14:30"
  }'
```

### Comentario con Inserción de Emojis

Habilita inserción automática de emojis para hacer comentarios más atractivos:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Esto es increíble",
      "insert_emoji": true
    }
  }'
```

### Comentario por Modo de Lista de Nombres de Usuario

Crear tareas de comentario directamente para cuentas específicas:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@target/video/123",
      "comment_content": "¡Buen video!"
    }
  }'
```

### Comentario por Lotes en Múltiples Dispositivos

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@viral/video/999",
      "comment_content": "¡Contenido increíble!\n¡Excelente trabajo!\n¡Me encanta esto!",
      "comment_order": "random"
    },
    "enable_multi_account": true
  }'
```

### Ejemplo de Comentario en Instagram

La misma API funciona para publicaciones de Instagram:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.instagram.com/p/ABC123/",
      "comment_content": "¡Foto hermosa! 📸",
      "insert_emoji": true
    }
  }'
```

### Ejemplo de Comentario con Imagen en TikTok

Adjunta una imagen a tu comentario de TikTok (no soportado en Instagram):

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "¡Mira esta imagen!",
      "comment_image_path": "C:/images/my_image.jpg"
    }
  }'
```

:::info Ruta de Imagen
`comment_image_path` puede ser:

- **Ruta absoluta**: `C:/images/my_image.jpg` o `/home/user/images/my_image.jpg`
- **Ruta relativa**: `my_image.jpg` (relativa a `work_dir/upload/`)

:::

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

## Orden de Comentarios

### Orden Aleatorio (`random`)

- Selecciona aleatoriamente un comentario de la lista proporcionada
- Adecuado para hacer que los comentarios parezcan más naturales
- Comportamiento predeterminado

### Secuencial (`sequential`)

- Selecciona comentarios en orden según `job_count`
- La primera tarea usa el primer comentario, la segunda tarea usa el segundo comentario, y así sucesivamente
- Vuelve al inicio al llegar al final de la lista
- Adecuado para distribuir diferentes comentarios entre múltiples tareas

## Formato de URL de Publicaciones

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

## Mejores Prácticas

1. **Varía Tus Comentarios**: Proporciona múltiples opciones de comentario para evitar parecer spam.

2. **Usa Modo Secuencial para Diversidad**: Al comentar múltiples publicaciones con el mismo dispositivo, usa orden `sequential` para distribuir diferentes comentarios.

3. **Habilita Inserción de Emojis**: Establece `insert_emoji: true` para hacer que los comentarios parezcan más naturales y atractivos.

4. **Programa Tareas**: Usa el parámetro `start_time` para distribuir comentarios en el tiempo, reduciendo la posibilidad de activar límites de frecuencia.

5. **Respeta Límites de Plataforma**: No crees demasiadas tareas de comentario a la vez. La mayoría de plataformas tienen límites de frecuencia para comentarios.

## Códigos de Error

| Código | Descripción |
|------|-------------|
| 40001 | Falta URL de publicación objetivo o contenido de comentario |
| 40003 | Script no soportado por API |
| 40301 | Acceso a API requiere plan Pro+ |

## Ver También

- [API de Gestión de Tareas](./task-management.md) - Crear, listar y gestionar tareas
- [Configuración del Script Post](./post-script.md) - Configurar parámetros del script de publicación
- [Configuración del Script Follow](./follow-script.md) - Configurar parámetros del script de seguir
- [Visión General de la API Local](./local-api.md) - Visión general de la API e inicio rápido
