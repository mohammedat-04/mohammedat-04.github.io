# Atef Helali Portfolio

## Local

```bash
npm install
npm run dev
```

## Static Export

```bash
npm run build
```

The static site is generated in `out/`.

## GitHub Pages

This repo now includes a Pages workflow in `.github/workflows/pages.yml` that builds the Next.js app as a static export and deploys `out/`.

Important:

- The current remote repository is `mohammedat-04/Mohamed-Atef-Helali`.
- That repository will publish as a project page, not the root user site.
- The exact URL `https://mohammedat-04.github.io` only works if the repository name is `mohammedat-04.github.io`, or if you deploy this code from a separate repo with that exact name.

If you keep the current repo name, the GitHub Pages URL will be:

```text
https://mohammedat-04.github.io/Mohamed-Atef-Helali/
```

If you want the root URL instead, rename the repo to `mohammedat-04.github.io` or push this project into a new repo with that exact name.
