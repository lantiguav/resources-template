import { readdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

const pagesDirectory = "pages";
const indexPath = join(pagesDirectory, "index.html");

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const files = (await readdir(pagesDirectory))
  .filter((file) => file.endsWith(".html") && file !== "index.html")
  .sort();

const resources = await Promise.all(
  files.map(async (file) => {
    const html = await readFile(join(pagesDirectory, file), "utf8");
    const slug = basename(file, ".html");

    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);

    const title =
      titleMatch?.[1]?.trim() ||
      slug
        .replaceAll("-", " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());

    return {
      slug,
      title,
    };
  }),
);

const resourceCards = resources
  .map(
    ({ slug, title }) => `
      <li>
        <a href="/${encodeURIComponent(slug)}">
          ${escapeHtml(title)}
        </a>
      </li>`,
  )
  .join("");

const indexHtml = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    >
    <title>Recursos | Lina Rodríguez Marketing</title>

    <style>
      :root {
        font-family: system-ui, sans-serif;
        color: #222;
        background: #fafafa;
      }

      body {
        max-width: 800px;
        margin: 0 auto;
        padding: 64px 24px;
      }

      h1 {
        margin-bottom: 8px;
      }

      ul {
        display: grid;
        gap: 16px;
        padding: 0;
        margin-top: 40px;
        list-style: none;
      }

      a {
        display: block;
        padding: 20px;
        color: inherit;
        font-size: 1.125rem;
        font-weight: 600;
        text-decoration: none;
        background: white;
        border: 1px solid #ddd;
        border-radius: 12px;
        transition:
          border-color 150ms ease,
          transform 150ms ease;
      }

      a:hover {
        border-color: #0084d1;
        transform: translateY(-2px);
      }
    </style>
  </head>

  <body>
    <main>
      <h1>Recursos</h1>
      <p>Herramientas y recursos de marketing para tu negocio.</p>

      <ul>
        ${
          resourceCards ||
          "<li>No hay recursos publicados todavía.</li>"
        }
      </ul>
    </main>
  </body>
</html>
`;

await writeFile(indexPath, indexHtml);

console.log(
  `Generated ${indexPath} with ${resources.length} resources.`,
);
