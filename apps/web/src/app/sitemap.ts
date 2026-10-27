import type { MetadataRoute } from "next";
import { services, stories } from "@/data/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "reseni-a-sluzby",
    "pribehy-zakazniku",
    "pridej-se-k-nam",
    "kontakt",
    "o-sabris/o-nas",
    "o-sabris/media",
    "o-sabris/certifikaty",
    "o-sabris/oceneni",
    "zasady-ochrany-osobnich-udaju",
    ...services.map((s) => `reseni-a-sluzby/${s.slug}`),
    ...stories.map((s) => `reference/${s.slug}`),
  ];
  return paths.map((path) => ({ url: `https://www.sabris.com/${path}${path ? "/" : ""}` }));
}
