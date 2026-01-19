---
sidebar_position: 6
title: Konfiguracja skryptu rozgrzewki konta
description: Kompletny przewodnik konfiguracji dla skryptu rozgrzewki konta
---

Ta strona dokumentuje parametry konfiguracyjne dla skryptu `account_warmup` używanego przy tworzeniu zadań.

## Przegląd

Skrypt `account_warmup` służy do rozgrzewania kont TikTok lub Instagram poprzez symulowanie naturalnego zachowania użytkownika. Ogląda filmy, losowo lajkuje, obserwuje, zapisuje i komentuje na podstawie skonfigurowanych prawdopodobieństw. Pomaga to nowym kontom budować historię zaangażowania i unikać wykrycia jako bot.

## Konfiguracja skryptu (`script_config`)

Obiekt `script_config` zawiera parametry dla skryptu rozgrzewki konta. Poniżej znajdują się dostępne parametry:

### Parametry

| Parametr | Typ | Wymagany | Domyślnie | Opis |
|-----------|------|----------|---------|-------------|
| task_duration | number | Nie | 600 | Całkowity czas trwania zadania rozgrzewki w sekundach |
| topic | string | Nie | "" | Słowa kluczowe tematu wyszukiwania (jedno na linię, losowo wybierane) |
| min_duration | number | Nie | 15 | Minimalny czas oglądania filmu w sekundach |
| max_duration | number | Nie | 30 | Maksymalny czas oglądania filmu w sekundach |
| like_probable | number | Nie | 0 | Prawdopodobieństwo (0-100) polubienia filmu |
| floow_probable | number | Nie | 0 | Prawdopodobieństwo (0-100) zaobserwowania twórcy filmu |
| collect_probable | number | Nie | 0 | Prawdopodobieństwo (0-100) zapisania/dodania filmu do zakładek |
| comment_probable | number | Nie | 0 | Prawdopodobieństwo (0-100) skomentowania filmu |
| comment | string | Nie | "" | Szablony komentarzy (jeden na linię, losowo wybierany) |
| insert_emoji | boolean | Nie | false | Czy wstawiać losowe emoji w komentarzach |
| comment_order | string | Nie | "random" | Kolejność wyboru komentarza: `random` lub `sequential` |
| generate_by_chatgpt | boolean | Nie | false | Czy generować komentarze przy użyciu ChatGPT |
| chatgpt_settings | object | Nie | {} | Ustawienia konfiguracji ChatGPT (patrz poniżej) |

### Struktura ustawień ChatGPT

Gdy `generate_by_chatgpt` jest ustawione na `true`, możesz skonfigurować generowanie komentarzy ChatGPT za pomocą obiektu `chatgpt_settings`:

| Parametr | Typ | Wymagany | Opis |
|-----------|------|----------|-------------|
| api_key | string | Tak | Twój klucz API OpenAI |
| model | string | Nie | Model do użycia (domyślnie: "gpt-3.5-turbo"). Opcje: "gpt-3.5-turbo", "gpt-4", "gpt-4-turbo" |
| prompt | string | Nie | Niestandardowy prompt do generowania komentarzy. Domyślnie generuje przyjazne, trafne komentarze |
| max_tokens | number | Nie | Maksymalna liczba tokenów dla odpowiedzi (domyślnie: 100) |
| temperature | number | Nie | Poziom kreatywności 0-2 (domyślnie: 0.7). Wyższe wartości = bardziej kreatywne |
| base_url | string | Nie | Niestandardowy URL endpoint API (dla Azure OpenAI lub kompatybilnych API) |

Przykładowy obiekt `chatgpt_settings`:

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

:::tip Rekomendacja
Dla nowych kont, zacznij od niskich prawdopodobieństw interakcji (5-15%) i stopniowo je zwiększaj. To naśladuje naturalne zachowanie użytkownika.
:::

## Przykłady

### Podstawowa rozgrzewka konta

Prosta rozgrzewka tylko z oglądaniem filmów:

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

### Rozgrzewka z wyszukiwaniem tematów

Rozgrzej konto poprzez wyszukiwanie określonych tematów:

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

### Rozgrzewka z interakcjami

Pełna rozgrzewka z lajkami, obserwowaniem i komentarzami:

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

### Rozgrzewka z komentarzami ChatGPT

Generuj inteligentne komentarze używając ChatGPT:

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

### Wsadowa rozgrzewka na wielu urządzeniach

Uruchom rozgrzewkę na wielu urządzeniach jednocześnie:

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

### Zaplanuj zadanie rozgrzewki

Zaplanuj rozgrzewkę na określoną godzinę:

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

### Rozgrzewka według listy nazw użytkowników

Utwórz zadania rozgrzewki dla konkretnych kont:

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

## Najlepsze praktyki

1. **Zacznij od niskich prawdopodobieństw**: Dla nowych kont, używaj niskich prawdopodobieństw interakcji (5-15%) i stopniowo je zwiększaj przez dni/tygodnie.

2. **Używaj odpowiednich tematów**: Wybieraj tematy zgodne z niszą twojego konta, aby budować odpowiednią historię zaangażowania.

3. **Różnicuj czas oglądania**: Ustaw zakres między min_duration a max_duration, aby symulować naturalne wzorce oglądania.

4. **Umiarkowany czas trwania zadania**: Uruchamiaj sesje rozgrzewki po 10-30 minut, 2-3 razy dziennie, zamiast ciągłych długich sesji.

5. **Używaj różnorodnych komentarzy**: Podawaj wiele szablonów komentarzy, aby uniknąć powtarzalnych wzorców, które mogą wywołać wykrycie spamu.

6. **Planuj mądrze**: Użyj `start_time`, aby uruchamiać zadania rozgrzewki w aktywnych godzinach strefy czasowej twojej docelowej grupy odbiorców.

## Zobacz także

- [API zarządzania zadaniami](./task-management.md) - Twórz, listuj i zarządzaj zadaniami
- [Konfiguracja skryptu publikacji](./post-script.md) - Konfiguruj parametry skryptu publikacji
- [Konfiguracja skryptu obserwowania](./follow-script.md) - Konfiguruj parametry skryptu obserwowania
- [Konfiguracja skryptu anulowania obserwacji](./unfollow-script.md) - Konfiguruj parametry skryptu anulowania obserwacji
