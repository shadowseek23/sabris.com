# Proporce hlavičky a panel řešení původní varianty

Datum: 2026-10-27 · Stav: dokončeno

## Cíl

Zmenšit logo na rozměry zdrojového webu a obnovit vzhled i přepínání panelu služeb podle dodaného screenshotu. Zachovat aktuální nabídku Smart potravinářství, MES a MOM.

## Kontext

Zdroj: https://web-dev.sabris.com/, jeho veřejné CSS a screenshot uživatele. Předchozí převod použil cover ilustrace a jiný styl aktivní záložky. Minimalistická varianta má vlastní komponenty a styly.

## Milníky

1. Převzít proporce loga a strukturu panelu ze zdrojových stylů.
2. Ověřit typy, formát, lint, produkční build a zpřístupnit aktualizovaný náhled.

## Akceptační kritéria

- Logo v původní hlavičce má nejvýše 40 px na výšku, pod 1160 px šířku 120 px.
- Panel má oranžovou aktivní záložku, ilustraci contain vpravo dole, tmavý gradient, orámované tlačítko a přepnutí při hoveru i klávesnici.
- Minimalistická varianta se nemění.

## Checklist

- [x] Proporce a interakce
- [x] Kontroly a aktualizovaný náhled

## Otevřené otázky

Žádné. Staré služby ze screenshotu se nevracejí.

Skutečná spotřeba tokenů: nástroj pro měření této části konverzace není dostupný; údaj se neodhaduje.

## Validace

- `bun run typecheck`, `bun run format`, `bun run lint`, `bun run build`: prošly.
- Cílené měření Edge/Playwright proti produkčnímu náhledu: viewport 1495 × 1000, logo 154 × 40 px, panel 1400 × 489 px, levé menu 380 px, aktivní záložka rgb(251, 170, 54), ilustrace `contain`.
- Přepnutí na MES hoverem a následně na MOM klávesou ArrowDown: prošlo.
- Viewport 390 × 844: logo 120 px, desktopový panel skryt, bez vodorovného přesahu. Desktop také bez přesahu.
- `/minimal/` odpovídá a má claim „Mluvíme Vaším jazykem“. Jeho komponenty a CSS Module se touto opravou neměnily.
- Vizuálně zkontrolován [výsledný panel](2026-10-27-classic-header-solutions/verification/panel.png). Zdrojové screenshoty původní migrace se nepřepisovaly.
- Náhled znovu spuštěn na http://localhost:5591/.
