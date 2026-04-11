# Portfolio Workspace

The active portfolio is the Next.js site in the repository root.

## Main Site

```bash
npm install
npm run dev
```

The main portfolio runs on `http://localhost:3000`.

### Build

```bash
npm run build
```

## Theme Support

The root portfolio now uses a simplified two-mode theme system:

- `Light`
- `Dark`

The selected mode is saved in `localStorage`, and old stored theme values are automatically mapped to the new light/dark system.

## Content

Update the portfolio text and links here:

- `components/siteData.js`

Theme logic lives here:

- `components/ThemeToggle.js`
- `components/themeOptions.js`
- `app/globals.css`

## Secondary Stack

The separate Angular + Express setup still exists in:

- `frontend/`
- `backend/`

It is not used by the main Next.js portfolio.
