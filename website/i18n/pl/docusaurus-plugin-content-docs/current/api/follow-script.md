---
sidebar_position: 4
title: Konfiguracja skryptu obserwowania
description: Kompletna dokumentacja konfiguracji skryptu obserwowania
---

Ta strona dokumentuje parametry konfiguracyjne dla skryptu `follow` używanego przy tworzeniu zadań.

## Przegląd

Skrypt `follow` służy do automatycznego obserwowania użytkowników na TikTok lub Instagram. Gdy podasz wielu użytkowników docelowych przez API, **jedno zadanie jest tworzone dla każdego użytkownika docelowego**. Możesz kontrolować, kiedy każde zadanie zostanie wykonane, używając parametru `start_time`.

## Konfiguracja skryptu (`script_config`)

Obiekt `script_config` zawiera parametry dla skryptu obserwowania. Poniżej znajdują się dostępne parametry:

### Parametry

| Parametr | Typ | Wymagany | Domyślnie | Opis |
|-----------|------|----------|---------|-------------|
| target_users | string[] | Tak* | [] | Tablica nazw użytkowników docelowych do obserwowania (jedno zadanie na użytkownika) |
| target_user | string | Tak* | "" | Pojedyncza nazwa użytkownika lub wiele nazw użytkowników oddzielonych nowymi liniami/przecinkami |
| access_method | string | Nie | "direct" | Sposób nawigacji do profilu użytkownika: `direct` (przez URL) lub `search` |

:::note
Należy podać albo tablicę `target_users` albo łańcuch `target_user`. Jeśli obie są podane, `target_users` ma pierwszeństwo.
:::

:::info Tworzenie zadań
Gdy podanych jest wielu użytkowników docelowych, API tworzy **jedno zadanie dla każdego użytkownika docelowego**. Na przykład, jeśli określisz 3 użytkowników docelowych i 2 urządzenia, zostanie utworzonych 6 zadań. Użyj parametru `start_time`, aby kontrolować, kiedy zadania zaczną się wykonywać.
:::

## Przykłady

### Obserwowanie pojedynczego użytkownika

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@username_to_follow"],
      "access_method": "direct"
    }
  }'
```

### Obserwowanie wielu użytkowników

Podczas obserwowania wielu użytkowników, jedno zadanie jest tworzone dla każdego użytkownika:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@user1", "@user2", "@user3"],
      "access_method": "direct"
    }
  }'
```

To tworzy 3 oddzielne zadania, które są wykonywane natychmiast.

### Planowanie zadań z czasem rozpoczęcia

Użyj `start_time`, aby zaplanować, kiedy zadania powinny się rozpocząć:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@user1", "@user2"],
      "access_method": "direct"
    },
    "start_time": "14:30"
  }'
```

### Obserwowanie użytkowników za pomocą metody wyszukiwania

Użyj metody wyszukiwania, gdy bezpośredni dostęp przez URL nie działa:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["username1", "username2"],
      "access_method": "search"
    }
  }'
```

### Obserwowanie użytkowników według trybu listy nazw użytkowników

Twórz zadania obserwowania bezpośrednio dla określonych kont:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@target_user"],
      "access_method": "direct"
    }
  }'
```

### Grupowe obserwowanie na wielu urządzeniach

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@influencer_account"],
      "access_method": "direct"
    },
    "enable_multi_account": true
  }'
```

## Odpowiedź

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

## Metody dostępu

### Metoda bezpośrednia (`direct`)

- Otwiera profil użytkownika przez URL: `tiktok.com/@username` lub `instagram.com/username`
- Szybsza i bardziej niezawodna
- Zalecana w większości przypadków użycia

### Metoda wyszukiwania (`search`)

- Nawiguje do wyszukiwania, wpisuje nazwę użytkownika, kliknięcie na wynik
- Wolniejsza, ale działa, gdy bezpośredni dostęp przez URL jest zablokowany
- Może być mniej dokładna, jeśli istnieje wiele podobnych nazw użytkowników

## Najlepsze praktyki

1. **Użyj start_time do planowania**: Użyj parametru `start_time`, aby zaplanować, kiedy zadania powinny się wykonać (format: "HH:MM").

2. **Preferuj bezpośredni dostęp**: Metoda dostępu `direct` jest szybsza i bardziej niezawodna niż `search`.

3. **Grupuj mądrze**: Nie obserwuj zbyt wielu użytkowników naraz. System tworzy jedno zadanie na użytkownika docelowego, więc duże listy skutkują wieloma zadaniami.

## Zobacz także

- [API zarządzania zadaniami](./task-management.md) - Tworzenie, wyświetlanie i zarządzanie zadaniami
- [Konfiguracja skryptu publikacji](./post-script.md) - Konfigurowanie parametrów skryptu publikacji
- [Konfiguracja skryptu zaprzestania obserwacji](./unfollow-script.md) - Konfigurowanie parametrów skryptu zaprzestania obserwacji
