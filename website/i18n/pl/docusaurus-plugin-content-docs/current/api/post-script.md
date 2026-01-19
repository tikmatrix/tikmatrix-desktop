---
sidebar_position: 3
title: Konfiguracja skryptu publikacji
description: Kompletna dokumentacja konfiguracji skryptu publikacji
---

Ta strona dokumentuje parametry konfiguracyjne dla skryptu `post` używanego przy tworzeniu zadań.

## Przegląd

Skrypt `post` służy do automatycznego publikowania treści (filmów lub obrazów) na TikTok lub Instagram. Obsługuje różne metody publikowania, źródła materiałów i opcje dźwięku.

## Konfiguracja skryptu (`script_config`)

Obiekt `script_config` zawiera parametry dla skryptu publikacji. Poniżej znajdują się dostępne parametry:

### Wspólne parametry (TikTok i Instagram)

| Parametr | Typ | Wymagany | Domyślnie | Opis |
|-----------|------|----------|---------|-------------|
| content_type | integer | Nie | 0 | Typ treści: `0` = Wideo, `1` = Obrazy |
| image_count | integer | Nie | 1 | Liczba obrazów do wybrania (gdy content_type = 1) |
| captions | string | Nie | "" | Tekst podpisu do posta. Obsługuje format spintax: `{opcja1\|opcja2\|opcja3}` |
| post_way | string | Nie | "share" | Metoda publikacji: `share`, `addButton` lub `useSound` |
| material_source | string | Nie | "materialLibrary" | Źródło materiału: `materialLibrary` lub `localFolder` (ignorowane, jeśli podano material_list) |
| material_path | string | Warunkowy | "" | Ścieżka do folderu lokalnego (wymagana, gdy material_source = "localFolder") |
| material_list | string[] | Nie | [] | **Tablica bezpośrednich ścieżek plików materiałów.** Gdy podana, pomija logikę material_source i material_path. Idealna do automatyzacji API. |
| materials_tags | string | Nie | "" | Tagi materiałów oddzielone przecinkami do filtrowania z biblioteki |
| upload_wait_time | integer | Nie | 30 | Sekundy oczekiwania na zakończenie przesyłania |
| sound_wait_time | integer | Nie | 10 | Sekundy oczekiwania na załadowanie dźwięku |
| add_sound | string/integer | Nie | "-1" | Opcja dźwięku: `-1` = domyślny, `0` = wyłącz, `1` = włącz, `custom` = użyj niestandardowego dźwięku |
| sound_name | string | Warunkowy | "" | Nazwa/URL dźwięku (wymagana, gdy post_way = "useSound") |
| custom_sound_keyword | string | Warunkowy | "" | Słowo kluczowe do wyszukiwania niestandardowego dźwięku (wymagane, gdy add_sound = "custom") |
| origin_sound_volume | integer | Nie | 50 | Głośność oryginalnego dźwięku (0-100) |
| add_sound_volume | integer | Nie | 50 | Głośność dodanego dźwięku (0-100) |

### Parametry specyficzne dla TikTok

| Parametr | Typ | Wymagany | Domyślnie | Opis |
|-----------|------|----------|---------|-------------|
| add_product_link | integer | Nie | 0 | Dodaj link do produktu: `0` = Nie, `1` = Tak |

### Parametry specyficzne dla Instagram

| Parametr | Typ | Wymagany | Domyślnie | Opis |
|-----------|------|----------|---------|-------------|
| placement | string | Nie | "reel" | Umiejscowienie posta: `reel` lub `story` |

## Przykłady

### Podstawowe zadanie publikacji z bezpośrednią listą materiałów

Jest to zalecane podejście do automatyzacji API - przekazuj ścieżki materiałów bezpośrednio bez polegania na bibliotece materiałów lub skanowaniu folderów:

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

### Zadanie publikacji z biblioteką materiałów (TikTok)

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

### Zadanie publikacji według listy nazw użytkowników

Ten tryb pozwala tworzyć zadania bezpośrednio dla określonych kont bez znajomości ich numerów seryjnych urządzeń:

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

### Zadanie publikacji z folderu lokalnego (Instagram)

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

### Publikacja z niestandardowym dźwiękiem

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

### Publikacja z użyciem określonego URL dźwięku

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

### Publikacja obrazów (Karuzela)

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

## Odpowiedź

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

## Zobacz także

- [API zarządzania zadaniami](./task-management.md) - Tworzenie, wyświetlanie i zarządzanie zadaniami
