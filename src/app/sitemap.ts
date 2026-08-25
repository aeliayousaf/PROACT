import type { MetadataRoute } from "next";
import { practiceAreas } from "../../content/practice-areas";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.proactlegalsolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/practice-areas",
    "/professionals",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
  }));

  const areas = practiceAreas.map((area) => ({
    url: `${base}/practice-areas/${area.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...areas];
}
