"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, ChevronsRight } from "lucide-react";
import { services, media } from "@/data/content";

export function Solutions() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const service = services[active];
  return (
    <section className="solutions-section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Od potřeb k výsledkům</span>
          <h2>Řešení, která rozumí vaší výrobě</h2>
        </div>
        <div className="solutions-desktop">
          <div
            className="solution-tabs"
            role="tablist"
            aria-label="Řešení Sabris"
            aria-orientation="vertical"
          >
            {services.map((s, i) => (
              <button
                key={s.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${s.slug}`}
                aria-controls={`panel-${s.slug}`}
                aria-selected={i === active}
                tabIndex={i === active ? 0 : -1}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  let next = i;
                  if (e.key === "ArrowDown" || e.key === "ArrowRight")
                    next = (i + 1) % services.length;
                  else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
                    next = (i + services.length - 1) % services.length;
                  else if (e.key === "Home") next = 0;
                  else if (e.key === "End") next = services.length - 1;
                  else return;
                  e.preventDefault();
                  setActive(next);
                  tabs.current[next]?.focus();
                }}
              >
                <Image src={media(s.icon)} width={55} height={55} alt="" />
                <span>{s.label}</span>
              </button>
            ))}
          </div>
          <div
            key={service.slug}
            className="solution-panel"
            role="tabpanel"
            id={`panel-${service.slug}`}
            aria-labelledby={`tab-${service.slug}`}
            style={{
              backgroundImage: `url('${media(service.image)}'),linear-gradient(180deg,transparent,rgba(0,0,0,.3))`,
            }}
          >
            <h3>{service.title}</h3>
            <div className="solution-copy">
              <p>{service.subtitle}</p>
              <p>{service.text}</p>
            </div>
            <Link className="solution-button" href={`/reseni-a-sluzby/${service.slug}/`}>
              Více<span className="sr-only"> o řešení {service.label}</span>
              <ChevronsRight size={23} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="solutions-mobile">
          {services.map((s) => (
            <Link key={s.slug} href={`/reseni-a-sluzby/${s.slug}/`}>
              <Image src={media(s.icon)} width={50} height={50} alt="" />
              <span>{s.label}</span>
              <ArrowRight size={20} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
