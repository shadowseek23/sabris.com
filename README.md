# Sabris

Český Next.js web Sabris podle opraveného zdroje https://web-dev.sabris.com/, vytvořený ze společné šablony `nextjs-sanity-template`. Aktuální varianta propojuje identitu Sabris s minimalistickým designem.

## Spuštění

```sh
bun install --frozen-lockfile
bun run dev
```

Web: http://localhost:5590. Produkční náhled: `bun run build` a `bun run start` na http://localhost:5591. Budoucí Studio má rezervovaný port 5593.

## Moderní varianta a záloha

Moderní varianta inspirovaná Clay je na http://localhost:5590/ (produkční náhled http://localhost:5591/). Obsahuje homepage a 15 podstránek na čistých adresách; předchozí adresy s `/minimal/` se přesměrovávají. Původní varianta je skrytá a zálohovaná. [Návrh a ověření](docs/design/minimal-variant.md) · [Obnova zálohy](docs/runbook.md).

## Kontroly

```sh
bun run typecheck
bun run format
bun run lint
bun run build
```

Obsah: `apps/web/src/data/`, média: `apps/web/public/media/`. Web nepotřebuje env ani CMS. Sanity scaffold zatím není připojený.

[Obsah k doplnění](docs/content-review.md) · [Požadavky](docs/requirements/main.md) · [Architektura](docs/design/architecture.md) · [Runbook](docs/runbook.md).

Projekt není nasazený. `git push` provádí výhradně uživatel.
