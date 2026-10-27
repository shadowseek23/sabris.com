# ADR-0002: Oddělené designové varianty se sdíleným obsahem

Datum: 2026-10-27 · Status: Superseded by ADR-0003 v části o veřejných adresách variant

## Kontext

Uživatel požaduje samostatnou variantu spojující Sabris s minimalistickým stylem Clay. Původní web má zůstat dostupný pro srovnání.

## Rozhodnutí

Použít vlastní routy pod `/minimal/`, nested layout a izolovaný CSS Module. Původní stránky přesunout beze změny do route group `(classic)`. Obě varianty sdílejí obsah a média. Bez nových knihoven, samostatného CMS, druhého serveru nebo nové rezervace portů.

## Zamítnuté alternativy

- Globální přepsání stylů by změnilo původní variantu a ztížilo srovnání.
- Duplikovaný projekt a obsah by rychle vytvořily dva rozdílné obsahové stavy.
- Varianta jen pro homepage by při navigaci přepínala zpět do původního designu.

## Důsledky

Každá varianta má vlastní prezentační komponenty. Obsahové opravy služeb a referencí se propisují do obou. Alternativní URL jsou zatím neveřejné pro indexaci.
