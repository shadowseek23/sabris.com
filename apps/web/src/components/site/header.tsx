"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { aboutLinks, media, services } from "@/data/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" aria-label="Sabris – úvod" onClick={close}>
          <Image
            src={media("logo_sabris_simple.png")}
            width={173}
            height={45}
            className="brand"
            alt="Sabris"
            priority
          />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-nav"
          aria-label="Hlavní navigace"
          className={open ? "nav-open" : ""}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              close();
              e.currentTarget
                .closest("header")
                ?.querySelector<HTMLButtonElement>(".menu-toggle")
                ?.focus();
            }
          }}
        >
          <div className="nav-dropdown">
            <Link
              href="/o-sabris/o-nas/"
              onClick={close}
              aria-current={pathname.startsWith("/o-sabris") ? "page" : undefined}
            >
              O Sabris <ChevronDown size={13} />
            </Link>
            <div className="nav-submenu">
              {aboutLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={close}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="nav-dropdown">
            <Link
              href="/reseni-a-sluzby/"
              onClick={close}
              aria-current={pathname.startsWith("/reseni-a-sluzby") ? "page" : undefined}
            >
              Řešení a služby <ChevronDown size={13} />
            </Link>
            <div className="nav-submenu">
              {services.map((s) => (
                <Link key={s.slug} href={`/reseni-a-sluzby/${s.slug}/`} onClick={close}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/pribehy-zakazniku/" onClick={close}>
            Příběhy zákazníků
          </Link>
          <Link href="/pridej-se-k-nam/" onClick={close}>
            Přidej se k nám
          </Link>
          <Link href="/kontakt/" onClick={close}>
            Kontakt
          </Link>
          <span className="nav-language" lang="cs">
            Čeština
          </span>
        </nav>
      </div>
    </header>
  );
}
