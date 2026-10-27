"use client";

import { useState } from "react";
import { stories } from "@/data/content";
import { CaseCard } from "./shared";
import styles from "./theme.module.css";

export function MinimalCases() {
  const [category, setCategory] = useState("Vše");
  const shown = stories.filter((s) => category === "Vše" || s.category === category);
  return (
    <div className={`${styles.wrap} ${styles.results}`}>
      <div className={styles.filterBar} role="group" aria-label="Filtrovat příběhy podle odvětví">
        {["Vše", ...stories.map((s) => s.category)].map((c) => (
          <button key={c} aria-pressed={c === category} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
        <span role="status">
          {shown.length} {shown.length === 1 ? "příběh" : "příběhy"}
        </span>
      </div>
      <div className={styles.caseGrid}>
        {shown.map((s) => (
          <CaseCard story={s} key={s.slug} />
        ))}
      </div>
    </div>
  );
}
