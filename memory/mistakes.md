# Chyby a prevence

## 2026-10-27 – Bílení barevného loga

- Problém: společný filtr `brightness(0) invert(1)` proměnil barevné logo Krásna v plný bílý ovál.
- Náprava: logo Krásna je v přehledu i carouselu explicitně označené jako barevné a filtr se na něj nepoužije.
- Prevence: před použitím společného filtru na zákaznická loga zkontrolovat, zda asset nemá neprůhledné barevné pozadí uvnitř značky.

## 2026-10-27 – Věrnost panelu služeb

- Problém: první převod použil pro ilustrace služeb `cover`, vlastní aktivní záložku a odlišné tlačítko. Neodpovídal zdrojovému panelu.
- Náprava: převzaty rozměry a pravidla ze zdrojového CSS: oranžová záložka, ilustrace `contain` vpravo dole, svislý gradient, obrysové tlačítko a přepnutí při hoveru. Logo respektuje zdrojové maximum 40 px a menší šířku 120 px pod 1160 px.
- Prevence: u převodu interaktivních bloků ověřit i computed/source styly a jednotlivé stavy; shoda použitých obrázků sama nestačí.

## 2026-10-27 – Rozsah automatického formátování

- Problém: první běh kořenového formátování zasáhl i převzaté konfigurační soubory a mohl by upravit původní HTML evidence.
- Náprava: konfigurace obnovena z přesných bajtů šablony; původní zrcadlo, instrukce a citlivé konfigurace vyloučeny v .prettierignore.
- Prevence: před prvním format v nově převzaté šabloně zkontrolovat rozsah a vyloučit zdrojové evidence a konfiguraci nástrojů.
