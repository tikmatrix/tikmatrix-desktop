---
sidebar_position: 1
title: Przegląd Local API
description: TikMatrix Local API do programowego zarządzania zadaniami
---

TikMatrix zapewnia lokalne RESTful API, które pozwala na programowe zarządzanie zadaniami. Jest to przydatne do integracji TikMatrix z własnymi systemami automatyzacji, tworzenia niestandardowych przepływów pracy lub wykonywania operacji wsadowych.

## Wymagania

:::warning Wymaganie licencji
**Local API jest dostępne tylko dla subskrybentów planów Pro, Team i Business.** Plan Starter nie ma dostępu do API.
:::

## Bazowy URL

API działa na twoim lokalnym komputerze pod adresem:

```text
http://localhost:50809/api/v1/
```

:::note
Port `50809` jest domyślnym portem. Upewnij się, że TikMatrix jest uruchomiony przed wykonywaniem żądań API.
:::

## Format odpowiedzi

Wszystkie odpowiedzi API mają następujący format:

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### Kody odpowiedzi

| Kod | Opis |
|------|-------------|
| 0 | Sukces |
| 40001 | Złe żądanie - Nieprawidłowe parametry |
| 40002 | Złe żądanie - Brak script_name |
| 40003 | Złe żądanie - Skrypt nieobsługiwany przez API |
| 40301 | Zabronione - Dostęp do API wymaga planu Pro+ |
| 40401 | Nie znaleziono - Zasób nie znaleziony |
| 50001 | Wewnętrzny błąd serwera |

## Szybki start

### 1. Sprawdź dostęp do API

Najpierw sprawdź, czy twoja licencja obsługuje dostęp do API:

```bash
curl http://localhost:50809/api/v1/license/check
```

Odpowiedź:

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

### 2. Utwórz zadanie

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "captions": "Check out my new video! #viral"
    },
    "enable_multi_account": false,
    "start_time": "14:30"
  }'
```

### 3. Wyświetl zadania

```bash
curl http://localhost:50809/api/v1/task?status=0&page=1&page_size=20
```

## Dostępne skrypty

Parametr `script_name` akceptuje następujące wartości:

| Nazwa skryptu | Opis | Wsparcie API |
|-------------|-------------|-------------|
| `post` | Publikowanie treści | ✅ Obsługiwane |
| `follow` | Obserwowanie użytkowników | ✅ Obsługiwane |
| `unfollow` | Zaprzestanie obserwacji użytkowników | ✅ Obsługiwane |
| `account_warmup` | Rozgrzewanie kont | ✅ Obsługiwane |
| `comment` | Komentowanie postów | ✅ Obsługiwane |
| `like` | Polubienia postów | 🔜 Wkrótce |
| `message` | Wysyłanie wiadomości bezpośrednich | 🔜 Wkrótce |
| `super_marketing` | Kampania super marketingowa | 🔜 Wkrótce |
| `profile` | Aktualizacja profilu | 🔜 Wkrótce |
| `scrape_user` | Zbieranie danych użytkownika | 🔜 Wkrótce |

## Status zadania

| Kod statusu | Tekst statusu | Opis |
|-------------|-------------|-------------|
| 0 | pending | Zadanie oczekuje na wykonanie |
| 1 | running | Zadanie jest obecnie wykonywane |
| 2 | completed | Zadanie zakończone pomyślnie |
| 3 | failed | Zadanie nie powiodło się |

## Następne kroki

- [API zarządzania zadaniami](./task-management) - Tworzenie, zapytania i zarządzanie zadaniami
- [Konfiguracja skryptu publikacji](./post-script) - Konfigurowanie parametrów skryptu publikacji
- [Konfiguracja skryptu obserwowania](./follow-script) - Konfigurowanie parametrów skryptu obserwowania
- [Konfiguracja skryptu zaprzestania obserwacji](./unfollow-script) - Konfigurowanie parametrów skryptu zaprzestania obserwacji
- [Konfiguracja skryptu rozgrzewania konta](./account-warmup-script) - Konfigurowanie parametrów skryptu rozgrzewania konta
- [Konfiguracja skryptu komentarzy](./comment-script) - Konfigurowanie parametrów skryptu komentarzy
- [Przykłady API](./examples) - Przykłady kodu w różnych językach
