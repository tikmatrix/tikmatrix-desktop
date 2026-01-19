# Konfiguracja profilu roboczego

TikMatrix obsługuje konfigurację użytkowników profilu roboczego dla każdego urządzenia indywidualnie, co jest bardzo przydatne w przypadku urządzeń zarządzanych przez przedsiębiorstwo lub środowisk z podwójnymi aplikacjami.

## Co to jest profil roboczy

Profil roboczy to funkcja Android, która pozwala na utworzenie niezależnego środowiska pracy na tym samym urządzeniu. Konfigurując różne ID użytkowników, możesz:

- Używać TikMatrix normalnie na urządzeniach zarządzanych przez przedsiębiorstwo
- Ustawiać różne konfiguracje użytkowników dla różnych środowisk aplikacji
- Osiągać bardziej szczegółowe zarządzanie urządzeniami i kontrolę uprawnień

## Używanie narzędzia Shelter do klonowania aplikacji

Przed skonfigurowaniem profilu roboczego musisz użyć narzędzia Shelter do sklonowania aplikacji TikTok i TikMatrix:

### Co to jest Shelter

Shelter to aplikacja open-source, która tworzy i zarządza profilem roboczym na urządzeniach Android. Pozwala na uruchamianie zduplikowanych aplikacji w izolowanym środowisku pracy.

### Instalacja Shelter

