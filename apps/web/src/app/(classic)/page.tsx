import Image from "next/image";
import { Solutions } from "@/components/site/solutions";
import { CustomerCarousel } from "@/components/site/carousel";
import { ButtonLink, ContactBand, Partners } from "@/components/site/shared";
import { media } from "@/data/content";

export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero-background" />
        <div className="container home-hero-inner">
          <h1>
            <span>Zpřístupníme vám</span>
            <strong>komplexní IT řešení</strong>
          </h1>
          <Image
            className="hero-hands"
            src={media("Group-316.png")}
            alt="Propojení lidské ruky a robotické ruky"
            width={1441}
            height={707}
            priority
            sizes="100vw"
          />
          <p className="hero-promise">
            a podpoříme<strong>váš soustavný růst</strong>
          </p>
        </div>
      </section>
      <div className="friendly-strip container">
        <Image
          src={media("friendly-porfessional-_-CZ.png")}
          width={596}
          height={164}
          alt="Friendly professional"
        />
        <span>Známe technologie. Rozumíme lidem.</span>
      </div>
      <Solutions />
      <CustomerCarousel />
      <section className="about-teaser container">
        <div>
          <span className="eyebrow">Sabris. Friendly professional.</span>
          <h2>
            Mluvíme vaším jazykem.
            <br />
            Známe vaše potřeby.
          </h2>
          <p>
            Nejdřív se ptáme a nasloucháme. Zajímá nás, jak funguje vaše výroba, co potřebují vaši
            lidé a kde vás procesy brzdí. Teprve potom navrhujeme technologii.
          </p>
          <p>
            Otevřeně řekneme, co dává smysl, co bude potřeba změnit a co od spolupráce můžete čekat.
            Odborně, srozumitelně a bez zbytečné formálnosti.
          </p>
          <ButtonLink href="/o-sabris/o-nas/">Poznejte Sabris</ButtonLink>
        </div>
        <div className="about-teaser-visual">
          <Image
            src={media("friendly-professional.svg")}
            alt="Friendly professional přístup Sabris"
            width={520}
            height={350}
          />
          <span>
            Od roku <strong>1994</strong>
          </span>
        </div>
      </section>
      <Partners />
      <section className="career-teaser">
        <div className="container career-teaser-inner">
          <div>
            <span className="eyebrow">Lidé za technologiemi</span>
            <h2>Přidej se k nám</h2>
            <p>
              Pojď s námi propojovat výrobu a technologie. Kravatu u nás nepotřebuješ. Chuť
              přemýšlet, domluvit se a posouvat věci ano.
            </p>
            <ButtonLink href="/pridej-se-k-nam/">Udělej první krok</ButtonLink>
          </div>
          <Image
            src={media("join-us-team.svg")}
            alt="Ilustrace spolupráce týmu"
            width={440}
            height={330}
          />
        </div>
      </section>
      <ContactBand />
    </>
  );
}
