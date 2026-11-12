import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/profile";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/simple/`, priority: 0.9 },
    ...projects.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}/`, priority: 0.7 })),
  ];
}
