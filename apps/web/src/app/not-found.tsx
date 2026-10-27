import { ButtonLink } from "@/components/site/shared";
export default function NotFound() {
  return (
    <section className="container not-found">
      <span className="eyebrow">404</span>
      <h1>Tudy cesta nevede.</h1>
      <p>Stránka neexistuje nebo už není součástí aktuální nabídky.</p>
      <ButtonLink href="/">Zpět na úvod</ButtonLink>
    </section>
  );
}
