"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { media } from "@/data/content";
import styles from "./theme.module.css";

export function MinimalNavigation() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const links = [
    ["/minimal/reseni-a-sluzby/", "Řešení"],
    ["/minimal/pribehy-zakazniku/", "Naše práce"],
    ["/minimal/o-sabris/o-nas/", "O Sabris"],
    ["/minimal/pridej-se-k-nam/", "Kariéra"],
  ];
  return (
    <header className={`${styles.header} ${styles.wrap}`}>
      <Link
        href="/minimal/"
        aria-label="Sabris – minimalistická varianta"
        onClick={() => setOpen(false)}
      >
        <Image
          src={media("logo_sabris_simple.png")}
          width={173}
          height={45}
          alt="Sabris"
          className={styles.brand}
          priority
        />
      </Link>
      <button
        className={styles.menuToggle}
        aria-label={open ? "Zavřít menu" : "Otevřít menu"}
        aria-expanded={open}
        aria-controls="minimal-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={25} /> : <Menu size={25} />}
      </button>
      <nav
        id="minimal-nav"
        aria-label="Navigace minimalistické varianty"
        className={`${styles.nav} ${open ? styles.navOpen : ""}`}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            e.currentTarget.closest("header")?.querySelector<HTMLButtonElement>("button")?.focus();
          }
        }}
      >
        {links.map(([href, label]) => (
          <Link
            href={href}
            key={href}
            aria-current={path.startsWith(href) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link href="/minimal/kontakt/" className={styles.pill} onClick={() => setOpen(false)}>
          Pojďme se potkat <ArrowUpRight size={17} />
        </Link>
      </nav>
    </header>
  );
}
