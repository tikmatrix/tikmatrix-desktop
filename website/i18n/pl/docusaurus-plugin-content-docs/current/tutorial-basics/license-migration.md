---
sidebar_position: 9
---

# Migracja licencji

Przenieś licencję TikMatrix z jednego komputera na drugi. Jest to przydatne podczas aktualizacji sprzętu lub zmiany komputerów.

## Wymagania

- Aktywna licencja na bieżącym komputerze (kod aktywacyjny lub subskrypcja Stripe)
- Komputer docelowy bez istniejącej licencji TikMatrix
- Dozwolone maksymalnie 5 migracji miesięcznie

## Kroki migracji

### Krok 1: Otwórz okno dialogowe migracji

1. Uruchom TikMatrix na swoim bieżącym komputerze
2. Kliknij **ikonę licencji** na pasku tytułu
3. Kliknij przycisk **"Migrate License"**

![Przycisk migracji licencji](../img/migrate-button.webp)

### Krok 2: Pobierz ID maszyny docelowej

Na komputerze docelowym:

1. Zainstaluj i uruchom TikMatrix
2. Kliknij **ikonę licencji** na pasku tytułu
3. Skopiuj **Machine ID**
4. Wyślij ten ID na swój bieżący komputer

![ID maszyny docelowej](../img/target-machine-id.webp)

### Krok 3: Zweryfikuj i migruj

Z powrotem na bieżącym komputerze:

1. Wklej **Target Machine ID** w oknie dialogowym migracji
2. Kliknij **"Validate"**, aby sprawdzić kompatybilność
3. Przejrzyj wyświetlone szczegóły licencji

![Pomyślna walidacja](../img/validation-success.webp)

1. Zaznacz pole potwierdzenia
2. Kliknij **"Migrate License"** i potwierdź

![Potwierdzenie migracji](../img/migration-confirm.webp)

### Krok 4: Zakończ konfigurację

1. Poczekaj na zakończenie migracji
2. Na komputerze docelowym uruchom ponownie TikMatrix
3. Twoja licencja jest teraz aktywna na nowym komputerze

![Pomyślna migracja](../img/migration-success.webp)

## Ważne ostrzeżenia

⚠️ **Migracja licencji nie może być cofnięta**

- Licencja przenosi się całkowicie ze źródła do celu
- Twój stary komputer traci dostęp natychmiast
- Maksymalnie 5 migracji miesięcznie
- Oba komputery potrzebują stabilnego internetu

## Co jest migrowane

### Dla kodów aktywacyjnych

- Status licencji i pozostałe dni
- Informacje o kodzie licencji

### Dla subskrypcji Stripe

- Status subskrypcji i informacje rozliczeniowe
- Daty odnowienia i szczegóły planu

## Rozwiązywanie problemów

### Typowe komunikaty o błędach

#### "Target machine already has a license"

Komputer docelowy ma już aktywną licencję. Migracja działa tylko na komputery bez istniejących licencji.

#### "Monthly migration limit exceeded"

Możesz migrować tylko 5 razy miesięcznie. Poczekaj do następnego miesiąca lub skontaktuj się z pomocą techniczną.

#### "Invalid machine ID format"

Upewnij się, że skopiowałeś kompletny Machine ID poprawnie. Powinien mieć co najmniej 10 znaków.

#### "Migration validation failed"

Sprawdź, czy:

- Twoja bieżąca licencja jest aktywna i nie wygasła
- ID maszyny docelowej jest poprawny
- Oba komputery mają dostęp do internetu

### Uzyskiwanie pomocy

Skontaktuj się z [pomocą techniczną Telegram](https://t.me/tikmatrix_agent_bot) z:

- Zrzutami ekranu komunikatów o błędach
- Twoimi bieżącymi i docelowymi ID maszyn
- Opisem problemu

## FAQ

**Czy mogę migrować z powrotem na mój oryginalny komputer?**

Tak, ale liczy się jako kolejna migracja do Twojego miesięcznego limitu.

**Co dzieje się z moimi połączeniami urządzeń?**

Połączenia urządzeń są powiązane z komputerem. Będziesz musiał ponownie podłączyć urządzenia na nowym komputerze.

**Czy mogę migrować licencję próbną?**

Nie, tylko płatne licencje mogą być migrowane.

**Czy migracja wpływa na pozostałe dni licencji?**

Nie, Twoje pozostałe dni pozostają takie same po migracji.
