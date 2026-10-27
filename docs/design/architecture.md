# Architektura

Next.js App Router v `apps/web` používá staticky generované stránky a verzovaná data. Homepage a `[...slug]` jsou serverové komponenty. Klientské komponenty zajišťují navigaci, záložky řešení, carousel a filtr referencí.

Projekt vznikl zakládacím skriptem `nextjs-sanity-template` se zachováním Git historie. Bun je jediný package manager, `bun.lock` uzamyká závislosti a cooldown šablony zůstává beze změny. Viz [ADR-0001](../../memory/decisions/ADR-0001-nextjs-template.md).

Původní média jsou lokální s manifestem zdrojů a SHA-256. Open Sans je self-hosted přes `next/font/local`. Fotografie používají `next/image`, vrstvená pozadí CSS.

Carousel reprodukuje ruční cyklický posun pomocí krajních klonů. Vedlejší snímky jsou inertní, aktivní stav oznamuje aria-live. Přidána klávesnice a dotyk; vypnutý autoplay zůstává vypnutý. Reduced motion omezuje přechody.

Sanity Studio je nepřipojený scaffold. Veřejný web nevyžaduje účet, dataset ani token. Zapojení CMS je samostatný navazující krok.

Sitemap a robots jsou nativní. Metadata/canonical používají cílovou doménu www.sabris.com. Staré služby a partneři mají konkrétní přesměrování.

## Samostatné designové varianty

Root layout sdílí fonty a metadata. Původní stránky jsou beze změny obsahu v route group `(classic)` s vlastním layoutem. Minimalistická alternativa pod `/minimal/` má oddělený layout, CSS Module a 16 staticky generovaných adres. Sdílí obsah i média; vlastní klientské komponenty obsluhují menu a filtr referencí. Viz [návrh varianty](minimal-variant.md) a [ADR-0002](../../memory/decisions/ADR-0002-design-variants.md).
