# Čitelnost loga Marvinpac

Datum: 2026-10-27 · Stav: dokončeno

## Cíl a kontext

Bílé logo Marvinpac na světlé ploše není čitelné. Použít existující barevné SVG ze zdrojových podkladů na světlých plochách obou variant; bílé logo na tmavých fotografiích zachovat.

## Milníky

1. Odlišit logo na světlém pozadí a použít ho v minimalistickém seznamu, původním carouselu log a detailu reference.
2. Ověřit náhled a povinné kontroly, uložit lokální commit.

## Akceptační kritéria

- Marvinpac na světlém pozadí používá barevný originální SVG.
- Karty na fotografiích zachovají bílé logo, Krásno zůstává barevné.
- Typecheck, formát, lint a build projdou.

## Checklist

- [x] Oprava loga
- [x] Ověření a předání

## Otevřené otázky

Žádné.

Skutečná spotřeba tokenů: přesná metrika není dostupná.

## Validace

- Typecheck, formát, lint a produkční build prošly.
- Edge/Playwright při šířkách 1440 a 390 px: barevné SVG se načetlo na minimalistické homepage, v carouselu původní varianty a na detailu reference. Bílá varianta zůstala na fotografii karty.
- Logo v minimalistickém seznamu vizuálně ověřeno; náhled na portu 5591 obnoven.
