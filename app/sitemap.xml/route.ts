// app/sitemap.xml/route.ts

export async function GET() {
    const baseUrl = "https://mamdouh.mountain-egy.site";

    // Static pages
    const staticPages = [
        "",
    ];

    // Build all URLs
    const urls: string[] = [
        ...staticPages.map((slug) => `${baseUrl}/${slug}`),
    ];

    // Create sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
            .map(
                (url) => `
      <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
            )
            .join("")}
  </urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
