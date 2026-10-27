import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { media, services, stories } from "@/data/content";
import { CaseCard, ConnectionSculpture, Eyebrow, MinimalButton, MinimalPartners } from "./shared";
import styles from "./theme.module.css";

export function MinimalHome() {
  return (
    <>
      <section className={`${styles.hero} ${styles.wrap}`}>
        <Eyebrow>Sabris. Friendly professional.</Eyebrow>
        <div className={styles.heroTop}>
          <h1>
            Mluvíme
            <br />
            <span>Vaším jazykem</span>
          </h1>
          <ConnectionSculpture />
        </div>
        <div className={styles.heroBottom}>
          <div className={styles.heroLead}>
            <MinimalButton href="/minimal/reseni-a-sluzby/">Najděme vaše řešení</MinimalButton>
            <span className={styles.friendly}>Odborně. Srozumitelně. Po lidsku.</span>
          </div>
          <p>
            Propojujeme výrobu, data a lidi. Aby vaše firma fungovala v souvislostech a měla prostor
            růst.
          </p>
        </div>
        <div className={styles.heroFootnote}>
          <span>Smart potravinářství · MES · MOM</span>
          <Link href="#v-praxi">
            Z technologií do praxe <ArrowDown size={14} />
          </Link>
        </div>
      </section>
      <section className={`${styles.showcase} ${styles.wrap}`} id="v-praxi">
        <Image
          src={media("13-voňavá-odvěšovna-scaled.jpg")}
          alt="Potravinářská výroba v závodě MP Krásno"
          fill
          sizes="(max-width:700px) 100vw, 1320px"
          priority
        />
        <div className={styles.showcaseTop}>
          <span>SABRIS / SMART POTRAVINÁŘSTVÍ</span>
          <span className={styles.showcaseBadge}>
            <span className={styles.dot} />Z reálného provozu
          </span>
        </div>
        <div className={styles.showcaseBody}>
          <div>
            <h2>
              Každý proces.
              <br />
              Jeden celek.
            </h2>
            <p>
              Od prvotní suroviny po hotový výrobek. Řešení, která znají specifika vašeho oboru.
            </p>
          </div>
          <Link
            href="/minimal/reseni-a-sluzby/smart-potravinarstvi/"
            className={styles.roundArrow}
            aria-label="Prozkoumat Smart potravinářství"
          >
            <ArrowUpRight size={30} strokeWidth={1.3} />
          </Link>
        </div>
      </section>
      <div className={`${styles.logos} ${styles.wrap}`}>
        <p>
          Zkušenosti vznikají
          <br />
          společnou prací.
        </p>
        <div className={styles.logoList}>
          {stories.map((s) => (
            <Link href={`/minimal/reference/${s.slug}/`} key={s.slug}>
              <Image src={media(s.logoOnLight)} width={200} height={75} alt={s.name} />
            </Link>
          ))}
        </div>
      </div>
      <section className={`${styles.section} ${styles.wrap}`}>
        <div className={styles.introGrid}>
          <Eyebrow>Co spolu můžeme změnit</Eyebrow>
          <div>
            <h2>
              Méně slepých míst.
              <br />
              Více souvislostí.
            </h2>
            <p>
              Váš provoz není soubor oddělených úkolů. Ani naše řešení. Pomáháme propojit to, co k
              sobě patří — od plánování přes výrobu až po expedici.
            </p>
          </div>
        </div>
        <div className={styles.serviceRows}>
          {services.map((s, i) => (
            <Link
              href={`/minimal/reseni-a-sluzby/${s.slug}/`}
              key={s.slug}
              className={styles.serviceRow}
            >
              <span>0{i + 1}</span>
              <h3>{s.label}</h3>
              <p>{s.subtitle}</p>
              <ArrowUpRight size={25} strokeWidth={1.4} />
            </Link>
          ))}
        </div>
      </section>
      <section className={styles.selected}>
        <div className={styles.wrap}>
          <div className={styles.sectionHeading}>
            <div>
              <Eyebrow>Vybrané spolupráce</Eyebrow>
              <h2>
                Za každým řešením
                <br />
                je skutečný příběh.
              </h2>
            </div>
            <p>Výzva v provozu. Společný návrh. Konkrétní změna.</p>
          </div>
          <div className={styles.caseGrid}>
            {stories.map((s) => (
              <CaseCard key={s.slug} story={s} />
            ))}
          </div>
          <Link className={styles.textLink} href="/minimal/pribehy-zakazniku/">
            Všechny příběhy <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className={`${styles.humanSection} ${styles.wrap}`}>
        <div className={styles.humanVisual}>
          <strong className={styles.humanNumber}>1994</strong>
          <Image
            src={media("friendly-professional.svg")}
            width={520}
            height={350}
            alt="Friendly professional přístup Sabris"
          />
          <span>Zkušenosti mají smysl, když si rozumíme.</span>
        </div>
        <div>
          <Eyebrow>Technologie s lidskou tváří</Eyebrow>
          <h2>
            Mluvíme
            <br />
            vaším jazykem.
          </h2>
          <p>
            Nejdřív nasloucháme. Poznáme váš provoz, vaše lidi a to, co potřebujete posunout. Pak
            společně hledáme cestu.
          </p>
          <p>
            Bez zbytečné formálnosti. S otevřeností o tom, co dává smysl a co bude potřeba změnit.
          </p>
          <Link className={styles.textLink} href="/minimal/o-sabris/o-nas/">
            Poznejte Sabris <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <MinimalPartners />
      <section className={`${styles.career} ${styles.wrap}`}>
        <div>
          <Eyebrow>Je tu místo i pro tebe</Eyebrow>
          <h2>Dobrá práce. Fajn lidé.</h2>
          <p>
            Pojď s námi propojovat technologie a skutečný svět. Otevřenou hlavu oceníme víc než
            kravatu.
          </p>
        </div>
        <MinimalButton href="/minimal/pridej-se-k-nam/" outline>
          Přidej se k nám
        </MinimalButton>
      </section>
    </>
  );
}
