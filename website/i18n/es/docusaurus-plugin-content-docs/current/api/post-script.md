---
sidebar_position: 3
title: Configuración del Script Post
description: Referencia completa de configuración para el script Post
---

Esta página documenta los parámetros de configuración para el script `post` usado en la creación de tareas.

## Visión General

El script `post` se utiliza para publicar automáticamente contenido (videos o imágenes) en TikTok o Instagram. Soporta múltiples métodos de publicación, fuentes de material y opciones de audio.

## Configuración del Script (`script_config`)

El objeto `script_config` contiene los parámetros para el script de publicación. Los siguientes son los parámetros disponibles:

### Parámetros Generales (TikTok e Instagram)

| Parámetro | Tipo | Requerido | Por Defecto | Descripción |
|------|------|------|--------|------|
| content_type | integer | No | 0 | Tipo de contenido: `0` = video, `1` = imagen |
| image_count | integer | No | 1 | Cantidad de imágenes a seleccionar (cuando content_type = 1) |
| captions | string | No | "" | Texto del título de la publicación. Soporta formato spintax: `{opción1\|opción2\|opción3}` |
| post_way | string | No | "share" | Método de publicación: `share`, `addButton` o `useSound` |
| material_source | string | No | "materialLibrary" | Fuente de material: `materialLibrary` (biblioteca de materiales) o `localFolder` (carpeta local), ignorado si se proporciona material_list |
| material_path | string | Condicional | "" | Ruta de carpeta local (requerido cuando material_source = "localFolder") |
| material_list | string[] | No | [] | **Array de rutas de archivos de material directamente.** Cuando se proporciona este parámetro, se omite la lógica de material_source y material_path. Recomendado para escenarios de automatización API. |
| materials_tags | string | No | "" | Etiquetas de material separadas por comas para filtrar de la biblioteca de materiales |
| upload_wait_time | integer | No | 30 | Segundos a esperar para completar la carga |
| sound_wait_time | integer | No | 10 | Segundos a esperar para cargar el audio |
| add_sound | string/integer | No | "-1" | Opción de audio: `-1` = predeterminado, `0` = deshabilitado, `1` = habilitado, `custom` = usar audio personalizado |
| sound_name | string | Condicional | "" | Nombre/URL del audio (requerido cuando post_way = "useSound") |
| custom_sound_keyword | string | Condicional | "" | Palabra clave para buscar audio personalizado (requerido cuando add_sound = "custom") |
| origin_sound_volume | integer | No | 50 | Volumen del audio original (0-100) |
| add_sound_volume | integer | No | 50 | Volumen del audio añadido (0-100) |

### Parámetros Exclusivos de TikTok

| Parámetro | Tipo | Requerido | Por Defecto | Descripción |
|------|------|------|--------|------|
| add_product_link | integer | No | 0 | Añadir enlace de producto: `0` = no, `1` = sí |

### Parámetros Exclusivos de Instagram

| Parámetro | Tipo | Requerido | Por Defecto | Descripción |
|------|------|------|--------|------|
| placement | string | No | "reel" | Ubicación de publicación: `reel` (Reel) o `story` (Historia) |

## Ejemplos

### Tarea Básica de Publicación - Pasando Rutas de Material Directamente

Esta es la manera recomendada para automatización API - pasar rutas de archivos de material directamente, sin depender de la biblioteca de materiales o escaneo de carpetas:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "¡Mira mi nuevo video! #viral #trending",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Publicar Usando Biblioteca de Materiales (TikTok)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "¡Mira mi nuevo video! #viral #trending",
      "post_way": "share",
      "material_source": "materialLibrary",
      "materials_tags": "viral, baile",
      "upload_wait_time": 60,
      "add_sound": "-1"
    },
    "enable_multi_account": false
  }'
```

### Crear Tarea de Publicación por Lista de Nombres de Usuario

Este modo te permite crear tareas directamente para cuentas específicas sin necesidad de conocer sus números de serie de dispositivo:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@user1", "@user2", "@user3"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "¡Mira mi nuevo video! #viral #trending",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Publicar Usando Carpeta Local (Instagram)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "¡Contenido increíble! #instagram #reels",
      "post_way": "addButton",
      "placement": "reel",
      "material_source": "localFolder",
      "material_path": "C:/Videos/instagram",
      "upload_wait_time": 45
    },
    "enable_multi_account": true
  }'
```

### Publicar con Audio Personalizado

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "¡Bailando con esta canción viral!",
      "post_way": "share",
      "add_sound": "custom",
      "custom_sound_keyword": "música viral 2024",
      "origin_sound_volume": 30,
      "add_sound_volume": 70,
      "material_source": "materialLibrary",
      "upload_wait_time": 60
    }
  }'
```

### Publicar con URL de Audio Especificada

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "post_way": "useSound",
      "sound_name": "https://www.tiktok.com/music/original-sound-7123456789",
      "captions": "¡Usando esta música increíble!",
      "material_source": "materialLibrary"
    }
  }'
```

### Publicar Imágenes (Carrusel)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "image_count": 5,
      "captions": "¡Mira estas fotos! #galería",
      "material_source": "localFolder",
      "material_path": "C:/Images/carousel",
      "upload_wait_time": 45
    }
  }'
```

## Respuesta

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

## Documentación Relacionada

- [API de Gestión de Tareas](./task-management.md) - Crear, listar y gestionar tareas
