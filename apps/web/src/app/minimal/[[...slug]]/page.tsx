import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Download, ShieldCheck } from "lucide-react";
import { services, stories, media } from "@/data/content";
import { privacyParagraphs } from "@/data/privacy";
import { MinimalHome } from "@/components/minimal/home";
import { MinimalCases } from "@/components/minimal/cases";
import {
  Eyebrow,
  MinimalBullets,
  MinimalButton,
  MinimalHero,
  MinimalPartners,
} from "@/components/minimal/shared";
import styles from "@/components/minimal/theme.module.css";

const staticPages: Record<string, { title: string; description: string }> = {
  "reseni-a-sluzby": {
    title: "Výroba v souvislostech.",
    description:
      "Technologie vybíráme podle vašeho provozu. A propojujeme je tak, aby spolu fungovaly.",
  },
  "pribehy-zakazniku": {
    title: "Společná práce. Skutečná změna.",
    description: "Příběhy zákazníků, se kterými jsme propojili technologie a každodenní praxi.",
  },
  "o-sabris/o-nas": {
    title: "Technologie jsou o lidech.",
    description: "Rozumíme systémům. Ale ještě důležitější je rozumět vám.",
  },
  "pridej-se-k-nam": {
    title: "Dobrá práce. Fajn lidé.",
    description: "Otevřená hlava a chuť posouvat věci. To je dobrý začátek společné práce.",
  },
  kontakt: {
    title: "Začněme rozhovorem.",
    description: "Řekněte nám, co potřebujete posunout. Domluvíme se na dalším kroku.",
  },
  "o-sabris/media": {
    title: "Sabris. Ke stažení.",
    description: "Loga, vizuální identita a kontakt pro média na jednom místě.",
  },
  "o-sabris/certifikaty": {
    title: "Důvěra má svůj základ.",
    description: "Bezpečnost informací, kvalita dodávek a konkrétní dokumentace k vašemu projektu.",
  },
  "o-sabris/oceneni": {
    title: "Práce, která nezapadla.",
    description: "Vybraná ocenění našich projektů a zkušenosti, na kterých stavíme.",
  },
  "zasady-ochrany-osobnich-udaju": {
    title: "Ochrana soukromí.",
    description: "Informace o zpracování osobních údajů ve skupině Sabris.",
  },
};
const allPaths = [
  ...Object.keys(staticPages),
  ...services.map((s) => `reseni-a-sluzby/${s.slug}`),
  ...stories.map((s) => `reference/${s.slug}`),
];
export function generateStaticParams() {
  return [{ slug: [] }, ...allPaths.map((p) => ({ slug: p.split("/") }))];
}
export const dynamicParams = false;
type Props = { params: Promise<{ slug?: string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = ((await params).slug ?? []).join("/");
  const service = services.find((s) => path === `reseni-a-sluzby/${s.slug}`);
  const story = stories.find((s) => path === `reference/${s.slug}`);
  return {
    title: path
      ? `${service?.label ?? story?.name ?? staticPages[path]?.title ?? "Stránka nenalezena"} — minimalistická varianta`
      : "Sabris — Mluvíme Vaším jazykem",
    description:
      service?.subtitle ??
      story?.subtitle ??
      staticPages[path]?.description ??
      "Propojujeme výrobu, data a lidi. Smart potravinářství, MES a MOM s lidským přístupem.",
    alternates: { canonical: `/${path}${path ? "/" : ""}` },
    robots: { index: false, follow: false },
  };
}

export default async function MinimalPage({ params }: Props) {
  const path = ((await params).slug ?? []).join("/");
  if (!path) return <MinimalHome />;
  const service = services.find((s) => path === `reseni-a-sluzby/${s.slug}`);
  if (service)
    return (
      <>
        <MinimalHero title={service.label} description={service.subtitle} />
        <section className={`${styles.serviceIntro} ${styles.wrap}`}>
          <div>
            <Eyebrow>Od potřeb k řešení</Eyebrow>
            <h2>{service.title}</h2>
          </div>
          <div>
            <p>{service.text}</p>
            <MinimalButton href="/minimal/kontakt/">Proberme váš provoz</MinimalButton>
          </div>
        </section>
        <div className={`${styles.innerImage} ${styles.wrap}`}>
          <Image
            src={media(
              service.slug === "smart-potravinarstvi"
                ? "13-voňavá-odvěšovna-scaled.jpg"
                : service.image,
            )}
            alt={service.label}
            fill
            sizes="(max-width:700px) 90vw, 1320px"
          />
        </div>
        <section className={`${styles.accordion} ${styles.wrap} ${styles.sectionSmall}`}>
          <details open>
            <summary>Co potřebujete vyřešit</summary>
            <div>
              <MinimalBullets items={service.challenges} />
            </div>
          </details>
          <details>
            <summary>Co vám řešení přinese</summary>
            <div>
              <MinimalBullets items={service.benefits} />
            </div>
          </details>
          <details>
            <summary>Jak začíná naše spolupráce</summary>
            <div>
              <p>
                Nejdřív poznáme váš provoz, stávající systémy a potřeby lidí. Společně pojmenujeme
                priority, rozsah i návaznosti. Pak navrhneme postup, který dává smysl právě vám.
              </p>
              <MinimalButton href="/minimal/kontakt/" outline>
                Pojďme si promluvit
              </MinimalButton>
            </div>
          </details>
        </section>
        {service.slug === "smart-potravinarstvi" ? (
          <>
            <MinimalPartners />
            <section className={`${styles.bodyCopy} ${styles.wrap}`}>
              <Eyebrow>Ověřeno v praxi</Eyebrow>
              <h2>MP Krásno. Každý výrobek má svůj příběh i nákladovou cenu.</h2>
              <p>
                SAP ERP a S2AP for Food propojují klíčové výrobní a podnikové procesy v jednom
                systému.
              </p>
              <MinimalButton href="/minimal/reference/mp-krasno/">Příběh MP Krásno</MinimalButton>
            </section>
          </>
        ) : (
          <section className={`${styles.bodyCopy} ${styles.wrap}`}>
            <h2>Jeden provoz. Společná řeč.</h2>
            <p>MES a MOM navrhujeme v souvislostech s oborovým řešením a podnikovými procesy.</p>
            <MinimalButton href="/minimal/reseni-a-sluzby/smart-potravinarstvi/" outline>
              Smart potravinářství
            </MinimalButton>
          </section>
        )}
      </>
    );
  const story = stories.find((s) => path === `reference/${s.slug}`);
  if (story)
    return (
      <>
        <MinimalHero title={`${story.name}. ${story.title}.`} description={story.subtitle} />
        <div className={`${styles.innerImage} ${styles.wrap}`}>
          <Image
            src={media(story.image)}
            alt={`Projekt ${story.name}`}
            fill
            sizes="(max-width:700px) 90vw, 1320px"
            priority
          />
        </div>
        <section className={`${styles.storySections} ${styles.wrap}`}>
          <div>
            <Eyebrow>01 / Výzva</Eyebrow>
            <h2>Co bylo potřeba změnit.</h2>
            <MinimalBullets items={story.challenges} />
          </div>
          <div>
            <Eyebrow>02 / Řešení Sabris</Eyebrow>
            <h2>Jak jsme na to šli.</h2>
            <p>{story.solution}</p>
            <div className={styles.tags}>
              {story.products.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>
        </section>
        <section className={`${styles.bodyCopy} ${styles.wrap}`}>
          <Eyebrow>Spolupráce v souvislostech</Eyebrow>
          {story.details.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
        {story.quote ? (
          <blockquote className={`${styles.quote} ${styles.wrap}`}>
            <p>„{story.quote}“</p>
            <cite>{story.author}</cite>
          </blockquote>
        ) : null}
        <section className={`${styles.bodyCopy} ${styles.wrap}`}>
          <Eyebrow>03 / Přínosy</Eyebrow>
          <h2>Co spolupráce přinesla.</h2>
          <MinimalBullets items={story.benefits} />
          {story.video ? (
            <Link href={story.video} className={styles.textLink}>
              Referenční video <ArrowUpRight size={18} />
            </Link>
          ) : null}
        </section>
        <div className={styles.wrap}>
          <Link href="/minimal/pribehy-zakazniku/" className={styles.backLink}>
            ← Zpět na příběhy zákazníků
          </Link>
        </div>
      </>
    );
  const page = staticPages[path];
  if (!page) notFound();
  return (
    <>
      <MinimalHero title={page.title} description={page.description} />
      {path === "reseni-a-sluzby" ? (
        <section className={`${styles.wrap} ${styles.sectionSmall}`}>
          <div className={styles.serviceRows} style={{ marginTop: 0 }}>
            {services.map((s, i) => (
              <Link
                href={`/minimal/reseni-a-sluzby/${s.slug}/`}
                key={s.slug}
                className={styles.serviceRow}
              >
                <span>0{i + 1}</span>
                <h3>{s.label}</h3>
                <p>{s.subtitle}</p>
                <ArrowUpRight size={25} />
              </Link>
            ))}
          </div>
          <div className={styles.serviceIntro} style={{ paddingTop: 70 }}>
            <h2>
              Neskládáme technologie.
              <br />
              Hledáme souvislosti.
            </h2>
            <div>
              <p>
                Od oborových potřeb až po konkrétní výrobní operaci. Navrhujeme propojení, které
                vašemu provozu pomůže pracovat se stejnými informacemi.
              </p>
              <MinimalButton href="/minimal/kontakt/">Najděme vaše řešení</MinimalButton>
            </div>
          </div>
        </section>
      ) : null}
      {path === "pribehy-zakazniku" ? <MinimalCases /> : null}
      {path === "o-sabris/o-nas" ? (
        <>
          <section className={`${styles.serviceIntro} ${styles.wrap}`}>
            <Eyebrow>Friendly professional</Eyebrow>
            <div>
              <p>
                Za dobrým IT řešením je porozumění tomu, jak vaše firma funguje. Ptáme se lidí ve
                výrobě i ve vedení. Hledáme, kde ztrácíte čas, kde chybí informace a co vám brání
                růst.
              </p>
              <p>
                Od roku 1994 propojujeme zkušenosti se systémy a znalost konkrétních provozů.
                Technologie překládáme do srozumitelného dopadu na každodenní práci.
              </p>
            </div>
          </section>
          <section className={`${styles.values} ${styles.wrap}`}>
            {[
              {
                title: "Otevřenost a důvěra",
                text: "Sdílíme možnosti i omezení. O nákladech, rizicích a potřebných změnách mluvíme včas a srozumitelně.",
              },
              {
                title: "Znalost vašeho provozu",
                text: "Nezačínáme seznamem technologií. Nejdřív poznáme procesy a potřeby lidí, kteří s řešením budou pracovat.",
              },
              {
                title: "Odbornost bez formálností",
                text: "Na otázky dostanete věcnou odpověď. Mluvíme vaším jazykem a hledáme cestu společně.",
              },
              {
                title: "Spolupráce i po spuštění",
                text: "Předání systému není konec rozhovoru. Další rozvoj domlouváme podle toho, co se mění ve vašem podnikání.",
              },
            ].map((v, i) => (
              <article key={v.title}>
                <span>0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </section>
          <MinimalPartners />
        </>
      ) : null}
      {path === "pridej-se-k-nam" ? (
        <>
          <section className={`${styles.serviceIntro} ${styles.wrap}`}>
            <div>
              <Eyebrow>Lidé za technologiemi</Eyebrow>
              <h2>
                Kravatu nech doma.
                <br />
                Nápady vezmi s sebou.
              </h2>
            </div>
            <div>
              <p>
                Hledáme lidi, kteří chtějí rozumět zákazníkům, přemýšlet nad jejich potřebami a
                hledat řešení společně s týmem.
              </p>
              <p>
                Aktuálně nevypisujeme žádné pozice. Pokud tě propojení výroby a technologií zaujalo,
                ozvi se. Rádi se poznáme.
              </p>
              <MinimalButton href="mailto:info@sabris.com?subject=Kari%C3%A9ra%20v%20Sabris">
                Pojďme se seznámit
              </MinimalButton>
            </div>
          </section>
          <section className={`${styles.values} ${styles.wrap}`}>
            <article>
              <span>01 / První krok</span>
              <h3>Napiš nám.</h3>
              <p>
                Pošli pár slov o sobě a svůj životopis. Zajímá nás, co tě baví a kam se chceš
                posunout.
              </p>
            </article>
            <article>
              <span>02 / Společná řeč</span>
              <h3>Poznejme se.</h3>
              <p>
                Probereme zkušenosti, vzájemná očekávání, podmínky i možnosti rozvoje. Odborně a po
                lidsku.
              </p>
            </article>
          </section>
        </>
      ) : null}
      {path === "kontakt" ? (
        <section id="form" className={`${styles.contactGrid} ${styles.wrap}`}>
          <div>
            <Eyebrow>Praha / Sídlo společnosti</Eyebrow>
            <h2>Sabris Solutions, SE</h2>
            <p>
              Pekařská 621/7
              <br />
              155 00 Praha 5<br />
              Česká republika
            </p>
            <a href="mailto:info@sabris.com">info@sabris.com</a>
            <a href="tel:+420234704000">+420 234 704 000</a>
            <small>
              IČ: 08765804 · DIČ: CZ08765804
              <br />
              Zapsána v OR vedeném Městským soudem v Praze,
              <br />
              oddíl H, vložka 2305.
            </small>
          </div>
          <div>
            <Eyebrow>Olomouc / Pobočka</Eyebrow>
            <h2>Blízko vašemu provozu.</h2>
            <p>
              Dolní Hejčínská 1194/36
              <br />
              770 00 Olomouc
              <br />
              Česká republika
            </p>
            <Link
              className={styles.textLink}
              href="https://www.google.com/maps/search/?api=1&query=Doln%C3%AD%20Hej%C4%8D%C3%ADnsk%C3%A1%201194%2F36%20Olomouc"
            >
              Najdete nás tady <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      ) : null}
      {path === "o-sabris/media" ? (
        <>
          <section className={`${styles.downloads} ${styles.wrap}`}>
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
              <article key={logo.prefix} className={styles.downloadCard}>
                <Image src={media(logo.light)} alt={logo.title} width={330} height={140} />
                <h2>{logo.title}</h2>
                {[
                  { label: "Bílé pozadí / PNG", file: logo.light },
                  { label: "Bílé pozadí / PDF", file: `${logo.prefix}_bilepozadi.pdf` },
                  { label: "Tmavé pozadí / PNG", file: logo.dark },
                  { label: "Tmavé pozadí / PDF", file: `${logo.prefix}_tmavepozadi.pdf` },
                ].map((f) => (
                  <a href={media(f.file)} download key={f.file}>
                    {f.label}
                    <Download size={17} />
                  </a>
                ))}
              </article>
            ))}
          </section>
          <section className={`${styles.bodyCopy} ${styles.wrap}`}>
            <h2>Kontakt pro média.</h2>
            <p>Rádi vám podáme informace o aktuálním dění v Sabris.</p>
            <MinimalButton href="mailto:info@sabris.com?subject=Dotaz%20pro%20m%C3%A9dia">
              Napište nám
            </MinimalButton>
          </section>
        </>
      ) : null}
      {path === "o-sabris/certifikaty" ? (
        <>
          <section className={`${styles.certification} ${styles.wrap}`}>
            <div>
              <ShieldCheck size={40} strokeWidth={1.2} />
              <h2>ISO 27001</h2>
            </div>
            <div>
              <p>
                Systém řízení bezpečnosti informací (ISMS) se věnuje ochraně informací, technologií,
                know-how a souvisejících procesů.
              </p>
              <p>Pro aktuální znění certifikátu a jeho rozsah nás prosím kontaktujte.</p>
              <MinimalButton href="mailto:info@sabris.com?subject=Aktu%C3%A1ln%C3%AD%20certifik%C3%A1t%20ISO%2027001">
                Vyžádat certifikát
              </MinimalButton>
            </div>
          </section>
          <section className={`${styles.values} ${styles.wrap}`}>
            <article>
              <h3>Řízení kvality</h3>
              <p>
                Informace o aktuálních certifikátech systému řízení kvality a jejich rozsahu
                poskytneme na vyžádání.
              </p>
            </article>
            <article>
              <h3>Certifikace řešení SAP</h3>
              <p>
                Platnost se vztahuje ke konkrétnímu řešení a jeho verzi. Aktuální dokumentaci
                připravíme podle vašeho projektu.
              </p>
            </article>
          </section>
        </>
      ) : null}
      {path === "o-sabris/oceneni" ? (
        <section className={`${styles.wrap} ${styles.sectionSmall}`}>
          {[
            {
              year: "2017",
              name: "Marvinpac CZ",
              text: "3. místo v SAP CEE Quality Awards v kategorii Rychlá implementace za nasazení SAP S/4HANA během čtyř měsíců.",
              href: "/minimal/reference/marvinpac/",
            },
            {
              year: "2012",
              name: "Kostelecké uzeniny",
              text: "3. místo v SAP CEE Quality Awards v kategorii Střední implementace za komplexní nasazení SAP ERP.",
              href: "",
            },
          ].map((a) => (
            <article className={styles.awardRow} key={a.year}>
              <strong>{a.year}</strong>
              <div>
                <h2>{a.name}</h2>
                {a.href ? (
                  <Link href={a.href} className={styles.textLink}>
                    Příběh projektu <ArrowUpRight size={17} />
                  </Link>
                ) : null}
              </div>
              <p>{a.text}</p>
            </article>
          ))}
          <div className={styles.bodyCopy}>
            <h2>Významná ocenění Sabris.</h2>
            <MinimalBullets
              items={[
                "2020 – speciální cena za získání nového zákazníka v oblasti cloudu.",
                "2018 – 3. místo za nejúspěšnější prodej licencí produktů SAP v ČR.",
                "2017 – 3. místo za vývoj cloudového řešení a cena diváků v soutěži SAP Innovmatch.",
                "2014 – 1. místo za nejúspěšnější prodej licencí produktů SAP v ČR.",
              ]}
            />
          </div>
        </section>
      ) : null}
      {path === "zasady-ochrany-osobnich-udaju" ? (
        <article className={`${styles.bodyCopy} ${styles.privacy} ${styles.wrap}`}>
          {privacyParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </article>
      ) : null}
    </>
  );
}
