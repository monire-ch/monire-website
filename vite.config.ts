import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import { ROUTE_SEO, SITEMAP_ROUTES } from "./src/lib/seo";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const upsertTag = (html: string, matcher: RegExp, tag: string) =>
  matcher.test(html) ? html.replace(matcher, tag) : html.replace("</head>", `    ${tag}\n  </head>`);

const removeTags = (html: string, matcher: RegExp) => html.replace(matcher, "");

const routeToHtmlPath = (outDir: string, route: string) =>
  route === "/" ? path.join(outDir, "index.html") : path.join(outDir, route.slice(1), "index.html");

const seoBuildPlugin = () => ({
  name: "seo-build-plugin",
  closeBundle() {
    const outDir = path.resolve(__dirname, "dist");

    Object.entries(ROUTE_SEO).forEach(([route, seo]) => {
      const htmlPath = routeToHtmlPath(outDir, route);
      if (!fs.existsSync(htmlPath)) return;

      let html = fs.readFileSync(htmlPath, "utf8");
      const alternateTags = Object.entries(seo.alternateUrls)
        .map(([locale, url]) => `<link rel="alternate" hreflang="${locale}" href="${url}">`)
        .join("\n    ");

      html = html.replace(/<html([^>]*)>/, `<html lang="${seo.locale}">`);
      html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(seo.title)}</title>`);
      html = upsertTag(
        html,
        /<meta name="description" content="[^"]*"\s*\/?>/,
        `<meta name="description" content="${escapeHtml(seo.description)}">`
      );
      if (seo.keywords?.length) {
        html = upsertTag(
          html,
          /<meta name="keywords" content="[^"]*"\s*\/?>/,
          `<meta name="keywords" content="${escapeHtml(seo.keywords.join(", "))}">`
        );
      }
      html = upsertTag(
        html,
        /<meta name="robots" content="[^"]*"\s*\/?>/,
        '<meta name="robots" content="index,follow">'
      );
      html = upsertTag(
        html,
        /<link rel="canonical" href="[^"]*"\s*\/?>/,
        `<link rel="canonical" href="${seo.canonicalUrl}">`
      );
      html = removeTags(html, /\s*<link rel="alternate" hreflang="[^"]+" href="[^"]*"\s*\/?>/g);
      html = html.replace("</head>", `    ${alternateTags}\n  </head>`);
      html = upsertTag(
        html,
        /<meta property="og:title" content="[^"]*"\s*\/?>/,
        `<meta property="og:title" content="${escapeHtml(seo.title)}">`
      );
      html = upsertTag(
        html,
        /<meta property="og:description" content="[^"]*"\s*\/?>/,
        `<meta property="og:description" content="${escapeHtml(seo.description)}">`
      );
      html = upsertTag(
        html,
        /<meta property="og:url" content="[^"]*"\s*\/?>/,
        `<meta property="og:url" content="${seo.canonicalUrl}">`
      );
      html = upsertTag(
        html,
        /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
        `<meta name="twitter:title" content="${escapeHtml(seo.title)}">`
      );
      html = upsertTag(
        html,
        /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
        `<meta name="twitter:description" content="${escapeHtml(seo.description)}">`
      );

      fs.writeFileSync(htmlPath, html);
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${SITEMAP_ROUTES.map(
      ({ url, alternates, changefreq, priority }) =>
        `  <url>\n    <loc>${url}</loc>${alternates ? `\n${Object.entries(alternates)
          .map(([locale, alternateUrl]) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${alternateUrl}" />`)
          .join("\n")}` : ""}\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    ).join("\n")}\n</urlset>\n`;

    fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: path.resolve(__dirname, "src/prerender.tsx"),
    }),
    seoBuildPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
}));
