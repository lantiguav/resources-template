[![Generate resource index](https://github.com/lantiguav/resources-template/actions/workflows/generate-index.yml/badge.svg)](https://github.com/lantiguav/resources-template/actions/workflows/generate-index.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Use this template](https://img.shields.io/badge/use_this-template-2ea44f?logo=github)](https://github.com/OWNER/REPOSITORY/generate)

# Static Resource Publisher

A minimal GitHub template for publishing standalone HTML resources with clean URLs on Vercel.

Add an HTML file to the `pages` directory and GitHub Actions will automatically regenerate the resource index. Vercel then deploys the updated website.

## How it works

Each HTML file inside pages becomes its own resource. For example, pages/example.html will be available at /example.

Whenever a resource is added, updated, or removed, GitHub Actions rebuilds the homepage automatically. Vercel detects the change and deploys the latest version.

## Create a repository from the template

1. Select **Use this template** on GitHub.
2. Select **Create a new repository**.
3. Enter a repository name and choose its visibility.
4. Select **Create repository**.

A repository created from the template is independent from the original template and starts with its own Git history.

## Deploy to Vercel

1. Import the repository into Vercel.
2. In the project configuration, set **Root Directory** to `pages`.
3. Leave the framework preset as **Other** if Vercel does not detect one.
4. Deploy the project.

The `pages/vercel.json` file enables clean URLs:

```json
{
  "cleanUrls": true
}
```

This maps the files as follows:

| Repository file | Public URL |
| --- | --- |
| `pages/index.html` | `/` |
| `pages/example.html` | `/example` |
| `pages/marketing-guide.html` | `/marketing-guide` |

You can optionally add a custom domain from the Vercel project settings.

## Publish a resource

1. Generate or write a complete HTML document.
2. Make sure the document contains a descriptive `<title>` element:

   ```html
   <head>
     <title>Marketing Planning Guide</title>
   </head>
   ```

3. Open the `pages` directory in GitHub.
4. Select **Add file → Create new file**.
5. Give the file a URL-friendly name ending in `.html`, such as:

   ```text
   marketing-planning-guide.html
   ```

6. Paste the HTML and commit the file to the `main` branch.

The workflow will update the homepage automatically. After Vercel finishes deploying, the example above will be available at:

```text
https://your-domain.example/marketing-planning-guide
```

Use lowercase letters, numbers, and hyphens in filenames. Avoid spaces, accented characters, and underscores.

## Update a resource

Open its HTML file in GitHub, select the edit button, make the changes, and commit them. Vercel will deploy the updated version.

If the resource's `<title>` changes, the workflow will also update its title on the homepage.

## Delete a resource

Delete its HTML file from the `pages` directory and commit the change. The workflow will remove it from the generated homepage during the next run.


## Generate the index locally

Node.js is the only local requirement. From the repository root, run:

```bash
node scripts/generate-index.mjs
```

The script scans the HTML files in `pages`, reads their `<title>` elements, and rewrites `pages/index.html`.

Do not add resources directly to `pages/index.html`; it is generated automatically and future workflow runs will overwrite manual changes.

## Customize the homepage

The homepage markup and styles are defined in:

```text
scripts/generate-index.mjs
```

Update the HTML template inside that script, then run the workflow manually or execute the script locally. Do not customize the generated `pages/index.html` directly.

## Troubleshooting

### The homepage does not list a new resource

- Confirm that the file is directly inside `pages` and ends in `.html`.
- Confirm that the filename is not `index.html`.
- Open the **Actions** tab and inspect the latest workflow run.
- Run the workflow manually if necessary.

### The workflow cannot push the generated index

Confirm that **Settings → Actions → General → Workflow permissions** is set to **Read and write permissions**.

Branch protection rules can also prevent the workflow from pushing directly to `main`. Adjust the rule or update the workflow to use a pull request.

### The homepage works but resource URLs return 404

Confirm that the Vercel project's **Root Directory** is set to `pages` and that `pages/vercel.json` exists.

### The resource appears with the wrong title

Add or update the `<title>` element inside the resource's HTML document. If no title exists, the generator creates one from the filename.

## Security

Review generated HTML before publishing it, especially HTML containing JavaScript, external scripts, forms, redirects, or tracking code.

Only grant repository write access to people and automated tools that should be allowed to publish resources.

## License

The template code is available under the [MIT License](LICENSE). Resources and content added to repositories created from this template remain the property of their respective authors.
