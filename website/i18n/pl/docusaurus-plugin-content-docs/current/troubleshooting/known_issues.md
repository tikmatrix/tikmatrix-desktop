---
sidebar_position: 2
---

# Znane problemy

## Błąd konfliktu portów

Jeśli widzisz następujący błąd w dziennikach:

```text
tcp connect error: The connection could not be established because the target computer refused the connection request. (os error 10061)
```

Oznacza to konflikt portów. Aby rozwiązać ten problem:

1. Całkowicie uruchom ponownie aplikację TikMatrix/IgMatrix i spróbuj ponownie.
2. Unikaj jednoczesnego uruchamiania innego oprogramowania do kontroli urządzeń wraz z TikMatrix/IgMatrix, ponieważ mogą one powodować konflikty portów.
3. Upewnij się, że żadna inna aplikacja nie używa tego samego portu komunikacyjnego.

Ten błąd zwykle występuje, gdy wiele aplikacji do kontroli urządzeń działa jednocześnie i konfliktują one o port komunikacyjny.

## Awarie skryptów na Cloud Phone

Zapewnij wystarczającą i stabilną przepustowość sieci między Twoim PC a centrum danych telefonu w chmurze. Dla najlepszych wyników umieść PC i centrum danych telefonu w chmurze w tym samym kraju lub regionie, aby zmniejszyć opóźnienia i utratę pakietów, co pomaga zadaniom automatyzacji działać niezawodnie.

## Niestabilne wykonanie skryptu, losowe błędy, niespójne wyniki

Jest to często związane z jakością połączenia ADB. Jeśli używasz połączenia USB, wypróbuj inny kabel lub port USB. Jeśli używasz bezprzewodowego ADB, upewnij się, że połączenie sieciowe jest stabilne i że siła sygnału między PC a urządzeniem jest dobra.

## Skrypty zepsute przez aktualizacje aplikacji TikTok/Instagram

TikTok i Instagram aktualizują się często i mogą powodować awarie skryptów automatyzacji. Prześlij zgłoszenie do pomocy technicznej, a my zaktualizujemy skrypty, aby dostosować je do najnowszych wersji aplikacji tak szybko, jak to możliwe.
