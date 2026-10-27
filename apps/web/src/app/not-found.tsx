import { MinimalButton, MinimalFooter, MinimalHero } from "@/components/minimal/shared";
import { MinimalNavigation } from "@/components/minimal/navigation";
import styles from "@/components/minimal/theme.module.css";
export default function NotFound() {
  return (
    <div className={styles.site}>
      <MinimalNavigation />
      <main id="main">
        <MinimalHero
          title="Tudy cesta nevede."
          description="Stránka neexistuje nebo už není součástí aktuální nabídky."
        />
        <section className={styles.wrap}>
          <MinimalButton href="/">Zpět na úvod</MinimalButton>
        </section>
      </main>
      <MinimalFooter />
    </div>
  );
}
