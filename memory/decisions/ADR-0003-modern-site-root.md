# ADR-0003: Moderní varianta na původních adresách

Datum: 2026-10-27 · Status: Accepted · Nahrazuje ADR-0002 v části o veřejných adresách variant.

## Kontext

Klient upřednostňuje moderní variantu. Uživatel požádal původní variantu schovat a zazálohovat a moderní web připravit na čistých adresách bez `/minimal/`.

## Rozhodnutí

Moderní route group `(modern)` obsluhuje dosavadní čisté adresy. Původní routy jsou mimo routovací strom v `archive/classic/`; kompletní předchozí stav je v ZIP záloze a lokálním Git tagu. Dřívější `/minimal/` se dočasně přesměruje na stejnou čistou adresu. Náhled si ponechává `noindex`.

## Zamítnuté alternativy

- Ponechat moderní variantu na `/minimal/` by neodpovídalo upřesnění uživatele.
- Smazat původní implementaci by ztížilo její případnou obnovu.

## Důsledky

Odkazy, canonical a sitemap používají čisté adresy. Obnova původního webu je dokumentována v runbooku. ZIP a tag jsou lokální a samy o sobě nejsou zálohou na jiném úložišti.