1. Pobierz Shelter z [F-Droid](https://f-droid.org/packages/net.typeblog.shelter/) lub [Google Play Store](https://play.google.com/store/apps/details?id=net.typeblog.shelter)
2. Zainstaluj i otwórz Shelter na swoim urządzeniu
3. Postępuj zgodnie z kreatorami konfiguracji, aby utworzyć profil roboczy

### Klonowanie wymaganych aplikacji

Po skonfigurowaniu Shelter musisz sklonować zarówno aplikacje TikTok, jak i TikMatrix:

1. **Sklonuj aplikację TikTok**:
   - Otwórz Shelter i przejdź do zakładki "Main"
   - Znajdź TikTok na liście aplikacji
   - Dotknij przycisku "Clone to Work Profile"
   - Poczekaj na zakończenie procesu klonowania

2. **Sklonuj aplikację TikMatrix**:
   - W Shelter znajdź TikMatrix na liście aplikacji
   - Dotknij przycisku "Clone to Work Profile"
   - Potwierdź operację klonowania

### Weryfikacja pomyślnego klonowania

Po pomyślnym sklonowaniu:

- Zobaczysz zarówno TikTok, jak i TikMatrix z ikoną teczki w szufladzie aplikacji
- To są wersje aplikacji z profilu roboczego
- Oryginalne aplikacje pozostają niezmienione w profilu głównym

## Jak skonfigurować profil roboczy

### 1. Otwórz pasek narzędzi urządzenia

Gdy urządzenie jest podłączone i wyświetlane w głównym interfejsie TikMatrix:

1. Kliknij dwukrotnie kartę urządzenia, aby przejść do trybu pełnoekranowego
2. Pasek narzędzi pojawi się po prawej stronie ekranu urządzenia
3. Pasek narzędzi jest domyślnie zwinięty i rozwinie się automatycznie po najechaniu na niego

### 2. Znajdź przycisk profilu roboczego

U dołu paska narzędzi zobaczysz przycisk z ikoną teczki, który jest przyciskiem konfiguracji profilu roboczego.

### 3. Ustaw ID użytkownika

1. Kliknij przycisk ikony teczki
2. Wprowadź ID użytkownika w wyskakującym oknie dialogowym (np. 10)
3. Kliknij przycisk "Save"

### 4. Potwierdź konfigurację

Po pomyślnej konfiguracji system wyświetli powiadomienie "Work Profile user settings saved".

## Opis ID użytkownika

### Typowe ID użytkowników

- **0**: Użytkownik główny (użytkownik domyślny)
- **10**: Pierwszy użytkownik profilu roboczego
- **11**: Drugi użytkownik profilu roboczego
- Dodatkowe ID użytkowników postępują zgodnie z tym wzorcem

### Jak znaleźć ID użytkownika

Jeśli nie jesteś pewien ID użytkowników na swoim urządzeniu, możesz je znaleźć używając:

```bash
adb shell pm list users
```

Lub wykonać w narzędziach debugowania TikMatrix:

```bash
pm list users
```

Przykładowe wyjście:

```text
Users:
  UserInfo{0:Owner:c13} running
  UserInfo{10:Work profile:1030} running
```

## Przechowywanie pliku konfiguracyjnego

Konfiguracje profilu roboczego są automatycznie zapisywane do pliku `data/work_profile_user.json` w następującym formacie:

```json
{
  "device_serial_1": "10",
  "device_serial_2": "0",
  "device_serial_3": "11"
}
```

## Zarządzanie konfiguracjami urządzeń

### Wyświetl bieżącą konfigurację

Konfiguracja profilu roboczego każdego urządzenia jest niezależna. Możesz:

1. Ustawić różne ID użytkowników dla każdego urządzenia
2. Modyfikować istniejące konfiguracje użytkowników urządzeń w dowolnym momencie
3. Wyczyścić konfigurację (wprowadź pustą wartość i zapisz, aby usunąć konfigurację)

### Zarządzanie wsadowe

Jeśli musisz zarządzać dużą liczbą urządzeń, możesz bezpośrednio edytować plik `data/work_profile_user.json`:

1. Zamknij aplikację TikMatrix
2. Otwórz plik konfiguracyjny
3. Dodaj lub zmodyfikuj konfiguracje urządzeń w formacie JSON
4. Uruchom ponownie TikMatrix

## Rozwiązywanie problemów

### Typowe problemy

#### P: Polecenia nie działają po ustawieniu profilu roboczego

O: Proszę potwierdzić:

- Czy ID użytkownika jest prawidłowy
- Czy odpowiedni użytkownik istnieje na urządzeniu
- Czy masz wystarczające uprawnienia, aby uzyskać dostęp do tego użytkownika

#### P: Jak anulować konfigurację profilu roboczego

O: Wyczyść pole wprowadzania ID użytkownika w oknie dialogowym konfiguracji i kliknij zapisz.

#### P: Co zrobić, jeśli konfiguracja zostanie utracona

O: Konfiguracje są przechowywane w lokalnym pliku JSON. Jeśli zostaną utracone, możesz ponownie skonfigurować lub przywrócić plik `data/work_profile_user.json` z kopii zapasowej.

#### P: Problemy związane z Shelter

O: Jeśli napotkasz problemy z Shelter:

- **Klonowanie się nie udaje**: Upewnij się, że masz uprawnienia administratora i wystarczającą przestrzeń dyskową
- **Sklonowane aplikacje nie są widoczne**: Sprawdź, czy profil roboczy jest prawidłowo aktywowany w Shelter
- **Aplikacje zawiesza się w profilu roboczym**: Spróbuj ponownie sklonować aplikacje lub zaktualizować Shelter
- **Nie można znaleźć sklonowanych aplikacji**: Szukaj aplikacji z ikonami teczki w szufladzie aplikacji

## Najlepsze praktyki

### Środowisko przedsiębiorstwa

1. **Zunifikowane zarządzanie**: Ustaw ten sam ID użytkownika dla wszystkich urządzeń przedsiębiorstwa
2. **Rozdzielenie uprawnień**: Używaj różnych ID użytkowników, aby odróżnić różne poziomy uprawnień
3. **Kopia zapasowa konfiguracji**: Regularnie twórz kopie zapasowe pliku `work_profile_user.json`

### Użytek osobisty

1. **Izolacja aplikacji**: Ustaw różne środowiska użytkowników dla różnych celów
2. **Środowisko testowe**: Używaj niezależnych ID użytkowników do testowania aplikacji
3. **Ochrona prywatności**: Popraw bezpieczeństwo prywatności poprzez separację użytkowników

### Zarządzanie narzędziem Shelter

1. **Regularne aktualizacje**: Aktualizuj aplikację Shelter, aby zapewnić kompatybilność
2. **Synchronizacja aplikacji**: Upewnij się, że zarówno TikTok, jak i TikMatrix są sklonowane przed skonfigurowaniem profilu roboczego
3. **Kopia zapasowa ustawień Shelter**: Eksportuj i twórz kopie zapasowe konfiguracji Shelter dla łatwego odzyskiwania
4. **Monitorowanie aktualizacji aplikacji**: Gdy TikTok lub TikMatrix się aktualizuje, możesz potrzebować również zaktualizować sklonowane wersje

## Szczegóły techniczne

Funkcja profilu roboczego jest implementowana przez dodanie parametru `--user` do poleceń ADB:

```bash
# Bez profilu roboczego
adb shell input tap 100 200

# Z profilem roboczym (ID użytkownika: 10)
adb shell --user 10 input tap 100 200
```

To zapewnia, że polecenia wykonują się w prawidłowym środowisku użytkownika, unikając problemów z uprawnieniami i konfliktami środowiskowymi.

---

Prawidłowo konfigurując profil roboczy, możesz płynnie używać TikMatrix w różnych złożonych środowiskach urządzeń, poprawiając efektywność pracy i wygodę zarządzania.
