Obecný, nástrojově nezávislý zdroj instrukcí pro jakéhokoli AI coding agenta v tomto
repozitáři (Claude Code, Codex, Cursor, Copilot a další). Pokud tvůj nástroj čte i vlastní
soubor (např. `CLAUDE.md`), považuj tento dokument za nadřazený zdroj pravdy.

<!--
  Tenhle repozitář vznikl z šablony `nextjs-sanity-template`, která je potomkem
  `project-template` (viz `.template-version`). Invariantní části (Stack, Postup práce,
  Konvence, Jazyk, footer) drž shodné se šablonou, ať jdou opravy backportovat.
  Projektově specifické části (Projektový kontext, Tři věci, Zakázáno) vyplň podle TODO.
-->

## Projektový kontext

Sabris — český prezentační web na Next.js. Moderní varianta běží na `/` a původních adresách; starší `/minimal/` se přesměrovává. Původní varianta je skrytá, její routy jsou v `archive/classic/` a obnovitelný stav je v lokálním tagu `backup/classic-2026-10-27`. Obsah je verzovaný v kódu; Sanity Studio je připravený scaffold bez připojeného projektu.

**Stav: lokální funkční web; produkční nasazení neproběhlo.**

## Než začneš

1. Přečti si tento dokument.
2. Zdroj pravdy je https://web-dev.sabris.com/, nikoli produkční sabris.com. Obsahová omezení a chybějící podklady: `docs/content-review.md`.
3. Přečti si aktivní plán v [`memory/tasks/`](memory/tasks/).
4. Veřejný web nepotřebuje Sanity účet ani env. Nový CMS projekt zakládej až při konkrétním zadání připojení CMS.
5. Když si dokumentace nebo kód odporují, **ohlas to a nezačínej** — rozpor je vada
   zadání a rozhodnutí patří uživateli, ne odhadu.

## Tři věci, které musíš vědět předem

- Moderní varianta má čisté URL; původní varianta je archivovaná a nesmí se bez zadání znovu zpřístupnit.
- Nevracej neplatné služby, OpenText/Microsoft, staré fotografie zaměstnanců ani neověřené benefity.
- Původní carousely mají autoplay vypnutý, 500ms posun a cyklický návrat. Zdrojové podklady jsou u dokončeného migračního plánu.

## Stack

Bun workspaces monorepo:

```
apps/
├── web/      # Next.js 16 App Router (React 19) — veřejný web
└── studio/   # Sanity Studio (CMS)
```

Kořenový `package.json` deklaruje jen `workspaces: ["apps/*"]` a proxy skripty
(`dev`, `build`, `start`, `lint`, `typecheck`) přes `bun run --cwd apps/web <skript>`.
`studio` skript spouští Sanity Studio.

**`apps/web`:**

- Next.js 16 App Router, React 19, Turbopack
- Tailwind CSS 4 přes `@theme` blok v `src/app/globals.css` (žádný `tailwind.config.js`)
- shadcn/ui (styl `new-york`) nad Radix primitivy v `src/components/ui/`
- `next-sanity` pro čtení obsahu, `@sanity/image-url` pro obrázky ze Sanity CDN
- react-hook-form + zod na formuláře (přidej podle potřeby)
- **bun** jako package manager — instalaci a závislosti přes `bun`, skripty přes
  `bun run` a jednorázové binárky přes `bunx`; nepoužívej `npm`, `npx` ani `yarn`

**Struktura `apps/web/src/`:** `app/` (routy), `components/site/` (specifické komponenty),
`components/ui/` (shadcn primitiva), `data/` (statická data), `lib/`, `hooks/`,
`sanity/` (klient, GROQ dotazy), `assets/` (obrázky importované komponentami).

**Obrázky** drž jako reálné binárky v gitu (`apps/web/src/assets/` nebo `public/`),
nebo obsah řízený Sanity přes jeho CDN (`@sanity/image-url`). Responzivní `sizes`/srcset
lad empiricky — skill `empirical-srcset`.

## Deployment

Hosting zatím není propojený. Případný Vercel používá **root directory `apps/web`**. Provozní postupy — deploy, rollback,
zálohy, env, diagnostika — v [`docs/runbook.md`](docs/runbook.md).

