# Převod Sabris do Next.js

Datum: 2026-10-27 · Stav: dokončeno

## Cíl

Věrný, modernizovaný český web na Next.js podle https://web-dev.sabris.com/ se zadanými obsahovými změnami. Zachovat identitu, slidery, carousely a efekty karet.

## Kontext

Produkční sabris.com není zdroj pravdy. Uživatel opravil zdroj na web-dev.sabris.com. Prázdný workspace byl založen skriptem nextjs-sanity-template se zachováním historie; pouze kontrola neexistence cíle byla přizpůsobena již otevřené prázdné složce.

## Milníky

1. Obsahové zrcadlo a evidence interakcí zdroje.
2. Funkční web ze sdílené šablony, lokální média, aktualizovaný obsah.
3. Ověření rout, obsahu, interakcí, mobilu a produkčního buildu.

## Akceptační kritéria

- Zdrojem je výhradně opravený web; původní URL jsou zachovány nebo přesměrovány.
- Nabídka se soustředí na Smart potravinářství, MES a MOM.
- Reference obsahují pouze Krásno, Marvinpac a případně Košík.
- Odstraněny neplatné služby, partnerství, akce a zastaralé materiály.
- Slider lze ovládat tlačítky, klávesnicí i dotykem; autoplay je podle ověřené předlohy vypnutý, přechody respektují reduced motion.
- Projdou typecheck, formát, lint, funkční kontroly a produkční build.

## Checklist

- [x] Obsahové zrcadlo a interakce — 15 zdrojových stránek; rozsah a výjimky v manifestu.
- [x] Implementace a aktualizovaný obsah — 16 veřejných stránek, 46 původních médií.
- [x] Ověření a předání — typecheck, format, lint, build a audit bez chyb; viz docs/verification.md.

## Otevřené otázky

Libor dodá nové reference. Potřeba potvrdit aktuální benefity a dodat fotografie, rozsah ISO 27001, SAP certifikace a rozhodnout Emont. Neověřené závazky se nepublikují jako fakta. Sanity projekt nebyl zadán; web nejprve používá verzovaný obsah bez vzdálené služby.

## Průběžné ověření

Typecheck, lint a produkční build prošly. Audit 24 kombinací URL/zařízení ověřil všechny interní odkazy a přesměrování, bez rozbitých obrázků, chyb JS a overflow. Opraven kontrast čtyř sdílených popisků; finální opakování bez nálezů. Ověřeny dva úplné cykly carouselu, přesné hover hodnoty a reduced motion. Ověřena klávesová volba řešení, šipky carouselu, filtr referencí a mobilní menu.

Skutečná spotřeba tokenů: v tomto prostředí není dostupná spolehlivá metrika jednotlivé konverzace; číslo není odhadováno.
