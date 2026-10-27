# Sabris

Česká Next.js konverze opraveného webu https://web-dev.sabris.com/ ze společné šablony `nextjs-sanity-template`. Zachovává původní identitu, média, ruční cyklický carousel, přepínač řešení a efekty referenčních karet.

## Spuštění

```sh
bun install --frozen-lockfile
bun run dev
```

Web: http://localhost:5590. Produkční náhled: `bun run build` a `bun run start` na http://localhost:5591. Budoucí Studio má rezervovaný port 5593.

## Samostatná minimalistická varianta

Alternativa inspirovaná Clay je na http://localhost:5590/minimal/ (produkční náhled http://localhost:5591/minimal/). Obsahuje vlastní homepage i všech 15 podstránek; původní varianta zůstává na `/`. Obě používají stejné obsahové podklady. [Návrh a ověření](docs/design/minimal-variant.md).

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
