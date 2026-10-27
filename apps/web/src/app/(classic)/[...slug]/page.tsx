import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  Download,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { services, stories, media } from "@/data/content";
import { privacyParagraphs } from "@/data/privacy";
import { ButtonLink, ContactBand, PageHero, Partners } from "@/components/site/shared";
import { ReferenceGrid } from "@/components/site/reference-grid";

const pages: Record<string, { title: string; subtitle: string }> = {
  "reseni-a-sluzby": {
    title: "Řešení a služby",
    subtitle: "Výroba, která má přehled. Technologie, které dávají smysl.",
  },
  "pribehy-zakazniku": {
    title: "Příběhy zákazníků",
    subtitle: "Skutečné výzvy. Navržená řešení. Zkušenosti našich zákazníků.",
  },
  "o-sabris/o-nas": {
    title: "O nás",
    subtitle: "Jsme IT firma s friendly professional přístupem.",
  },
  "pridej-se-k-nam": {
    title: "Přidej se k nám",
    subtitle:
      "Pokud jsi otevřená hlava a máš chuť být součástí smysluplných projektů, rádi tě poznáme.",
  },
  kontakt: {
    title: "Kontakt",
    subtitle: "Navštivte nás osobně nebo se ozvěte. Rádi přijedeme za vámi.",
  },
  "o-sabris/media": { title: "Média", subtitle: "Loga Sabris ke stažení a kontakt pro novináře." },
  "o-sabris/certifikaty": {
    title: "Certifikáty",
    subtitle: "Bezpečnost informací a kvalita dodávek.",
  },
  "o-sabris/oceneni": { title: "Ocenění", subtitle: "Zkušenosti, které stojí za našimi projekty." },
  "zasady-ochrany-osobnich-udaju": {
    title: "Zásady ochrany osobních údajů",
    subtitle: "Informace o zpracování osobních údajů ve skupině Sabris.",
  },
};
const routePaths = [
  ...Object.keys(pages),
  ...services.map((s) => `reseni-a-sluzby/${s.slug}`),
  ...stories.map((s) => `reference/${s.slug}`),
];
export function generateStaticParams() {
  return routePaths.map((path) => ({ slug: path.split("/") }));
}
export const dynamicParams = false;
type Props = { params: Promise<{ slug: string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = (await params).slug.join("/");
  const service = services.find((s) => path === `reseni-a-sluzby/${s.slug}`);
  const story = stories.find((s) => path === `reference/${s.slug}`);
  const entry = pages[path];
  return {
    title: service?.label ?? story?.name ?? entry?.title ?? "Stránka nenalezena",
    description: service?.subtitle ?? story?.subtitle ?? entry?.subtitle,
    alternates: { canonical: `/${path}/` },
  };
}
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={21} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ContentPage({ params }: Props) {
  const path = (await params).slug.join("/");
  const service = services.find((s) => path === `reseni-a-sluzby/${s.slug}`);
  if (service)
    return (
      <>
        <PageHero title={service.label} subtitle={service.subtitle} />
        <section className="container service-intro">
          <Image
            src={media(
              service.slug === "smart-potravinarstvi" ? "smart-1280x758.png" : service.image,
            )}
            alt={service.label}
            width={640}
            height={400}
            sizes="(max-width:767px) 90vw, 50vw"
          />
          <div>
            <span className="eyebrow">Řízení, optimalizace a automatizace procesů</span>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
            <ButtonLink href="/kontakt/">Proberme vaše potřeby</ButtonLink>
          </div>
        </section>
        <section className="soft-section">
          <div className="container two-columns">
            <div>
              <h2>Současné výzvy</h2>
              <BulletList items={service.challenges} />
            </div>
            <div>
              <h2>Hlavní přínosy</h2>
              <BulletList items={service.benefits} />
            </div>
          </div>
        </section>
        {service.slug === "smart-potravinarstvi" ? (
          <>
            <Partners />
            <section className="container related-story">
              <h2>Jak to funguje v praxi</h2>
              <h3>MP Krásno: výroba, finance a logistika v jednom systému</h3>
              <p>
                Oborové řešení S2AP for Food propojuje klíčové procesy a pomáhá určit nákladovou
                cenu každého výrobku.
              </p>
              <ButtonLink href="/reference/mp-krasno/">Příběh MP Krásno</ButtonLink>
            </section>
          </>
        ) : (
          <section className="container related-story">
            <h2>Součást propojené výroby</h2>
            <p>
              MES, MOM a oborové řešení navrhujeme v souvislostech vašeho provozu. Začneme společným
              pojmenováním potřeb a rozsahu.
            </p>
            <ButtonLink href="/reseni-a-sluzby/smart-potravinarstvi/">
              Smart potravinářství
            </ButtonLink>
          </section>
        )}
        <ContactBand />
      </>
    );
  const story = stories.find((s) => path === `reference/${s.slug}`);
  if (story)
    return (
      <>
        <PageHero title={story.name} subtitle={story.subtitle} image={story.image} />
        <section className="container story-intro">
          <Image src={media(story.logoOnLight)} width={210} height={100} alt={story.name} />
          <div>
            <span className="eyebrow">{story.category}</span>
            <h2>{story.title}</h2>
            <p>{story.summary}</p>
          </div>
        </section>
        <section className="soft-section">
          <div className="container two-columns">
            <div>
              <span className="eyebrow">01 / Výzva</span>
              <h2>S čím zákazník potřeboval pomoci</h2>
              <BulletList items={story.challenges} />
            </div>
            <div>
              <span className="eyebrow">02 / Řešení Sabris</span>
              <h2>Co jsme společně změnili</h2>
              <p>{story.solution}</p>
              <div className="product-tags">
                {story.products.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="container prose-section">
          <h2>Realizace v souvislostech</h2>
          {story.details.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
        {story.quote ? (
          <section className="quote-band">
            <blockquote className="container">
              <p>„{story.quote}“</p>
              <cite>{story.author}</cite>
            </blockquote>
          </section>
        ) : null}
        <section className="container prose-section">
          <span className="eyebrow">03 / Přínos</span>
          <h2>Přínosy našeho řešení</h2>
          <BulletList items={story.benefits} />
          {story.video ? (
            <ButtonLink href={story.video}>Referenční video Marvinpac</ButtonLink>
          ) : null}
          <div className="back-link">
            <Link href="/pribehy-zakazniku/">← Zpět na příběhy zákazníků</Link>
          </div>
        </section>
        <ContactBand />
      </>
    );
  const page = pages[path];
  if (!page) notFound();
  return (
    <>
      <PageHero title={page.title} subtitle={page.subtitle} />
      {path === "reseni-a-sluzby" ? (
        <section className="container prose-section">
          <div className="service-grid">
            {services.map((s, i) => (
              <Link href={`/reseni-a-sluzby/${s.slug}/`} className="service-card" key={s.slug}>
                <span className="service-number">0{i + 1}</span>
                <Image src={media(s.icon)} alt="" width={90} height={90} />
                <h2>{s.label}</h2>
                <p>{s.subtitle}</p>
                <span className="text-link">
                  Prozkoumat řešení <ArrowRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      {path === "pribehy-zakazniku" ? (
        <section className="container prose-section">
          <ReferenceGrid />
        </section>
      ) : null}
      {path === "o-sabris/o-nas" ? (
        <>
          <section className="container prose-section about-lead">
            <span className="eyebrow">Friendly professional</span>
            <h2>
              Mluvíme vaším jazykem.
              <br />
              Známe vaše potřeby.
            </h2>
            <p className="lead">
              Za dobrým IT řešením je porozumění tomu, jak vaše firma funguje. Ptáme se lidí ve
              výrobě i ve vedení. Hledáme místa, kde ztrácíte čas, kde chybí informace a co vám
              brání růst.
            </p>
            <p>
              Od roku 1994 propojujeme zkušenosti se systémy a znalost konkrétních provozů.
              Navrhujeme a zavádíme řešení pro výrobu, potravinářství a logistiku a rozvíjíme je
              podle potřeb zákazníků.
            </p>
          </section>
          <section className="soft-section">
            <div className="container">
              <h2 className="center">Co od nás můžete čekat</h2>
              <div className="values-grid">
                {[
                  {
                    title: "Otevřenost a důvěra",
                    text: "Sdílíme možnosti i omezení. O nákladech, rizicích a potřebných změnách mluvíme včas a srozumitelně.",
                    image: "o-nas-otevrenost-a-duvera.jpg",
                  },
                  {
                    title: "Znalost vašeho provozu",
                    text: "Nezačínáme seznamem technologií. Nejdřív poznáme vaše procesy a potřeby lidí, kteří s řešením budou pracovat.",
                    image: "about-us-our-values-2.jpg",
                  },
                  {
                    title: "Odbornost bez zbytečné formálnosti",
                    text: "Překládáme technické možnosti do konkrétního dopadu na výrobu a každodenní práci. Na otázky dostanete věcnou odpověď.",
                    image: "about-us-our-values-3.jpg",
                  },
                  {
                    title: "Spolupráce i po spuštění",
                    text: "Předání systému není konec rozhovoru. Navazující rozvoj domlouváme podle toho, co se mění ve vašem podnikání.",
                    image: "about-us-our-values-4.jpg",
                  },
                ].map((v) => (
                  <article key={v.title} className="value-card">
                    <Image
                      src={media(v.image)}
                      alt=""
                      width={520}
                      height={300}
                      sizes="(max-width:767px) 90vw, 45vw"
                    />
                    <div>
                      <h3>{v.title}</h3>
                      <p>{v.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <ContactBand />
        </>
      ) : null}
      {path === "pridej-se-k-nam" ? (
        <>
          <section className="container service-intro">
            <div>
              <span className="eyebrow">Friendly professional tým</span>
              <h2>Kravatu u nás nepotřebuješ.</h2>
              <p>
                Hledáme lidi, kteří chtějí rozumět zákazníkům, přemýšlet nad jejich potřebami a
                hledat řešení společně s týmem.
              </p>
              <p>
                Aktuálně nevypisujeme žádné pozice. Pokud tě ale propojení výroby a technologií
                zaujalo, ozvi se. Rádi se poznáme.
              </p>
              <ButtonLink href="mailto:info@sabris.com?subject=Chci%20se%20p%C5%99idat%20k%20Sabris">
                Pojďme se seznámit
              </ButtonLink>
            </div>
            <Image
              src={media("join-us-team.svg")}
              alt="Ilustrace týmové spolupráce"
              width={500}
              height={350}
            />
          </section>
          <section className="soft-section">
            <div className="container two-columns">
              <div>
                <h2>Odborně. A po lidsku.</h2>
                <p>
                  Podílej se na řešeních pro potravinářství, řízení výroby a logistiku. Uplatníš
                  technické znalosti i schopnost domluvit se s lidmi v provozu.
                </p>
              </div>
              <div>
                <h2>Nejdřív si promluvíme</h2>
                <p>
                  Napiš nám, co tě baví, co umíš a kam se chceš posunout. Konkrétní podobu
                  spolupráce, podmínky i možnosti rozvoje probereme osobně.
                </p>
              </div>
            </div>
          </section>
          <section className="container service-intro">
            <Image
              src={media("join-us-the-way.svg")}
              alt="Cesta k týmu Sabris"
              width={440}
              height={300}
            />
            <div>
              <h2>Cesta k nám</h2>
              <ol className="career-steps">
                <li>Pošli nám pár slov o sobě a svůj životopis.</li>
                <li>Probereme tvé zkušenosti a vzájemná očekávání.</li>
                <li>Společně zjistíme, jestli si sedneme pracovně i lidsky.</li>
              </ol>
              <ButtonLink href="mailto:info@sabris.com?subject=Kari%C3%A9ra%20v%20Sabris">
                Kontaktuj nás
              </ButtonLink>
            </div>
          </section>
        </>
      ) : null}
      {path === "kontakt" ? (
        <section id="form" className="container prose-section">
          <div className="contact-grid">
            <div>
              <span className="eyebrow">Sídlo společnosti</span>
              <h2>Sabris Solutions, SE</h2>
              <p>
                Pekařská 621/7
                <br />
                155 00 Praha 5<br />
                Česká republika
              </p>
              <a className="contact-line" href="tel:+420234704000">
                <Phone size={21} />
                +420 234 704 000
              </a>
              <a className="contact-line" href="mailto:info@sabris.com">
                <Mail size={21} />
                info@sabris.com
              </a>
              <p className="company-details">
                IČ: 08765804 · DIČ: CZ08765804
                <br />
                Zapsána v OR vedeném Městským soudem v Praze, oddíl H, vložka 2305.
              </p>
            </div>
            <div className="office-card">
              <MapPin size={35} />
              <h2>Pobočka Olomouc</h2>
              <p>
                Dolní Hejčínská 1194/36
                <br />
                770 00 Olomouc
                <br />
                Česká republika
              </p>
              <ButtonLink href="https://www.google.com/maps/search/?api=1&query=Doln%C3%AD%20Hej%C4%8D%C3%ADnsk%C3%A1%201194%2F36%20Olomouc">
                Ukázat na mapě
              </ButtonLink>
            </div>
          </div>
          <div className="contact-invitation">
            <h2>Co potřebujete posunout dál?</h2>
            <p>Napište nám o svém provozu, projektu nebo otázce. Domluvíme si další krok.</p>
            <ButtonLink href="mailto:info@sabris.com">Napsat Sabris</ButtonLink>
          </div>
        </section>
      ) : null}
      {path === "o-sabris/media" ? (
        <section className="container prose-section">
          <h2>Loga ke stažení</h2>
          <div className="download-grid">
            {[
              {
                title: "Sabris",
                prefix: "sabris",
                light: "sabris_bilepozadi.png",
                dark: "sabris_tmavepozadi-1.png",
              },
              {
                title: "Sabris friendly professional",
                prefix: "sabris_FP",
                light: "sabris_FP_svetlepozadi.png",
                dark: "sabris_FP_tmavepozadi.png",
              },
            ].map((logo) => (
              <article className="download-card" key={logo.title}>
                <Image src={media(logo.light)} alt={logo.title} width={330} height={140} />
                <h3>{logo.title}</h3>
                {[
                  { label: "Bílé pozadí (PNG)", file: logo.light },
                  { label: "Bílé pozadí (PDF)", file: `${logo.prefix}_bilepozadi.pdf` },
                  { label: "Tmavé pozadí (PNG)", file: logo.dark },
                  { label: "Tmavé pozadí (PDF)", file: `${logo.prefix}_tmavepozadi.pdf` },
                ].map((f) => (
                  <a key={f.file} href={media(f.file)} download>
                    <Download size={17} />
                    {f.label}
                  </a>
                ))}
              </article>
            ))}
          </div>
          <div className="contact-invitation">
            <h2>Kontakt pro média</h2>
            <p>Rádi vám podáme informace o aktuálním dění v Sabris.</p>
            <ButtonLink href="mailto:info@sabris.com?subject=Dotaz%20pro%20m%C3%A9dia">
              Kontaktujte nás
            </ButtonLink>
          </div>
        </section>
      ) : null}
      {path === "o-sabris/certifikaty" ? (
        <section className="container prose-section">
          <div className="certification-card">
            <ShieldCheck size={54} />
            <div>
              <span className="eyebrow">Bezpečnost informací</span>
              <h2>ISO 27001</h2>
              <p>
                Systém řízení bezpečnosti informací (ISMS) se věnuje ochraně informací, technologií,
                know-how a souvisejících procesů.
              </p>
              <p>Pro aktuální znění certifikátu a jeho rozsah nás prosím kontaktujte.</p>
              <ButtonLink href="mailto:info@sabris.com?subject=Aktu%C3%A1ln%C3%AD%20certifik%C3%A1ty%20Sabris">
                Vyžádat aktuální certifikát
              </ButtonLink>
            </div>
          </div>
          <div className="two-columns certification-notes">
            <div>
              <h2>Řízení kvality</h2>
              <p>
                Informace o aktuálních certifikátech systému řízení kvality a jejich rozsahu vám
                poskytneme na vyžádání.
              </p>
            </div>
            <div>
              <h2>Certifikace řešení SAP</h2>
              <p>
                Platnost certifikace se vztahuje ke konkrétnímu řešení a jeho verzi. Aktuální
                dokumentaci vám připravíme podle vašeho projektu.
              </p>
            </div>
          </div>
        </section>
      ) : null}
      {path === "o-sabris/oceneni" ? (
        <section className="container prose-section">
          <h2>Ocenění v SAP Quality Awards</h2>
          <div className="awards-grid">
            {[
              {
                year: "2017",
                name: "Marvinpac CZ",
                text: "3. místo v kategorii Rychlá implementace za nasazení SAP S/4HANA během čtyř měsíců.",
                href: "/reference/marvinpac/",
              },
              {
                year: "2012",
                name: "Kostelecké uzeniny",
                text: "3. místo v kategorii Střední implementace za komplexní nasazení SAP ERP.",
                href: "",
              },
            ].map((a) => (
              <article className="award-card" key={a.year}>
                <Trophy size={40} />
                <span className="award-year">{a.year}</span>
                <h3>{a.name}</h3>
                <p>{a.text}</p>
                {a.href ? <ButtonLink href={a.href}>Příběh projektu</ButtonLink> : null}
              </article>
            ))}
          </div>
          <h2>Významná ocenění Sabris</h2>
          <BulletList
            items={[
              "2020 – speciální cena za získání nového zákazníka v oblasti cloudu.",
              "2018 – 3. místo za nejúspěšnější prodej licencí produktů SAP v ČR.",
              "2017 – 3. místo za vývoj cloudového řešení a cena diváků v soutěži SAP Innovmatch.",
              "2014 – 1. místo za nejúspěšnější prodej licencí produktů SAP v ČR.",
            ]}
          />
        </section>
      ) : null}
      {path === "zasady-ochrany-osobnich-udaju" ? (
        <article className="container prose-section privacy-copy">
          {privacyParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </article>
      ) : null}
    </>
  );
}