## Postup práce

Z promptu vyčti, jestli jde o novou práci, opravu nebo revizi, a založ plán do
`memory/tasks/{feature,bugfix,revision}/`. Kdy plán zakládat a kdy ne: skill
`implementation-plan`.

Features implementuj test-first tam, kde je co testovat (datové transformace, mapování
obsahu, GROQ). U prezentačního markupu testy nevynucuj.

Když uděláš chybu, zapiš ji do `memory/mistakes.md` — co se stalo, jak jsi to napravil,
**a jak jí příště předejít**.

Práci rozděluj do malých atomických Conventional Commitů. Atomický commit obsahuje
jednu samostatně ověřitelnou a vratnou změnu; její test, dokumentace, konfigurace nebo
lockfile do něj patří jen tehdy, když jsou pro tutéž změnu nutné. Nesouvisející refactor,
formátování či vedlejší opravy patří do jiného commitu.

Po ověření každého takového kroku commit vytvoř hned, bez čekání na další potvrzení,
pokud uživatel výslovně neřekl necommitovat. Ve sdíleném working tree před stagingem
založ `.commit-lock`, drž jej po celou dobu `git add` a `git commit` a vždy jej odstraň
i při selhání; přesný postup, staging a formát zprávy určuje skill `conventional-commits`.

Průběžné commity nevypisuj. V závěrečném předání stručně uveď, co se změnilo, jaké
kontroly proběhly a které commity (SHA + subject) práci obsahují.

## Povinné příkazy po každé změně

Spouštěj z kořene repa, v tomto pořadí. Podrobnosti: skill `quality-gate`.

```bash
bun run typecheck    # tsc --noEmit v apps/web (a apps/studio)
bun run format       # prettier --write .
bun run lint         # eslint v apps/web
# test — doplň, jakmile vzniknou (datové transformace, mapování obsahu, GROQ)
```

Při selhání oprav příčinu, ne symptom. Nekomituj s červeným typecheckem ani lintem.

## Konvence

Struktura a workflow se řídí sdílenými skilly v `~/.claude/skills` (zrcadlené do
`~/.agents/skills` pro Codex). Přečti si relevantní skill, místo abys konvence odvozoval:

| Téma | Skill |
|---|---|
| Kam který soubor patří (`docs/` vs `memory/`) | `project-structure` |
| Plány, ADR, handoffy | `project-memory`, `implementation-plan` |
| Formát commitů (Zadání/Řešení, česky) | `conventional-commits` |
| Psaní a údržba tohoto souboru | `agent-instructions` |
| Kdy otevřít prohlížeč a kdy se zeptat | `browser-verification` |
| Povinné kontroly po změně kódu | `quality-gate` |
| Sanity schémata, GROQ, TypeGen | `sanity-best-practices`, `nextjs-sanity` |
| Responzivní obrázky | `empirical-srcset` |
| Provozní runbook | `runbook` |
<!-- TODO: přidej skilly specifické pro tento projekt (např. `sanity-migration` u převodu z WordPressu). -->

- **Univerzální rešerše** (Next.js, Vercel, SEO, agentní workflow) jsou v `$RESEARCH/`.
  Přečti si relevantní soubor, když téma řešíš — nekopíruj je sem.
  `memory/research/` je jen pro věci specifické pro tenhle projekt.
- **Operační procedury:** `docs/runbook.md`. Aktualizuj ho ve stejném commitu, kdykoli
  se změní deploy, env proměnné nebo tok obsahu.
- Scratch soubory do `.tmp/`.

## Jazyk

Dokumentace, plány a commity **česky**. Kód, názvy souborů a identifikátory anglicky.
<!-- TODO: pokud je obsah/produkt v jiném jazyce, dopiš pravidlo (např. „obsah webu je
     anglický — nepřekládej ho"). -->

## Zakázáno

- Zavádět závislosti bez zápisu do `memory/decisions/` jako ADR.
- Obcházet supply-chain guard v `bunfig.toml` (`minimumReleaseAgeExcludes`) bez souhlasu uživatele.
- `git push` provádí výhradně uživatel. Do původního webu nezapisuj.

Než začneš měnit tento soubor, vyžádej si od uživatele explicitní souhlas.

