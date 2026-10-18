import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { caseStudies } from "@/lib/case-studies";
import { latestEntries } from "@/lib/latest";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = ["", "/about", "/work", "/book", "/mozambique", "/privacy", "/terms", "/faq"];
  const now = new Date();
  const staticEntries = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const caseStudyEntries = caseStudies.map((c) => ({
    url: `${base}/work/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  // /latest changes with every Instagram post; its date is the newest entry's.
  const latestEntry = {
    url: `${base}/latest`,
    lastModified: latestEntries[0] ? new Date(`${latestEntries[0].date}T00:00:00+02:00`) : now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  };
  return [...staticEntries, latestEntry, ...caseStudyEntries];
}
