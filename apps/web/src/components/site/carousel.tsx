"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Play, ArrowRight } from "lucide-react";
import { stories, media } from "@/data/content";

// Source: manual looping carousel, 650 × 380 cards, 48 px gaps, 500 ms slides.
export function CustomerCarousel() {
  const [position, setPosition] = useState(1);
  const [animated, setAnimated] = useState(true);
  const moving = useRef(false);
  const start = useRef<number | null>(null);
  const swiped = useRef(false);
  const active = (((position - 1) % stories.length) + stories.length) % stories.length;
  const slides = [stories.at(-1)!, ...stories, stories[0]];
  function move(delta: number) {
    if (moving.current) return;
    moving.current = true;
    setAnimated(true);
    setPosition((p) => p + delta);
  }
  function settle() {
    moving.current = false;
    if (position === 0 || position === stories.length + 1) {
      setAnimated(false);
      setPosition(position === 0 ? stories.length : 1);
    }
  }
  return (
    <section className="customers-section" aria-label="Naši zákazníci">
      <div className="section-heading container">
        <span className="eyebrow">Skutečné výzvy. Konkrétní řešení.</span>
        <h2>Naši zákazníci</h2>
      </div>
      <div
        className="story-carousel"
        role="region"
        aria-roledescription="karusel"
        aria-label="Zákaznické příběhy"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
        onPointerDown={(e) => {
          start.current = e.clientX;
          swiped.current = false;
        }}
        onPointerUp={(e) => {
          if (start.current !== null && Math.abs(e.clientX - start.current) > 45) {
            swiped.current = true;
            move(e.clientX < start.current ? 1 : -1);
          }
          start.current = null;
        }}
        onPointerCancel={() => {
          start.current = null;
        }}
        onClickCapture={(e) => {
          if (swiped.current) {
            e.preventDefault();
            swiped.current = false;
          }
        }}
      >
        <div
          className="story-track"
          style={{
            transform: `translateX(calc(50% - var(--slide-width) / 2 - ${position} * (var(--slide-width) + var(--slide-gap))))`,
            transition: animated ? "transform 500ms ease" : "none",
          }}
          onTransitionEnd={(e) => {
            if (e.target === e.currentTarget) settle();
          }}
        >
          {slides.map((s, i) => (
            <article
              className="story-slide"
              key={`${s.slug}-${i}`}
              inert={i !== position}
              aria-hidden={i !== position}
              aria-roledescription="snímek"
              aria-label={`${((i - 1 + stories.length) % stories.length) + 1} z ${stories.length}`}
            >
              <Image
                src={media(s.image)}
                alt=""
                fill
                sizes="(max-width: 698px) calc(100vw - 48px), 650px"
              />
              <div className="story-shade" />
              {s.video ? (
                <a href={s.video} className="story-play" aria-label={`Přehrát video ${s.name}`}>
                  <Play size={31} />
                </a>
              ) : (
                <Link
                  href={`/reference/${s.slug}/`}
                  className="story-play"
                  aria-label={`Přečíst příběh ${s.name}`}
                >
                  <ArrowRight size={31} />
                </Link>
              )}
              <Link href={`/reference/${s.slug}/`} className="story-caption">
                <Image
                  src={media(s.logo)}
                  width={195}
                  height={67}
                  alt={s.name}
                  className="story-logo"
                  data-logo-appearance={s.slug === "mp-krasno" ? "color" : undefined}
                />
                <p>{s.summary}</p>
              </Link>
            </article>
          ))}
        </div>
        <button
          className="carousel-arrow carousel-prev"
          onClick={() => move(-1)}
          aria-label="Předchozí příběh"
        >
          <ChevronLeft />
        </button>
        <button
          className="carousel-arrow carousel-next"
          onClick={() => move(1)}
          aria-label="Další příběh"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="carousel-dots">
        {stories.map((s, i) => (
          <button
            key={s.slug}
            aria-label={`Zobrazit ${s.name}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => {
              if (!moving.current) {
                setAnimated(true);
                setPosition(i + 1);
              }
            }}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {stories[active].name}, {active + 1} ze {stories.length}
      </p>
      <LogoCarousel />
      <div className="center">
        <Link href="/pribehy-zakazniku/" className="button-link">
          Příběhy zákazníků <ArrowRight size={19} />
        </Link>
      </div>
    </section>
  );
}

function subscribeMobile(callback: () => void) {
  const query = window.matchMedia("(max-width: 767px)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function LogoCarousel() {
  const mobile = useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );
  const [offset, setOffset] = useState(1);
  const [animate, setAnimate] = useState(true);
  const moving = useRef(false);
  const logos = [stories[2], ...stories, ...stories];
  const move = (delta: number) => {
    if (moving.current) return;
    moving.current = true;
    setAnimate(true);
    setOffset((current) => current + delta);
  };
  return (
    <div className="logo-carousel container" aria-label="Zákazníci Sabris">
      <button aria-label="Předchozí zákazník" onClick={() => move(-1)}>
        <ChevronLeft />
      </button>
      <div className="logo-window">
        <div
          className="logo-row"
          style={{
            transform: `translateX(calc(${offset} * -100% / var(--logo-count)))`,
            transition: animate ? "transform 500ms ease" : "none",
          }}
          onTransitionEnd={(e) => {
            if (e.target !== e.currentTarget) return;
            moving.current = false;
            if (offset === 0 || offset === 4) {
              setAnimate(false);
              setOffset(offset === 0 ? 3 : 1);
            }
          }}
        >
          {logos.map((s, i) => {
            return (
              <Link
                key={`${s.slug}-${i}`}
                href={`/reference/${s.slug}/`}
                inert={i < offset || i > offset + (mobile ? 0 : 2)}
              >
                <Image src={media(s.logoOnLight)} width={180} height={80} alt={s.name} />
              </Link>
            );
          })}
        </div>
      </div>
      <button aria-label="Další zákazník" onClick={() => move(1)}>
        <ChevronRight />
      </button>
    </div>
  );
}
