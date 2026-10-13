import { MetadataRoute } from "next";
import { SupportedLang, SUPPORTED_TOOLS } from "@/locales/dictionary";

export const STATIC_PAGES = [
  "about",
  "contact",
  "dmca",
  "terms-of-service",
  "privacy-policy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ytsavex.com";
  const locales: SupportedLang[] = ["en", "fr", "es", "ar"];

  const routes: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    // 1. Pages d'accueil (Priorité 1.0 pour EN, 0.9 pour les autres)
    routes.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: lang === "en" ? 1.0 : 0.9,
    });

    // 2. Outils pSEO (Priorité 0.8)
    for (const tool of SUPPORTED_TOOLS) {
      routes.push({
        url: `${baseUrl}/${lang}/${tool}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // 3. Pages institutionnelles et légales (Priorité 0.5)
    for (const page of STATIC_PAGES) {
      routes.push({
        url: `${baseUrl}/${lang}/${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return routes;
}
