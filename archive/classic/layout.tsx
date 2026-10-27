import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/shared";

export default function ClassicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
