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

## GA4 post-deployment checklist

1. Mark `form_submit_success`, `client_brief_download`, `email_click`, and `contact_click` as conversion events in GA4.
2. Set data retention to 14 months under `Admin > Data Settings > Data Retention`.
3. Add an internal traffic filter under `Admin > Data Filters` to exclude your own IP address.
4. Enable Google Signals only if remarketing is needed; otherwise keep it off.
5. Verify tracking in GA4 DebugView, or append `?debug_mode=true` to a page URL after deployment.

## Local GA4 testing

1. Add your GA ID to `.env`
2. Run the app:
   - `npm run dev`
3. Open:
   - `http://localhost:8080/?debug_mode=true`
4. Accept cookies in the banner.
5. Open DevTools Console and enable `Verbose` level to see analytics debug logs:
   - `[analytics] trackEvent attempt ...`
   - `[analytics] trackEvent skipped ...` (if blocked)
