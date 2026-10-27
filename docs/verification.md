# Ověření konverze Sabris

Datum: 2026-10-27. Zdroj: https://web-dev.sabris.com/.

## Automatické kontroly

- TypeScript: web i Studio scaffold bez chyb.
- Prettier a ESLint: prošly.
- Produkční Next.js build: 16 veřejných stránek, navíc technické routy.
- Audit: 24 kombinací stránky/zařízení, 24 interních odkazů, žádné chyby JS, rozbité obrázky, neplatné interní odkazy nebo vodorovné přetékání.
- Axe WCAG 2 A/AA a WCAG 2.1 AA: žádné automaticky detekované porušení. Nejde o úplný manuální audit shody.
- Screenshoty: dvojice po sobě jdoucích viewportových snímků měly stejný SHA-256; rozměry odpovídají profilům.
- Přesměrování odstraněných služeb, partnerů a druhé reference Košík: HTTP 308 na konkrétní náhradu.

## Interakce

- Přepnutí MES, klávesová šipka na MOM, mobilní odkazy místo přepínače.
- Dva úplné cykly carouselu bez přerušení, posun 500 ms, autoplay vypnutý podle zdroje.
- Carousel log posouvá obsah za 500 ms; na mobilu má aktivní pouze viditelný odkaz.
- Reference: naměřená transformace matrix(1.04,0,0,1.04,0,0), přechod .3s, odstraněný překryv opacity 0.
- Reduced motion: přechod zkrácen na 0.00001s.
- Filtr referencí: Potravinářství → jeden příběh, zrušení → tři příběhy; ověřen detail MP Krásno.
- Mobilní menu: otevření, obsah a zavření ověřeny v aplikaci.

## Prostředí a omezení

Automatické profily: desktop 1440×900, Pixel 5 a iPhone 13 emulované v Chromium/Edge. Nejde o nativní Safari/WebKit. Výsledek potvrzen návštěvou produkčního náhledu v Codex Browser při mobilní šířce 390 px.

Surové výsledky a screenshoty: `../memory/tasks/feature/2026-10-27-nextjs-migration/verification/`. Produkční náhled http://localhost:5591. Hosting není nasazený. Obsah čekající na člověka: [obsahová revize](content-review.md).
