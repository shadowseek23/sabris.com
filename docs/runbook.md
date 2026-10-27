# Runbook

Vlastník: správce projektu Sabris. Revize: 2026-10-27.

## Adresy a provoz

Zdroj: https://web-dev.sabris.com/. Nový web není nasazený a původní produkci nemění.
Vývoj http://localhost:5590, produkční náhled http://localhost:5591, budoucí Studio 5593.
Hosting, DNS a produkční přístupy zatím nejsou propojené.
Minimalistická varianta: http://localhost:5590/minimal/ nebo produkční náhled http://localhost:5591/minimal/. Obě varianty sdílejí jeden server.

## Spuštění

Z kořene repozitáře, s nainstalovaným Bun:

```sh
bun install --frozen-lockfile
bun run typecheck
bun run format
bun run lint
bun run build
bun run start
```

Před startem ověřit existující instanci; port neposouvat automaticky. Vývoj spouští `bun run dev`.

Ověření: homepage, menu, šipky carouselu, zákaznické příběhy, kontakt a stažení loga.

## Obsah a přístupy

Obsah v `apps/web/src/data/content.ts`, stránky v `src/app/`, média v `public/media/`. Změna potřebuje nový build. Chybějící podklady eviduje `docs/content-review.md`. Právní text vyžaduje aktualizaci provozovatelem podle skutečného nasazení.

Web používá e-mailové odkazy; sám zprávy neposílá. Newsletter ani analytika nejsou zapojeny. Env proměnné a API tokeny nejsou potřeba. Studio zatím nemá konkrétní projekt/dataset.

## Nasazení a rollback

Nasazení není provedeno. Před publikací schválit redakční podklady a nastavit hosting. Případný Vercel používá root directory `apps/web`. `git push` provádí výhradně uživatel.

Lokální obnovu provést v samostatném checkoutu ověřeného commitu, nainstalovat z lockfilu a vytvořit build. Nepřepisovat neuložené změny. Hostingový rollback doplnit po volbě hostingu.

Git uchovává zdroj, data a původní média. Obsahové zrcadlo je migrační podklad a nenahrazuje zálohu WordPressu. Produkční tokeny neexistují; při budoucím zavedení doplnit rotaci, správce a obnovu.

## Diagnostika

| Symptom                     | Postup                                                           |
| --------------------------- | ---------------------------------------------------------------- |
| Obsazený port               | Použít existující instanci, nezabíjet cizí proces                |
| Chybí obrázek               | Ověřit přesný název a diakritiku v public/media a manifestu      |
| Chybí font                  | Ověřit TTF v src/assets/fonts                                    |
| Bun selže před startem      | Ověřit oprávnění sandboxu; neměnit package manager               |
| Změna není vidět            | Ověřit instanci, obnovit stránku, produkční build vytvořit znovu |
| Studio hlásí chybu projektu | Studio zatím není připojeno a web jej nepotřebuje                |

## Eskalace

Obsah a certifikáty: zadavatel a Libor. Hostingové kontakty, zálohy a skutečný postup rollbacku doplnit při nasazení a ověřit obnovu.

Při změně stromu layoutů obnovit vlastní dev instanci a případně regenerovat routové typy: `bun run --cwd apps/web next typegen`. Nemazat neověřené cesty ani neukončovat cizí proces.
