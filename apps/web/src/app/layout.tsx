import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const openSans = localFont({
  src: [
    { path: "../assets/fonts/open-sans-300.ttf", weight: "300" },
    { path: "../assets/fonts/open-sans-400.ttf", weight: "400" },
    { path: "../assets/fonts/open-sans-600.ttf", weight: "600" },
    { path: "../assets/fonts/open-sans-700.ttf", weight: "700" },
  ],
  variable: "--font-open-sans",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://www.sabris.com"),
  title: { default: "Sabris | Smart potravinářství, MES a MOM", template: "%s | Sabris" },
  description:
    "Propojujeme výrobu, technologie a lidi. Smart potravinářství, MES a MOM s friendly professional přístupem Sabris.",
  openGraph: {
    locale: "cs_CZ",
    type: "website",
    siteName: "Sabris",
    images: [{ url: "/media/Group-316.png", alt: "Sabris – propojení člověka a technologií" }],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={openSans.variable}>
      <body>
        <a className="skip-link" href="#main">
          Přejít na obsah
        </a>
        {children}
      </body>
    </html>
  );
}
