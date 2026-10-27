import { MinimalHero, MinimalButton } from "@/components/minimal/shared";
import styles from "@/components/minimal/theme.module.css";

export default function MinimalNotFound() {
  return (
    <>
      <MinimalHero
        title="Tudy cesta nevede."
        description="Stránka neexistuje nebo už není součástí aktuální nabídky."
      />
      <div className={`${styles.wrap} ${styles.sectionSmall}`}>
        <MinimalButton href="/minimal/">Zpět na úvod</MinimalButton>
      </div>
    </>
  );
}
