---
sidebar_position: 3
title: Конфигурация скрипта Post
description: Полная документация по параметрам конфигурации скрипта post
---

На этой странице описаны параметры конфигурации скрипта `post`, используемого при создании задач.

## Обзор

Скрипт `post` используется для автоматической публикации контента (видео или изображений) в TikTok или Instagram. Он поддерживает различные методы публикации, источники материалов и параметры звука.

## Конфигурация скрипта (`script_config`)

Объект `script_config` содержит параметры для скрипта публикации. Ниже приведены доступные параметры:

### Общие параметры (TikTok и Instagram)

| Параметр | Тип | Обязательно | По умолчанию | Описание |
|---------|-----|-----------|-------------|---------|
| content_type | integer | Нет | 0 | Тип контента: `0` = видео, `1` = изображения |
| image_count | integer | Нет | 1 | Количество выбираемых изображений (когда content_type = 1) |
| captions | string | Нет | "" | Текст подписи к посту. Поддерживает spintax: `{вариант1\|вариант2\|вариант3}` |
| post_way | string | Нет | "share" | Способ публикации: `share`, `addButton` или `useSound` |
| material_source | string | Нет | "materialLibrary" | Источник материала: `materialLibrary` (библиотека) или `localFolder` (локальная папка), игнорируется если указан material_list |
| material_path | string | Условно | "" | Путь к локальной папке (обязательно, когда material_source = "localFolder") |
| material_list | string[] | Нет | [] | **Массив прямых путей к файлам материалов.** При указании этого параметра логика material_source и material_path игнорируется. Идеально для API-автоматизации. |
| materials_tags | string | Нет | "" | Теги материалов через запятую для фильтрации из библиотеки |
| upload_wait_time | integer | Нет | 30 | Время ожидания загрузки в секундах |
| sound_wait_time | integer | Нет | 10 | Время ожидания загрузки звука в секундах |
| add_sound | string/integer | Нет | "-1" | Параметры звука: `-1` = по умолчанию, `0` = отключен, `1` = включен, `custom` = использовать собственный звук |
| sound_name | string | Условно | "" | Название/URL звука (обязательно, когда post_way = "useSound") |
| custom_sound_keyword | string | Условно | "" | Ключевое слово для поиска собственного звука (обязательно, когда add_sound = "custom") |
| origin_sound_volume | integer | Нет | 50 | Громкость оригинального звука (0-100) |
| add_sound_volume | integer | Нет | 50 | Громкость добавленного звука (0-100) |

### Параметры только для TikTok

| Параметр | Тип | Обязательно | По умолчанию | Описание |
|---------|-----|-----------|-------------|---------|
| add_product_link | integer | Нет | 0 | Добавить ссылку на товар: `0` = нет, `1` = да |

### Параметры только для Instagram

| Параметр | Тип | Обязательно | По умолчанию | Описание |
|---------|-----|-----------|-------------|---------|
| placement | string | Нет | "reel" | Размещение публикации: `reel` или `story` |

## Примеры

### Базовая задача публикации с прямым списком материалов

Это рекомендуемый подход для API-автоматизации - передача путей к материалам напрямую без использования библиотеки или сканирования папок:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Посмотрите моё новое видео! #популярное #рекомендации",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Публикация с использованием библиотеки материалов (TikTok)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Посмотрите моё новое видео! #популярное #рекомендации",
      "post_way": "share",
      "material_source": "materialLibrary",
      "materials_tags": "популярное, танцы",
      "upload_wait_time": 60,
      "add_sound": "-1"
    },
    "enable_multi_account": false
  }'
```

### Создание задачи по списку имён пользователей

Этот режим позволяет создавать задачи напрямую для конкретных аккаунтов без знания их серийных номеров устройств:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@user1", "@user2", "@user3"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Посмотрите моё новое видео! #популярное #рекомендации",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Публикация из локальной папки (Instagram)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Потрясающий контент! #instagram #reels",
      "post_way": "addButton",
      "placement": "reel",
      "material_source": "localFolder",
      "material_path": "C:/Videos/instagram",
      "upload_wait_time": 45
    },
    "enable_multi_account": true
  }'
```

### Публикация с собственным звуком

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Танцуй под этот трек!",
      "post_way": "share",
      "add_sound": "custom",
      "custom_sound_keyword": "популярная музыка 2024",
      "origin_sound_volume": 30,
      "add_sound_volume": 70,
      "material_source": "materialLibrary",
      "upload_wait_time": 60
    }
  }'
```

### Публикация с указанным URL звука

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "post_way": "useSound",
      "sound_name": "https://www.tiktok.com/music/original-sound-7123456789",
      "captions": "Использую этот классный звук!",
      "material_source": "materialLibrary"
    }
  }'
```

### Публикация изображений (карусель)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "image_count": 5,
      "captions": "Посмотрите эти фото! #карусель",
      "material_source": "localFolder",
      "material_path": "C:/Images/carousel",
      "upload_wait_time": 45
    }
  }'
```

## Ответ

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

## См. также

- [API управления задачами](./task-management.md) - Создание, просмотр и управление задачами
