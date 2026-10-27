# Minimalistická varianta

Moderní český web má vlastní navigaci, homepage, všech 15 podstránek a patičku na čistých adresách. Původní varianta je skrytá a zálohovaná; dřívější adresy `/minimal/` přesměrovávají na odpovídající stránky.

## Vizuální směr

Reference [Clay](https://clay.global/) byla prohlédnuta 27. 10. 2026. Převzaté principy: světlé plochy, velká jednoduchá typografie, velkorysé rozestupy, přehledné řádky služeb, výrazné fotografické reference a jemné prostorové akcenty. Obsah a média Clay se nepřebírají.

Typografie alternativy používá systémové Arial/Helvetica bez nové fontové nebo síťové závislosti.

Identitu Sabris drží původní logo, tyrkysová s oranžovou, autentické fotografie provozů a friendly professional přístup. Úvodní prostorový motiv propojených článků je vlastní SVG s gradienty. Fotografie a loga zákazníků jsou stejné jako v původním převodu.

## Oddělení variant

- Root layout obsahuje fonty, metadata a odkaz pro přeskočení navigace.
- Původní routy jsou v `archive/classic/` mimo aktivní routovací strom a celý stav je ve verzi `backup/classic-2026-10-27`.
- `(modern)/layout.tsx` obaluje web samostatným CSS Modulem.
- `(modern)/[[...slug]]/page.tsx` staticky generuje všech 16 čistých adres.
- Sdílená obsahová data jsou v `src/data/content.ts`; nová varianta nemá vlastní kopii referencí nebo služeb.
- Odkazy, canonical i sitemap používají čisté adresy. Dřívější `/minimal/` se přesměruje na stejnou stránku bez prefixu.
- Náhled má nadále `noindex, nofollow`; nastavení pro skutečné nasazení je samostatné rozhodnutí.

## Interakce

Mobilní menu funguje tlačítkem, zavírá se po navigaci a přes Escape. Reference mají přístupný filtr odvětví. Detaily služeb používají nativní rozbalovací sekce. Animovaný prostorový motiv a přechody se při reduced motion vypínají. Vizuální efekty používají CSS bez nových závislostí.

Obsahová omezení a podklady před publikací jsou společné pro obě varianty: [obsahová revize](../content-review.md).

## Ověření

```powershell
$env:AUDIT_OUTPUT = '.tmp/audit-sabris'
node apps/web/scripts/audit.mjs
```

Audit se spouští proti produkčnímu náhledu na portu 5591. Měří přístupnost, geometrii, odkazy a interakce moderní varianty. Mobilní profily emulují Pixel 5 a iPhone 13 v Edge/Chromium; nejde o nativní Safari. Historický audit obou variant zůstává v archivovaném plánu.

Historický běh obou variant 27. 10. 2026 pokryl 68 kombinací stránek/zařízení a 40 odkazů bez nalezených chyb. Šest snímků původní varianty mělo oproti migrační baseline záměrné změny požadované později uživatelem; pixelová shoda se neprohlašuje.

Barevné logo Krásna má v kartách výjimku z bílého filtru; společná komponenta pokrývá homepage i přehled příběhů. Ověřeno na obou variantách při šířkách 1495 a 390 px.
