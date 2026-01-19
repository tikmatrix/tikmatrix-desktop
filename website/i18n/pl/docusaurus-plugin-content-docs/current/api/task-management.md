---
sidebar_position: 2
title: API zarządzania zadaniami
description: Kompletna dokumentacja API do zarządzania zadaniami
---

Ta strona dokumentuje wszystkie dostępne punkty końcowe API do zarządzania zadaniami w TikMatrix.

## Tworzenie zadania

Utwórz nowe zadanie dla jednego lub więcej urządzeń lub nazw użytkowników.

- **Punkt końcowy:** `POST /api/v1/task`
- **Content-Type:** `application/json`

### Parametry żądania

API obsługuje dwa tryby tworzenia zadań:

**Tryb 1: Oparty na urządzeniach** - Użyj `serials` do tworzenia zadań dla urządzeń
**Tryb 2: Oparty na nazwach użytkowników** - Użyj `usernames` do tworzenia zadań bezpośrednio dla określonych kont

| Parametr | Typ | Wymagany | Opis |
|-----------|------|----------|-------------|
| serials | string[] | Warunkowy | Tablica numerów seryjnych urządzeń (wymagana, jeśli nie podano `usernames`) |
| usernames | string[] | Warunkowy | Tablica nazw użytkowników do utworzenia zadań (wymagana, jeśli nie podano `serials`). Gdy podana, zadania są tworzone bezpośrednio dla tych kont. |
| script_name | string | Tak | Nazwa skryptu do wykonania |
| script_config | object | Tak | Parametry konfiguracyjne dla skryptu (zobacz dokumentację specyficzną dla skryptu) |
| enable_multi_account | boolean | Nie | Włącz tryb wielokontowy (domyślnie: false). Dotyczy tylko trybu opartego na urządzeniach. |
| start_time | string | Nie | Zaplanowany czas rozpoczęcia w formacie "HH:MM" |

### Obsługiwane skrypty

| Nazwa skryptu | Opis | Dokumentacja |
|-------------|-------------|---------------|
| post | Publikowanie filmów lub obrazów na TikTok/Instagram | [Konfiguracja skryptu publikacji](./post-script.md) |
| follow | Obserwowanie lub zaprzestanie obserwacji użytkowników | [Konfiguracja skryptu obserwowania](./follow-script.md) |

### Przykład

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Check out my new video! #viral #fyp",
      "material_list": ["C:/Videos/video1.mp4"],
      "upload_wait_time": 60
    }
  }'
```

Aby uzyskać szczegółowe parametry `script_config` i więcej przykładów, zobacz [Konfiguracja skryptu publikacji](./post-script.md) i [Konfiguracja skryptu obserwowania](./follow-script.md).

### Odpowiedź

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

## Wyświetlanie zadań

Zapytanie o zadania z opcjonalnymi filtrami.

- **Punkt końcowy:** `GET /api/v1/task`

| Parametr | Typ | Wymagany | Opis |
|-----------|------|----------|-------------|
| status | integer | Nie | Filtruj według statusu (0=oczekujące, 1=wykonywane, 2=zakończone, 3=nieudane) |
| serial | string | Nie | Filtruj według numeru seryjnego urządzenia |
| script_name | string | Nie | Filtruj według nazwy skryptu |
| source | string | Nie | Filtruj według źródła ("ui" lub "api") |
| page | integer | Nie | Numer strony (domyślnie: 1) |
| page_size | integer | Nie | Elementy na stronę (domyślnie: 20, maks: 100) |

## Pobieranie szczegółów zadania

Pobierz szczegółowe informacje o określonym zadaniu.

- **Punkt końcowy:** `GET /api/v1/task/{task_id}`

## Usuwanie zadania

Usuń zadanie. Jeśli zadanie jest wykonywane, zostanie najpierw zatrzymane.

- **Punkt końcowy:** `DELETE /api/v1/task/{task_id}`

## Grupowe usuwanie zadań

Usuń wiele zadań na raz. Wykonywane zadania zostaną najpierw zatrzymane.

- **Punkt końcowy:** `DELETE /api/v1/task/batch`
- **Body:** `{ "task_ids": [1, 2, 3] }`

## Zatrzymywanie zadania

Zatrzymaj wykonywane zadanie.

- **Punkt końcowy:** `POST /api/v1/task/{task_id}/stop`

## Ponowienie nieudanego zadania

Ponów nieudane zadanie.

- **Punkt końcowy:** `POST /api/v1/task/{task_id}/retry`

## Ponowienie wszystkich nieudanych zadań

Ponów wszystkie nieudane zadania na raz.

- **Punkt końcowy:** `POST /api/v1/task/retry-all`

## Pobieranie statystyk zadań

Pobierz statystyki dotyczące wszystkich zadań.

- **Punkt końcowy:** `GET /api/v1/task/stats`
- **Odpowiedź:** Zwraca liczbę wszystkich, oczekujących, wykonywanych, zakończonych i nieudanych zadań.

## Sprawdzanie licencji API

Sprawdź, czy twoja licencja obsługuje dostęp do API.

- **Punkt końcowy:** `GET /api/v1/license/check`
- **Uwaga:** Plan Starter zwraca kod błędu 40301. Plany Pro, Team i Business mają dostęp do API.
