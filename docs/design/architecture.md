# Architektura

Next.js App Router v `apps/web` používá staticky generované stránky a verzovaná data. Homepage a `[...slug]` jsou serverové komponenty. Klientské komponenty zajišťují navigaci, záložky řešení, carousel a filtr referencí.

Projekt vznikl zakládacím skriptem `nextjs-sanity-template` se zachováním Git historie. Bun je jediný package manager, `bun.lock` uzamyká závislosti a cooldown šablony zůstává beze změny. Viz [ADR-0001](../../memory/decisions/ADR-0001-nextjs-template.md).

Původní média jsou lokální s manifestem zdrojů a SHA-256. Open Sans je self-hosted přes `next/font/local`. Fotografie používají `next/image`, vrstvená pozadí CSS.

Archivovaný původní carousel reprodukuje ruční cyklický posun pomocí krajních klonů. Vedlejší snímky jsou inertní, aktivní stav oznamuje aria-live; autoplay je vypnutý.

Sanity Studio je nepřipojený scaffold. Veřejný web nevyžaduje účet, dataset ani token. Zapojení CMS je samostatný navazující krok.

Sitemap a robots jsou nativní. Metadata/canonical používají cílovou doménu www.sabris.com. Staré služby a partneři mají konkrétní přesměrování.

## Design a archiv varianty

Root layout sdílí fonty a metadata. Moderní varianta v route group `(modern)` má vlastní layout, CSS Module a 16 staticky generovaných čistých adres. Dřívější adresy `/minimal/` dočasně přesměrovávají na jejich protějšky. Původní stránky jsou mimo routovací strom v `archive/classic/`; celý původní stav je zálohovaný. Viz [návrh varianty](minimal-variant.md), [rozhodnutí o adresách](../../memory/decisions/ADR-0003-modern-site-root.md) a [obnova](../runbook.md).
