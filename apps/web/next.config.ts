import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      ...["inovace-sap", "firemni-analytika", "digitalni-firma", "podpora-aplikaci"].map(
        (slug) => ({
          source: `/reseni-a-sluzby/${slug}`,
          destination: "/reseni-a-sluzby/",
          permanent: true,
        }),
      ),
      {
        source: "/o-sabris/nasi-partneri",
        destination: "/reseni-a-sluzby/smart-potravinarstvi/#partnerstvi",
        permanent: true,
      },
      { source: "/reference/kosik-cz-2", destination: "/reference/kosik-cz/", permanent: true },
    ];
  },
  images: {
    // Optimalizované formáty (AVIF má lepší kompresi, WebP fallback).
    formats: ["image/avif", "image/webp"],
    // Šířky pro responsive srcset — lad podle skillu `empirical-srcset`.
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1536, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 192, 256, 384],
    qualities: [50, 55, 60, 75, 85],
    // Sanity CDN pro obrázky spravované v CMS.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Bezpečnostní hlavičky bez rizika. Co záměrně chybí (HSTS s preload, CSP)
  // zvaž a zdůvodni per projekt.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
