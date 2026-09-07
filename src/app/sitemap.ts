import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://en.dainikjahan.com";
  return [{ url: base, lastModified: new Date(), changeFrequency: "hourly", priority: 1 }];
}
