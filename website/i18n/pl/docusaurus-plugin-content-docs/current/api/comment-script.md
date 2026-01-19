---
sidebar_position: 5
title: Konfiguracja skryptu komentowania
description: Kompletny przewodnik konfiguracji dla skryptu komentowania
---

Ta strona dokumentuje parametry konfiguracyjne dla skryptu `comment` używanego przy tworzeniu zadań.

## Przegląd

Skrypt `comment` służy do automatycznego publikowania komentarzy na postach TikTok lub Instagram. Gdy podajesz wiele docelowych URL postów przez API, **jedno zadanie jest tworzone dla każdego URL docelowego posta**. Możesz kontrolować, kiedy każde zadanie się wykona, używając parametru `start_time`.

## Konfiguracja skryptu (`script_config`)

Obiekt `script_config` zawiera parametry dla skryptu komentowania. Poniżej znajdują się dostępne parametry:

### Parametry

| Parametr | Typ | Wymagany | Domyślnie | Opis |
|-----------|------|----------|---------|-------------|
| target_post_urls | string[] | Tak* | [] | Tablica docelowych URL postów do skomentowania (jedno zadanie na URL) |
| target_post_url | string | Tak* | "" | Pojedynczy docelowy URL posta lub wiele URL oddzielonych nowymi liniami/przecinkami |
| comment_content | string | Tak | "" | Treść komentarza. Może zawierać wiele komentarzy oddzielonych nowymi liniami |
| comment_order | string | Nie | "random" | Jak wybierać komentarze: `random` lub `sequential` |
| insert_emoji | boolean | Nie | false | Czy wstawiać losowe emoji do komentarza |
| comment_image_path | string | Nie | "" | Ścieżka do pliku obrazu dla komentarza obrazkowego (tylko TikTok). Obsługuje ścieżkę bezwzględną lub względną do work_dir/upload/ |

:::note
Musi być podany albo tablica `target_post_urls`, albo łańcuch `target_post_url`. Jeśli oba są podane, `target_post_urls` ma pierwszeństwo.
:::

:::tip Komentarz obrazkowy (tylko TikTok)
Parametr `comment_image_path` pozwala na dołączenie obrazu do komentarza. Ta funkcja jest **obsługiwana tylko na TikTok** - komentarze Instagram nie obsługują załączników obrazowych. Obraz zostanie przesłany do urządzenia i wybrany jako pierwszy obraz w galerii.
:::

:::info Tworzenie zadań
Gdy podanych jest wiele docelowych URL postów, API tworzy **jedno zadanie na każdy docelowy URL posta**. Na przykład, jeśli określisz 3 URL postów i 2 urządzenia, zostanie utworzonych 6 zadań. Użyj parametru `start_time`, aby kontrolować, kiedy zadania zaczną się wykonywać.
:::

## Przykłady

### Komentarz na pojedynczym poście

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Great content! 🔥"
    }
  }'
```

### Komentarz z wieloma opcjami komentarza

Podaj wiele komentarzy oddzielonych nowymi liniami. System wybierze jeden na podstawie `comment_order`:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Amazing video!\nLove this content!\nKeep it up! 👏\nThis is so good!",
      "comment_order": "random"
    }
  }'
```

### Komentarz na wielu postach

Podczas komentowania wielu postów, jedno zadanie jest tworzone dla każdego posta:

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
      "comment_content": "Great video!\nAwesome!\nLove it!",
      "comment_order": "sequential"
    }
  }'
```

To tworzy 3 oddzielne zadania, które wykonują się natychmiast.

### Zaplanuj komentarze z czasem startu

Użyj `start_time`, aby zaplanować, kiedy zadania powinny się rozpocząć:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Scheduled comment!"
    },
    "start_time": "14:30"
  }'
```

### Komentarz z wstawianiem emoji

Włącz automatyczne wstawianie emoji, aby uczynić komentarze bardziej angażującymi:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "This is amazing",
      "insert_emoji": true
    }
  }'
```

### Komentarz według trybu listy nazw użytkowników

Twórz zadania komentowania bezpośrednio dla konkretnych kont:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@target/video/123",
      "comment_content": "Nice video!"
    }
  }'
```

### Wsadowe komentowanie na wielu urządzeniach

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@viral/video/999",
      "comment_content": "Great content!\nAmazing work!\nLove this!",
      "comment_order": "random"
    },
    "enable_multi_account": true
  }'
```

### Przykład komentarza Instagram

To samo API działa dla postów Instagram:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.instagram.com/p/ABC123/",
      "comment_content": "Beautiful photo! 📸",
      "insert_emoji": true
    }
  }'
```

### Przykład komentarza obrazkowego TikTok

Dołącz obraz do komentarza TikTok (nie obsługiwane na Instagram):

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Check out this image!",
      "comment_image_path": "C:/images/my_image.jpg"
    }
  }'
```

:::info Ścieżka obrazu
`comment_image_path` może być:

- **Ścieżka bezwzględna**: `C:/images/my_image.jpg` lub `/home/user/images/my_image.jpg`
- **Ścieżka względna**: `my_image.jpg` (względem `work_dir/upload/`)

:::

## Odpowiedź

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

## Kolejność komentarzy

### Kolejność losowa (`random`)

- Losowo wybiera jeden komentarz z podanej listy
- Dobre dla uczynienia komentarzy bardziej naturalnymi
- Domyślne zachowanie

### Kolejność sekwencyjna (`sequential`)

- Wybiera komentarze w kolejności na podstawie `job_count`
- Pierwsze zadanie używa pierwszego komentarza, drugie zadanie używa drugiego komentarza, itd.
- Wraca do początku po dotarciu do końca listy
- Dobre do dystrybucji różnych komentarzy na wiele zadań

## Formaty URL postów

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

## Najlepsze praktyki

1. **Różnicuj swoje komentarze**: Podawaj wiele opcji komentarzy, aby uniknąć sprawiania wrażenia spamerskiego.

2. **Używaj kolejności sekwencyjnej dla różnorodności**: Podczas komentowania wielu postów tym samym urządzeniem, użyj kolejności `sequential`, aby dystrybuować różne komentarze.

3. **Włącz wstawianie emoji**: Ustaw `insert_emoji: true`, aby komentarze wyglądały bardziej naturalnie i angażująco.

4. **Planuj zadania**: Użyj parametru `start_time`, aby rozłożyć komentarze w czasie, zmniejszając szansę na ograniczenie częstotliwości.

5. **Szanuj limity platformy**: Nie twórz zbyt wielu zadań komentowania naraz. Większość platform ma limity częstotliwości komentowania.

## Kody błędów

| Kod | Opis |
|------|-------------|
| 40001 | Brak docelowego URL posta lub treści komentarza |
| 40003 | Skrypt nie jest obsługiwany przez API |
| 40301 | Dostęp do API wymaga planu Pro+ |

## Zobacz także

- [API zarządzania zadaniami](./task-management.md) - Twórz, listuj i zarządzaj zadaniami
- [Konfiguracja skryptu publikacji](./post-script.md) - Konfiguruj parametry skryptu publikacji
- [Konfiguracja skryptu obserwowania](./follow-script.md) - Konfiguruj parametry skryptu obserwowania
- [Przegląd lokalnego API](./local-api.md) - Przegląd API i szybki start
