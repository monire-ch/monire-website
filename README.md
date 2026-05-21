# Monire Website

Marketing site for Monire, built with Vite, React, TypeScript, and Tailwind CSS.

## Development

Requirements:

- Node.js
- npm

Install dependencies and start the dev server:

```sh
npm install
npm run dev
```

## Available scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint.
- `npm run test` runs the Vitest suite.

## Local GA4 testing

1. Add your GA ID to `.env`
   - `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
2. Run the app:
   - `npm run dev`
3. Open:
   - `http://localhost:8080/?debug_mode=true`
4. Accept cookies in the banner.
5. Open DevTools Console and enable `Verbose` level to see analytics debug logs:
   - `[analytics] trackEvent attempt ...`
   - `[analytics] trackEvent skipped ...` (if blocked)
6. Open DevTools Network:
   - Use `All` tab
   - Enable `Preserve log`
   - Filter by `collect` or `google-analytics`
