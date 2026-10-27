import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";
import { aboutLinks, media } from "@/data/content";

export function ButtonLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link href={href} className={`button-link${light ? " button-light" : ""}`}>
      {children}
      <ArrowRight size={19} />
    </Link>
  );
}
export function PageHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image?: string;
}) {
  return (
    <>
      <section
        className={`page-hero${image ? " page-hero-photo" : ""}`}
        style={
          image
            ? {
                backgroundImage: `linear-gradient(90deg,rgba(0,51,66,.87),rgba(0,51,66,.5)),url("${media(image)}")`,
              }
            : undefined
        }
      >
        <div className="container">
          <div className="page-hero-copy">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </div>
        <div className="hero-lines" aria-hidden="true" />
      </section>
      <nav className="breadcrumbs container" aria-label="Drobečková navigace">
        <Link href="/">Úvod</Link>
        <span aria-hidden="true">›</span>
        <span>{title}</span>
      </nav>
    </>
  );
}
export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="container contact-band-inner">
        <div>
          <span className="eyebrow">Pojďme se potkat</span>
          <h2>
            Každé dobré řešení
            <br />
            začíná rozhovorem.
          </h2>
          <p>Řekněte nám, co potřebujete zlepšit. Domluvíme se na dalším postupu.</p>
        </div>
        <ButtonLink href="/kontakt/" light>
          Kontaktujte nás
        </ButtonLink>
      </div>
    </section>
  );
}
export function Partners() {
  return (
    <section id="partnerstvi" className="partners container">
      <div>
        <span className="eyebrow">Známe váš obor</span>
        <h2>
          Blízko potravinářství.
          <br />
          Blízko vašim potřebám.
        </h2>
        <p>
          Spolupráce s CzechTrade a členství v Českém svazu zpracovatelů masa propojují naše
          technologické zkušenosti s praxí oboru.
        </p>
      </div>
      <div className="partner-logos">
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
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link href="/" aria-label="Sabris – úvod">
            <Image
              className="footer-brand"
              src={media("logo_sabris_simple.png")}
              alt="Sabris"
              width={173}
              height={45}
            />
          </Link>
          <p>
            Technologie s lidskou tváří.
            <br />
            Friendly professional.
          </p>
        </div>
        <div>
          <strong>Sabris</strong>
          {aboutLinks.map((l) => (
            <Link href={l.href} key={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div>
          <strong>Společně dál</strong>
          <Link href="/reseni-a-sluzby/">Řešení a služby</Link>
          <Link href="/pribehy-zakazniku/">Příběhy zákazníků</Link>
          <Link href="/pridej-se-k-nam/">Přidej se k nám</Link>
        </div>
        <div>
          <strong>Jsme vám blízko</strong>
          <a href="mailto:info@sabris.com">info@sabris.com</a>
          <a href="tel:+420234704000">+420 234 704 000</a>
          <Link href="/kontakt/">Praha · Olomouc</Link>
          <a href="https://cz.linkedin.com/company/sabris" aria-label="Sabris na LinkedIn">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Sabris. Všechna práva vyhrazena.</span>
        <Link href="/zasady-ochrany-osobnich-udaju/">Ochrana soukromí</Link>
      </div>
    </footer>
  );
}
