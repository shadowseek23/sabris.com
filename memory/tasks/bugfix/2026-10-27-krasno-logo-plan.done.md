# Logo Krásna v příbězích zákazníků

Datum: 2026-10-27 · Stav: dokončeno

## Cíl

Zobrazit čitelný nápis Krásno a původní barvy značky na kartě příběhu a v carouselu.

## Kontext

Barevné PNG obsahuje neprůhlednou červenou plochu. Společný bílý filtr z něj vytvořil jednolitý ovál. Detail příběhu filtr nepoužívá.

## Milníky

1. Označit barevné logo Krásna a vyjmout ho z bílého filtru v obou komponentách.
2. Ověřit kvalitu kódu, sestavení a vykreslený filtr na desktopu a mobilu.

## Akceptační kritéria

- Krásno má filtr `none` v kartě i carouselu.
- Ostatní loga si zachovají své styly; minimalistická varianta se nemění.
- Typecheck, formát, lint a build projdou, náhled je aktualizovaný.

## Checklist

- [x] Oprava filtru
- [x] Kontroly a aktualizace náhledu

## Otevřené otázky

Žádné.

Skutečná spotřeba tokenů: nástroj pro přesné měření není dostupný.

## Validace

- Typecheck webu i Studia, formát, lint a produkční build prošly.
- Edge/Playwright při šířkách 1495 a 390 px: Krásno má v přehledu i carouselu filtr `none`, obrázek je načtený. Logo Marvinpac si zachovalo bílý filtr.
- Vizuálně zkontrolována výsledná karta. Náhled na http://localhost:5591/ obnoven.
- Detail příběhu používá stejné barevné PNG bez filtru již před opravou. Minimalistické komponenty ani jejich styly se neměnily.
