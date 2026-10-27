"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { stories, media } from "@/data/content";

export function ReferenceGrid() {
  const [selected, setSelected] = useState<string[]>([]);
  const visible = stories.filter((s) => selected.length === 0 || selected.includes(s.category));
  return (
    <div className="reference-browser">
      <fieldset className="reference-filters">
        <legend>Odvětví</legend>
        {stories.map((s) => (
          <label key={s.category}>
            <input
              type="checkbox"
              checked={selected.includes(s.category)}
              onChange={(e) =>
                setSelected((current) =>
                  e.target.checked
                    ? [...current, s.category]
                    : current.filter((c) => c !== s.category),
                )
              }
            />
            {s.category}
          </label>
        ))}
        {selected.length > 0 ? (
          <button onClick={() => setSelected([])}>Zrušit filtry</button>
        ) : null}
      </fieldset>
      <div>
        <p className="filter-count" role="status">
          {visible.length} {visible.length === 1 ? "příběh" : "příběhy"} zákazníků
        </p>
        <div className="reference-grid">
          {visible.map((s) => (
            <Link href={`/reference/${s.slug}/`} className="reference-card" key={s.slug}>
              <div className="reference-image">
                <Image src={media(s.image)} alt="" fill sizes="(max-width: 767px) 90vw, 380px" />
                <div className="reference-overlay" />
                <Image
                  src={media(s.logo)}
                  alt={s.name}
                  width={190}
                  height={80}
                  className="reference-logo"
                />
              </div>
              <div className="reference-body">
                <span className="eyebrow">{s.category}</span>
                <h2>{s.name}</h2>
                <p>{s.summary}</p>
                <span className="text-link">
                  Přečíst příběh <ArrowRight size={17} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
