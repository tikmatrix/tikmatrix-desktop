---
sidebar_position: 1
title: Pozycjonowanie i mapa drogowa produktu TikMatrix/IgMatrix
sidebar_label: Mapa drogowa
description: Oficjalna mapa drogowa opisująca pozycjonowanie TikMatrix/IgMatrix, granice możliwości oraz zalecenia wdrożeniowe.
slug: roadmap
---

## Pełna mapa procesu

![Mapa drogowa TikMatrix/IgMatrix](/img/roadmap-en.svg)

---

## Dla kogo tworzymy wartość

- **MŚP / MCN / marki / zespoły eksperymentalne**: potrzebują stabilnego wykonywania codziennych, ale przypominających ludzkie działania operacyjnych na skali 5–100 urządzeń.
- **Zespoły wzrostu i operacji treści**: potrzebują kontrolowalnej orkiestracji wsadowej (ale nie mechanicznej), która równoważy bezpieczeństwo i efektywność.

---

## Kluczowe propozycje wartości (dlaczego wybrać TikMatrix/IgMatrix)

1. **Kompozytowalna automatyzacja wsadowa**: buduj wielokrotnego użytku potoki z modelem "zadanie → skrypt → źródło danych", obejmujące rozgrzewkę, publikowanie, zaangażowanie i zbieranie.
2. **Zachowanie przypominające ludzkie i kontrola ryzyka**: silnik wspiera losowe harmonogramy, kontrolę rytmu, symulację ludzkich gestów i przywracanie po anomaliach, aby przypominać zachowanie prawdziwego użytkownika.
3. **Skalowalność i stabilność**: wspiera hybrydę rzeczywistych urządzeń / urządzeń chmurowych, USB/TCP ADB, umożliwiając liniowe skalowanie od 5→20→50→100 urządzeń z niezawodnym planowaniem.
4. **Obserwowalność**: logi zadań, dublowanie urządzeń, statystyki kont i eksportowalne dane wynikowe.

---

## Mapa możliwości (zakres kroku 4)

### 1) Orkiestracja i planowanie zadań

- Strategie współbieżności wielu kont / wielu urządzeń, losowa kolejność wykonywania
- Ponowna próba przy niepowodzeniu, wznowienie z punktu przerwania, zarządzanie zasobami (zasoby/konta/proxy)

### 2) Centrum skryptów

- **Zaawansowane skrypty marketingowe**: obejmują wzmacnianie użytkowników/postów, masowe DM, komentarze wsadowe
- Skrypty rozgrzewkowe kont: codzienne przeglądanie, przebywanie, lekkie interakcje
- Skrypty publikowania treści: zarządzanie wideo/napisami/tagami/tematami, zaplanowane publikowanie
- Skrypty zbierania danych: pobieranie informacji o użytkownikach i budowanie list kolejnych celów

### 3) Kontrola ludzka i ryzyka

- Randomizacja dotyku/przesuwania/pauzy/czasu wyświetlania
- Wykrywanie anomalii i limity częstotliwości, aby uniknąć nagłego zachowania o wysokiej częstotliwości

> **Deklaracja granic**: TikMatrix/IgMatrix NIE dostarcza urządzeń, kont ani proxy; koncentrujemy się na automatyzacji działań operacyjnych.

---

## Zalecenia wdrożeniowe (od 0 do skali)

1. **Walidacja (1–5 urządzeń)**: podłącz urządzenia → konta → proxy → minimalny zamknięty obieg pojedynczego skryptu
2. **Pilot (10–20 urządzeń)**: wprowadź zaawansowane skrypty marketingowe + pętlę zbierania danych; monitoruj progi ryzyka
3. **Rozszerzenie (20–50 urządzeń)**: grupowe ograniczanie częstotliwości, losowe strategie, rotacja wielu źródeł danych
4. **Skala (50–100 urządzeń)**: planowanie wsadowe, rozłożone wykonanie

---

## Ryzyka i uwagi dotyczące zgodności

- Używanie automatyzacji może naruszać warunki platformy; używaj na własne ryzyko i kontroluj częstotliwość/wzorce zachowań
- Sprzęt urządzenia, proxy, jakość konta i strategia operacyjna znacząco wpływają na stabilność i wyniki

---

## FAQ

**P: Czy TikMatrix dostarcza konta/proxy?**  
O: Nie. Koncentrujemy się na silniku automatyzacji i wykonywaniu skryptów.

**P: Czy dostarczacie telefony chmurowe?**  
O: Nie. Użytkownicy powinni przygotować środowiska urządzeń samodzielnie.

**P: Czy obsługujecie telefony chmurowe?**  
O: Każde urządzenie, które może być stabilnie podłączone przez ADB (USB/TCP), może być zaplanowane.

---

## Wezwanie do działania

- Wypróbuj teraz plan Starter i zbuduj swój minimalny funkcjonalny zamknięty obieg kroku 4
- Przeczytaj dokumentację skryptów, aby rozpocząć operacje wsadowe
