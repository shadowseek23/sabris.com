import type { Metadata } from "next";
import { MinimalNavigation } from "@/components/minimal/navigation";
import { MinimalFooter } from "@/components/minimal/shared";
import styles from "@/components/minimal/theme.module.css";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export default function MinimalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.site}>
      <MinimalNavigation />
      <main id="main">{children}</main>
      <MinimalFooter />
    </div>
  );
}
