# Minimalistická varianta

Samostatná česká varianta na `/minimal/` má vlastní navigaci, homepage, všech 15 podstránek a patičku. Původní varianta zůstává na původních adresách.

## Vizuální směr

Reference [Clay](https://clay.global/) byla prohlédnuta 27. 10. 2026. Převzaté principy: světlé plochy, velká jednoduchá typografie, velkorysé rozestupy, přehledné řádky služeb, výrazné fotografické reference a jemné prostorové akcenty. Obsah a média Clay se nepřebírají.

Typografie alternativy používá systémové Arial/Helvetica bez nové fontové nebo síťové závislosti.

Identitu Sabris drží původní logo, tyrkysová s oranžovou, autentické fotografie provozů a friendly professional přístup. Úvodní prostorový motiv propojených článků je vlastní SVG s gradienty. Fotografie a loga zákazníků jsou stejné jako v původním převodu.

## Oddělení variant

- Root layout obsahuje fonty, metadata a odkaz pro přeskočení navigace.
- `(classic)/layout.tsx` obaluje původní stránky; přesun nemění jejich adresy ani obsah.
- `minimal/layout.tsx` obaluje alternativu samostatným CSS Modulem.
- `minimal/[[...slug]]/page.tsx` staticky generuje všech 16 alternativních adres.
- Sdílená obsahová data jsou v `src/data/content.ts`; nová varianta nemá vlastní kopii referencí nebo služeb.
- Odkazy uvnitř alternativy směřují do `/minimal/`. Patička umožňuje přejít na původní variantu.
- Alternativa má `noindex, nofollow` a canonical k odpovídající původní adrese. Nezvětšuje produkční sitemapu.

## Interakce

Mobilní menu funguje tlačítkem, zavírá se po navigaci a přes Escape. Reference mají přístupný filtr odvětví. Detaily služeb používají nativní rozbalovací sekce. Animovaný prostorový motiv a přechody se při reduced motion vypínají. Vizuální efekty používají CSS bez nových závislostí.

Obsahová omezení a podklady před publikací jsou společné pro obě varianty: [obsahová revize](../content-review.md).

## Ověření

```powershell
$env:AUDIT_MINIMAL = '1'
$env:AUDIT_OUTPUT = 'memory/tasks/feature/2026-10-27-minimal-variant/verification'
node apps/web/scripts/audit.mjs
```

Audit se spouští proti produkčnímu náhledu na portu 5591. Měří obě varianty, přístupnost, geometrii, odkazy a interakce. Původní homepage a reference porovnává se snímky z dokončené migrace. Mobilní profily emulují Pixel 5 a iPhone 13 v Edge/Chromium; nejde o nativní Safari.

Poslední úplný běh 27. 10. 2026 prošel: 68 kombinací stránek/zařízení, 40 odkazů, bez nalezených chyb. Prošly také typecheck, formát, lint a produkční build. Šest snímků původní varianty má oproti migrační baseline záměrné změny požadované později uživatelem (hlavička, panel služeb, logo Krásna); pixelová shoda se neprohlašuje.

Barevné logo Krásna má v kartách výjimku z bílého filtru; společná komponenta pokrývá homepage i přehled příběhů. Ověřeno na obou variantách při šířkách 1495 a 390 px.
