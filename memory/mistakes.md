# Chyby a prevence

## 2026-10-27 – Zastaralé typy vývojových rout

- Problém: přesun rout nechal v `.next/dev/types` generované validátory starých adres; samotné `next typegen` obnovilo jen `.next/types`. Následně jsem před přečtením výsledku typechecku předčasně spustil formát a lint.
- Náprava: po ověření, že vývojový server neběží, byly odstraněny pouze zastaralé generované `validator.ts` a `routes.d.ts`; všechny kontroly se opakují v povinném pořadí.
- Prevence: při přesunu App Router rout zkontrolovat oddělené typy dev i produkčního buildu a další krok kontroly spustit až po úspěšném dokončení předchozího.

## 2026-10-27 – Hromadná náhrada prefixu URL

- Problém: náhrada `/minimal/` zasáhla i importy `@/components/minimal/`.
- Náprava: importy byly před sestavením obnoveny a všechny zasažené výskyty zkontrolovány.
- Prevence: nahrazovat jen přesně vymezené URL řetězce, ne shodné úseky cest v importech; po hromadné úpravě ověřit diff a typecheck.

## 2026-10-27 – Bílé logo na světlém podkladu

- Problém: logo Marvinpac z carouselu se sdílelo i na světlých plochách, kde bílé provedení zmizelo.
- Náprava: na světlých plochách obou variant se používá barevné SVG ze zdrojových podkladů; na fotografiích zůstává bílá varianta.
- Prevence: při převodu zákaznických log ověřit zdrojové varianty a čitelnost na každé barvě podkladu, včetně detailu reference.

## 2026-10-27 – Bílení barevného loga

- Problém: společný filtr `brightness(0) invert(1)` proměnil barevné logo Krásna v plný bílý ovál.
- Náprava: logo Krásna je v přehledu i carouselu explicitně označené jako barevné a filtr se na něj nepoužije.
- Prevence: před použitím společného filtru na zákaznická loga zkontrolovat, zda asset nemá neprůhledné barevné pozadí uvnitř značky.
- Následná oprava: první zásah pokryl pouze původní variantu a přehlédl vlastní filtr minimalistické karty. Výjimka doplněna do sdílené minimalistické karty; při obdobné opravě vždy vyhledat všechny výskyty assetu a filtrů v obou variantách.

## 2026-10-27 – Věrnost panelu služeb

- Problém: první převod použil pro ilustrace služeb `cover`, vlastní aktivní záložku a odlišné tlačítko. Neodpovídal zdrojovému panelu.
- Náprava: převzaty rozměry a pravidla ze zdrojového CSS: oranžová záložka, ilustrace `contain` vpravo dole, svislý gradient, obrysové tlačítko a přepnutí při hoveru. Logo respektuje zdrojové maximum 40 px a menší šířku 120 px pod 1160 px.
- Prevence: u převodu interaktivních bloků ověřit i computed/source styly a jednotlivé stavy; shoda použitých obrázků sama nestačí.

## 2026-10-27 – Rozsah automatického formátování

- Problém: první běh kořenového formátování zasáhl i převzaté konfigurační soubory a mohl by upravit původní HTML evidence.
- Náprava: konfigurace obnovena z přesných bajtů šablony; původní zrcadlo, instrukce a citlivé konfigurace vyloučeny v .prettierignore.
- Prevence: před prvním format v nově převzaté šabloně zkontrolovat rozsah a vyloučit zdrojové evidence a konfiguraci nástrojů.
