import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { media, stories, aboutLinks } from "@/data/content";
import styles from "./theme.module.css";

export const minimalHref = (path: string) => `/minimal${path.startsWith("/") ? path : `/${path}`}`;
export function MinimalButton({
  href,
  children,
  outline = false,
  orange = false,
}: {
  href: string;
  children: React.ReactNode;
  outline?: boolean;
  orange?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${styles.pill} ${outline ? styles.outlinePill : ""} ${orange ? styles.orangePill : ""}`}
    >
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className={styles.eyebrow}>
      <span className={styles.dot} />
      {children}
    </span>
  );
}
export function MinimalHero({ title, description }: { title: string; description: string }) {
  return (
    <section className={`${styles.innerHero} ${styles.wrap}`}>
      <nav className={styles.breadcrumbs} aria-label="Drobečková navigace">
        <Link href="/minimal/">Sabris</Link>
        <span aria-hidden="true">/</span>
        <span>{title}</span>
      </nav>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
export function MinimalBullets({ items }: { items: string[] }) {
  return (
    <ul className={styles.bullets}>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}
export function CaseCard({ story }: { story: (typeof stories)[number] }) {
  return (
    <Link href={minimalHref(`/reference/${story.slug}/`)} className={styles.caseCard}>
      <div className={styles.caseImage}>
        <Image
          src={media(story.image)}
          alt=""
          fill
          sizes="(max-width:700px) 90vw, (max-width:1100px) 50vw, 1280px"
        />
        <Image
          src={media(story.logo)}
          alt={story.name}
          width={200}
          height={70}
          className={styles.caseLogo}
          data-logo-appearance={story.slug === "mp-krasno" ? "color" : undefined}
        />
        <span className={styles.roundArrow} aria-hidden="true">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className={styles.caseInfo}>
        <div>
          <h3>{story.name}</h3>
          <p>{story.title}</p>
        </div>
        <span>{story.category}</span>
      </div>
    </Link>
  );
}
export function MinimalPartners() {
  return (
    <section id="partnerstvi" className={`${styles.partnerStrip} ${styles.wrap}`}>
      <p>
        Technologie propojujeme se znalostí oboru. Spolu s CzechTrade a Českým svazem zpracovatelů
        masa.
      </p>
      <div>
        <Image
          src={media("czechtrade-01-1280x634.png")}
          alt="CzechTrade"
          width={220}
          height={110}
        />
        <Image
          src={media("our-partners-membership-cszm.png")}
          alt="Český svaz zpracovatelů masa"
          width={180}
          height={150}
        />
      </div>
    </section>
  );
}
export function MinimalFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <Eyebrow>Pojďme najít společnou řeč.</Eyebrow>
        <div className={styles.footerHeading}>
          <h2>Má to řešení.</h2>
          <Link
            href="/minimal/kontakt/"
            className={styles.roundArrow}
            aria-label="Kontaktujte Sabris"
          >
            <ArrowUpRight size={45} strokeWidth={1.2} />
          </Link>
        </div>
        <div className={styles.footerMain}>
          <div>
            <a href="mailto:info@sabris.com" className={styles.email}>
              info@sabris.com
            </a>
            <a href="tel:+420234704000">+420 234 704 000</a>
            <p>
              Praha · Olomouc
              <br />
              Friendly professional od roku 1994.
            </p>
          </div>
          <div>
            <Link href="/minimal/reseni-a-sluzby/">Řešení a služby</Link>
            <Link href="/minimal/pribehy-zakazniku/">Příběhy zákazníků</Link>
            <Link href="/minimal/pridej-se-k-nam/">Přidej se k nám</Link>
            <a href="https://cz.linkedin.com/company/sabris">
              LinkedIn <ArrowUpRight size={12} style={{ display: "inline" }} />
            </a>
          </div>
          <div>
            {aboutLinks.map((l) => (
              <Link href={minimalHref(l.href)} key={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Sabris</span>
          <div>
            <Link href="/minimal/zasady-ochrany-osobnich-udaju/">Ochrana soukromí</Link>
            <Link href="/">
              Původní varianta <ArrowDownRight size={12} style={{ display: "inline" }} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export function ConnectionSculpture() {
  return (
    <div className={styles.sculpture} aria-hidden="true">
      <svg viewBox="0 0 540 540" fill="none">
        <defs>
          <linearGradient
            id="link-a"
            x1="120"
            y1="100"
            x2="350"
            y2="480"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f7faf5" />
            <stop offset=".28" stopColor="#e3eee4" />
            <stop offset=".54" stopColor="#8aaca1" />
            <stop offset=".73" stopColor="#1f6968" />
            <stop offset="1" stopColor="#003c45" />
          </linearGradient>
          <linearGradient
            id="link-b"
            x1="265"
            y1="130"
            x2="400"
            y2="430"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f7faf5" />
            <stop offset=".4" stopColor="#d6e6da" />
            <stop offset=".75" stopColor="#f6f8f0" />
            <stop offset="1" stopColor="#b0c6b4" />
          </linearGradient>
          <radialGradient id="link-orb" cx=".3" cy=".25" r=".8">
            <stop stopColor="#ffe4a3" />
            <stop offset=".5" stopColor="#fbaa36" />
            <stop offset="1" stopColor="#ce731e" />
          </radialGradient>
          <filter id="link-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="17" />
          </filter>
          <filter id="link-depth" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="12"
              dy="18"
              stdDeviation="10"
              floodColor="#315b51"
              floodOpacity=".15"
            />
          </filter>
        </defs>
        <ellipse
          cx="300"
          cy="468"
          rx="133"
          ry="19"
          fill="#779b85"
          opacity=".18"
          filter="url(#link-shadow)"
        />
        <g filter="url(#link-depth)">
          <rect
            x="149"
            y="80"
            width="152"
            height="299"
            rx="76"
            stroke="url(#link-a)"
            strokeWidth="48"
            transform="rotate(-30 225 230)"
          />
          <rect
            x="251"
            y="177"
            width="152"
            height="280"
            rx="76"
            stroke="url(#link-b)"
            strokeWidth="49"
            transform="rotate(34 327 317)"
          />
          <path
            d="M191 240c-21-36-35-67-23-91"
            stroke="url(#link-a)"
            strokeWidth="48"
            strokeLinecap="round"
          />
        </g>
        <circle cx="402" cy="130" r="29" fill="url(#link-orb)" />
        <circle cx="130" cy="376" r="9" fill="#fbaa36" />
        <path d="M87 288v-37m-18 18h37M429 369v-22m-11 11h22" stroke="#b7c8bc" strokeWidth="1" />
        <path d="M104 149l19-19M419 417l17 17" stroke="#c6d2c5" strokeWidth="1" />
      </svg>
      <span className={styles.sculptureTag}>
        <span className={styles.dot} />
        Lidé × technologie × výroba
      </span>
    </div>
  );
}
