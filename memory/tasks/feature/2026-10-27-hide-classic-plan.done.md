# Skrytí původní varianty a záloha

Datum: 2026-10-27 · Stav: dokončeno

## Cíl

Zachovat obnovitelnou zálohu původní varianty a moderní variantu zpřístupnit přímo na původních adresách bez `/minimal/`. Dřívější adresy minimalistické varianty mají vést na odpovídající čisté adresy.

## Kontext

Klient upřednostňuje minimalistický návrh. Projekt není nasazený; uživatel požádal původní variantu schovat a zazálohovat. Následně upřesnil, že moderní varianta musí mít čisté adresy bez `/minimal/`, a změnil claim na „Odborně. Srozumitelně. Lidsky.“ Obsah, zdrojové kódy a zálohu nesmazat.

## Milníky

1. Vytvořit a ověřit zálohu dosavadního stavu.
2. Archivovat původní routy, přesunout moderní variantu na čisté adresy, přesměrovat `/minimal/` a upravit text, metadata, sitemap a dokumentaci.
3. Ověřit přesměrování, navigaci, build a obnovu; uložit lokální commit.

## Akceptační kritéria

- ZIP záloha obsahuje původní routy, komponenty, obsah i média a projde CRC kontrolou.
- `/` i původní URL zobrazují moderní variantu; staré služby a `/minimal/` vedou na aktuální cíle.
- Odkazy, canonical a sitemap směřují na moderní variantu. `noindex` zůstává zapnutý pro prototyp.
- Typy, formát, lint, build a cílená kontrola všech URL projdou.

## Checklist

- [x] Záloha vytvořena
- [x] Přesměrování a dokumentace
- [x] Ověření a předání

## Otevřené otázky

Žádné.

Skutečná spotřeba tokenů: přesná metrika není dostupná.

## Validace

- ZIP ze stavu `951783dcef021d395d64ebef2ff8552108b06d85` obsahuje 311 položek včetně původních rout, prošel CRC kontrolou a vybraná původní stránka byla úspěšně rozbalena a porovnána. Úplné spuštění obnovené kopie zatím nebylo provedeno. Kontrolní součet a postup obnovy jsou v runbooku.
- Lokální tag `backup/classic-2026-10-27` ukazuje na stejný commit. Původní routy jsou přesunuty do `archive/classic/`.
- Typecheck, formát, lint a produkční build prošly. Finální build generuje 16 čistých adres.
- Audit moderní varianty pokryl 48 kombinací stránek/zařízení a 24 odkazů bez nalezených chyb; zahrnul metadata, přístupnost, filtry, akordeon a mobilní menu. Běh před finální úpravou přesměrování; samotné přesměrování bylo následně po buildu ověřeno zvlášť.
- Všech 16 původních `/minimal/` URL přesměrovává přímo na odpovídající čistou adresu; domovská stránka obsahuje „Odborně. Srozumitelně. Lidsky.“, nemá odkazy s prefixem ani odkaz na původní variantu a neznámá adresa vrací 404.
- Náhled obnoven na http://localhost:5591/. Indexace zůstává vypnutá, nasazení neproběhlo.
