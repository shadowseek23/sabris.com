# Samostatná minimalistická varianta Sabris

Datum: 2026-10-27 · Stav: dokončeno

## Cíl

Zpřístupnit plnohodnotnou alternativu webu pod /minimal/, která propojuje Sabris s minimalistickým vizuálním přístupem inspirovaným https://clay.global/. Původní URL a design zůstávají dostupné.

## Kontext

Navazuje na dokončenou migraci. Obsah i média pocházejí ze schváleného převodu web-dev.sabris.com; obsahové výjimky z docs/content-review.md platí i zde. Clay slouží jako vizuální reference, jeho obsah a média se nepřebírají.

## Milníky

1. Oddělit vizuální obálky a připravit novou homepage.
2. Doplnit podstránky a funkční navigaci v nové variantě.
3. Ověřit obě varianty, responzivitu, interakce a build; dokumentovat a commitnout.

## Akceptační kritéria

- Původních 16 URL funguje se stejným designem.
- Nových 16 URL pod /minimal/ má společnou vlastní navigaci a patičku.
- Odkazy uvnitř alternativy vedou na alternativní podstránky.
- Zachována obsahová omezení, původní média a identita Sabris.
- Přístupné mobilní menu, filtry, rozbalovací sekce a animace respektující reduced motion.
- Typecheck, format, lint, produkční build a automatický audit projdou.

## Checklist

- [x] Oddělení a homepage — společný root a oddělené layouty, vlastní hero a vizuální systém.
- [x] Podstránky a interakce — 16 URL, navigace, filtry a akordeony; typy i lint prošly.
- [x] Ověření a předání — typecheck, formát, lint, produkční build a audit 68 kombinací stránek/zařízení prošly. Náhled obnoven na portu 5591.

## Otevřené otázky

Žádné blokující. Obsahové podklady z původní migrace zůstávají k potvrzení před publikací. Uživatel schválil aktualizaci AGENTS.md.

## Průběžná validace

Typecheck webu i Studia prošel po regeneraci rout. Lint bez chyb. Při změně stromu layoutů bylo nutné obnovit vlastní běžící dev server; po obnově má alternativa právě jeden header, main a footer.

Uživatel upravil hlavní claim alternativy na přesné znění „Mluvíme Vaším jazykem“. Změna se týká hero nadpisu a metadat homepage; původní varianta zůstává zachována.

Oprava loga Krásna: společná komponenta alternativních karet používá pro barevné logo výjimku z bílého filtru. Týká se homepage i přehledu příběhů. Předchozí oprava pokryla pouze původní variantu, což se projevilo při kontrole uživatelem.

Skutečná spotřeba tokenů: přesná metrika pro práci napříč přerušenými tahy není dostupná.

## Závěrečná validace

- `bun run typecheck`, `bun run format`, `bun run lint`, `bun run build`: prošly.
- Opakovaný audit proti finálnímu produkčnímu sestavení: 68 kombinací stránek a zařízení, 40 interních odkazů, žádné chyby JavaScriptu, přístupnosti, obrázků, struktury, indexace alternativy ani vodorovné přesahy. Interakce carouselu, filtrů, akordeonu a mobilního menu prošly; výsledky v `2026-10-27-minimal-variant/verification/audit.json`.
- Cílená kontrola loga: čtyři URL (`/`, `/pribehy-zakazniku/`, `/minimal/`, `/minimal/pribehy-zakazniku/`) při šířkách 1495 a 390 px. Krásno má filtr `none`, obrázek je načtený, Marvinpac si zachoval bílý filtr. Karta minimalistické varianty vizuálně zkontrolována.
- Šest srovnávacích screenshotů původní varianty se liší od dokončené migrace: uživatel mezitím požadoval změnu velikosti loga hlavičky, věrnější panel řešení a barevné logo Krásna. Shoda screenshotů se proto neprohlašuje; původní baseline se nepřepisuje. Opravy a jejich měření jsou v samostatných bugfix plánech.
- Mobilní audit používá emulaci v Chromium/Edge, nikoli skutečné Safari nebo fyzické telefony.
