# ADR-0001: Next.js šablona a verzovaný obsah

Datum: 2026-10-27 · Status: Accepted

## Kontext

Uživatel výslovně zvolil Next.js a společnou projektovou šablonu. Zdroj je opravený veřejný web web-dev.sabris.com.

## Rozhodnutí

Použít nextjs-sanity-template, Bun workspaces a Next.js App Router. Sanity scaffold zůstává připravený, ale veřejný web funguje bez účtu, datasetu a tajemství nad verzovanými daty. Nevytvářet vzdálený CMS projekt bez konkrétního organizačního kontextu. Nepřidávat závislosti pro efekty; reprodukovat je v izolovaných React komponentách a CSS.

## Zamítnuté alternativy

- Ruční scaffold odporuje požadavku na template.
- Prostá kopie WordPress HTML by zachovala neplatný obsah a závislost na pluginech.
- Nový vizuální návrh bez předlohy odporuje požadavku na věrnost.

## Důsledky

Obsah lze upravit v kódu a později napojit na Sanity. Produkční nasazení a git push neprobíhají; push je vyhrazen uživateli.
