---
sidebar_position: 9
---

# Konfiguracja White Label

:::info Wymagana subskrypcja roczna
Funkcjonalność White Label jest dostępna wyłącznie dla użytkowników **subskrypcji rocznej**. Skontaktuj się z naszym zespołem wsparcia przez [Telegram](https://t.me/tikmatrix_agent_bot), aby uzyskać kod odblokowujący po zakupie planu rocznego.
:::

Funkcja White Label pozwala dostosować branding TikMatrix do tożsamości Twojej firmy. Możesz zmodyfikować nazwę aplikacji, logo i informacje o marce, aby utworzyć spersonalizowaną wersję TikMatrix.

## Funkcje

### Ustawienia podstawowe

- **App Name**: Dostosuj nazwę wyświetlaną aplikacji
- **Logo Upload**: Prześlij niestandardowe główne logo (zalecane 128x128px)
- **Favicon**: Ustaw niestandardową ikonę favicon dla aplikacji

### Ustawienia marki

- **Support Email**: Adres e-mail wsparcia klienta
- **Tutorial URL**: Link do niestandardowego tutorialu/dokumentacji
- **Telegram URL**: Ustaw link do swojej grupy lub kanału Telegram

### Przełączniki funkcji

- **Show Tutorial Link**: Kontroluj widoczność linku do tutoriala
- **Show Brand Info**: Kontroluj wyświetlanie informacji o marce

## Metody konfiguracji

### Metoda 1: Konfiguracja UI

1. Uruchom aplikację TikMatrix
2. Kliknij ikonę palety 🎨 na pasku tytułu
3. Skonfiguruj parametry w oknie dialogowym Ustawień White Label:
   - **App Name**: Wprowadź niestandardową nazwę aplikacji
   - **Main Logo**: Prześlij plik logo (PNG/JPG, zalecane 128x128px)
   - **Support Email**: Wprowadź adres e-mail wsparcia
   - **Tutorial URL**: Wprowadź niestandardowy URL tutoriala
   - **Telegram URL**: Wprowadź URL swojej grupy/kanału Telegram
   - **Feature Toggles**: Włącz/wyłącz linki do tutoriala i wyświetlanie informacji o marce
4. Kliknij "Save", aby zastosować ustawienia

### Metoda 2: Plik konfiguracyjny

1. Skopiuj przykładowy plik konfiguracyjny:

   ```bash
   cp examples/whitelabel-config.json src/config/whitelabel-custom.json
   ```

2. Edytuj plik konfiguracyjny:

   ```json
   {
     "appName": "Your App Name",
     "logo": {
       "main": "/path/to/your/logo.webp",
       "favicon": "/path/to/your/favicon.ico"
     },
     "brand": {
       "supportEmail": "support@yourcompany.com",
       "tutorialUrl": "https://yourcompany.com/docs",
       "telegramUrl": "https://t.me/yourgroup"
     },
     "features": {
       "showTutorialLink": true,
       "showBrandInfo": true
     }
   }
   ```

3. Zapisz plik i uruchom ponownie aplikację

### Metoda 3: Narzędzie wiersza poleceń

1. Przejdź do katalogu projektu:

   ```bash
   cd tikmatrix-desktop
   ```

2. Uruchom narzędzie konfiguracyjne:

   ```bash
   node scripts/whitelabel-config.js
   ```

3. Postępuj zgodnie z monitami, aby skonfigurować każdy parametr krok po kroku

## Budowanie niestandardowej wersji

### 1. Przygotuj pliki zasobów

```bash
# Umieść pliki logo w odpowiednich lokalizacjach
src/assets/your-logo.webp       # Główne logo
public/your-favicon.ico        # Favicon internetowy
src-tauri/icons/               # Ikony aplikacji (różne rozmiary)
```

### 2. Skonfiguruj parametry budowania

Użyj narzędzia wiersza poleceń lub ręcznie edytuj konfigurację:

```bash
# Używając narzędzia wiersza poleceń
node scripts/whitelabel-config.js

# Lub ręcznie edytuj
src/config/whitelabel-build.json
```

### 3. Zbuduj aplikację

```bash
# Tryb deweloperski
npm run dev

# Budowanie produkcyjne
npm run build

# Budowanie aplikacji Tauri
npm run tauri build
```

## Priorytet konfiguracji

System używa następującej kolejności priorytetów dla konfiguracji:

1. **Runtime Config**: LocalStorage przeglądarki `whitelabel_config`
2. **Build Config**: `src/config/whitelabel-build.json` (używany podczas budowania)
3. **Example Config**: `examples/whitelabel-config.json`
4. **Default Config**: Wbudowane wartości domyślne

## Wymagania dotyczące logo

### Główne logo

- **Format**: PNG, JPG lub SVG
- **Rozmiar**: 128x128px (zalecane)
- **Tło**: Przezroczyste (dla PNG)
- **Użycie**: Nagłówek, ekran powitalny, okno dialogowe o programie

### Favicon

- **Format**: ICO lub PNG
- **Rozmiar**: 32x32px lub 16x16px
- **Użycie**: Zakładka przeglądarki, ikona okna

### Ikony aplikacji (dla budów)

- **Formaty**: PNG, ICO, ICNS
- **Rozmiary**: 32x32, 128x128, 256x256, 512x512
- **Lokalizacja**: katalog `src-tauri/icons/`

## Integracja API

### JavaScript API

```javascript
import { 
  getWhiteLabelConfig,
  saveWhiteLabelConfig, 
  resetWhiteLabelConfig,
  validateWhiteLabelConfig 
} from './config/whitelabel.js';

// Pobierz bieżącą konfigurację
const config = getWhiteLabelConfig();

// Zapisz nową konfigurację
saveWhiteLabelConfig(newConfig);

// Resetuj do wartości domyślnych
resetWhiteLabelConfig();

// Zweryfikuj konfigurację
validateWhiteLabelConfig(config);
```

### Funkcje użytkowe

```javascript
import { 
  initWhiteLabel,
  updateDocumentTitle,
  updateFavicon
} from './utils/whitelabel.js';

// Inicjalizuj white label przy starcie aplikacji
initWhiteLabel();

// Zaktualizuj tytuł dokumentu
updateDocumentTitle('Your App Name');

// Zaktualizuj favicon
updateFavicon('/path/to/favicon.ico');
```

## Najlepsze praktyki

### Projektowanie logo

- Używaj obrazów o wysokiej rozdzielczości dla ostrego wyświetlania
- Zachowaj spójny branding we wszystkich rozmiarach logo
- Testuj logo zarówno na jasnym, jak i ciemnym tle
- Upewnij się, że logo są czytelne w małych rozmiarach

### Spójność marki

- Używaj spójnych kolorów i czcionek w całej aplikacji
- Dostosuj się do istniejących wytycznych marki
- Testuj dostosowany interfejs na różnych rozmiarach ekranu
- Zachowaj profesjonalny wygląd

### Konfiguracja URL

- Używaj URL HTTPS dla wszystkich linków zewnętrznych
- Testuj wszystkie linki przed wdrożeniem
- Upewnij się, że kanały wsparcia są prawidłowo monitorowane
- Aktualizuj URL dokumentacji na bieżąco

## Rozwiązywanie problemów

### Typowe problemy

**Logo się nie wyświetla:**

- Sprawdź ścieżkę do pliku i uprawnienia
- Zweryfikuj, czy format obrazu jest obsługiwany
- Upewnij się, że rozmiar obrazu jest odpowiedni
- Wyczyść pamięć podręczną przeglądarki i uruchom ponownie aplikację

**Konfiguracja się nie zapisuje:**

- Sprawdź uprawnienia systemu plików
- Zweryfikuj, czy składnia JSON jest poprawna
- Upewnij się, że katalog konfiguracyjny istnieje
- Spróbuj uruchomić jako administrator (jeśli to konieczne)

**Budowanie się nie udaje:**

- Zweryfikuj, czy wszystkie pliki zasobów istnieją
- Sprawdź składnię pliku konfiguracyjnego
- Upewnij się, że pliki ikon są w poprawnym formacie
- Przejrzyj dzienniki budowania pod kątem konkretnych błędów

### Uzyskiwanie pomocy

Jeśli napotkasz problemy z konfiguracją White Label:

1. Sprawdź sekcję rozwiązywania problemów powyżej
2. Przejrzyj składnię pliku konfiguracyjnego
3. Skontaktuj się z pomocą techniczną przez [Telegram](https://t.me/tikmatrix_agent_bot)
4. Dołącz plik konfiguracyjny i komunikaty o błędach podczas zgłaszania problemów

## Licencja i użytkowanie

- Funkcjonalność White Label jest dostępna tylko dla użytkowników subskrypcji rocznej
- Prawa do niestandardowego brandingu są zawarte w Twojej subskrypcji
- Redystrybucja dostosowanych wersji może wymagać dodatkowego licencjonowania
- Skontaktuj się z pomocą techniczną w sprawie opcji licencjonowania dla przedsiębiorstw

---

**Potrzebujesz kodu odblokowującego?** Skontaktuj się z naszym zespołem wsparcia przez [Telegram](https://t.me/tikmatrix_agent_bot) ze szczegółami swojej subskrypcji rocznej.
