import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://geplic.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: "https://geplic.com/login",
      lastModified: new Date(),
    },

    {
      url: "https://geplic.com/signup",
      lastModified: new Date(),
    },

    {
      url: "https://geplic.com/privacy",
      lastModified: new Date(),
    },

    {
      url: "https://geplic.com/terms",
      lastModified: new Date(),
    },
  ];
}