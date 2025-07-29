import { MetadataRoute } from "next";

/**
 * Generates the robots.txt configuration for the application.
 * Specifies crawling rules and the sitemap location for web crawlers.
 * @returns {MetadataRoute.Robots} The robots configuration object.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/sign-in", "/upgrade"],
        disallow: ["/chat/*", "/privacy", "/terms"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/sitemap.xml`,
  };
}
