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

## Events currently tracked

- `page_view` (all route changes)
- `contact_click`
- `contact_modal_open`
- `email_click`
- `case_study_click`
- `case_study_external_site_click`
- `pricing_nav_click`
- `form_submit_attempt`
- `form_submit_success`
- `form_submit_error`
- `blog_cta_click`
- `footer_contact_click`
- `client_brief_download`
- `utm_landing`

## GA4 admin setup (exact)

1. In GA4, mark these events as conversions:
   - `form_submit_success`
   - `client_brief_download`
   - `email_click`
   - `contact_click`
2. Create event-scoped custom dimensions for reporting:
   - `location`
   - `label`
   - `destination`
   - `service`
   - `case_study`
   - `form_location`
   - `error_type`
   - `error_message`
   - `error_fields`
   - `source`
   - `medium`
   - `campaign`
   - `content`
   - `landing_page`
   - `page_path`
3. Set data retention to 14 months under `Admin > Data Settings > Data Retention`.
4. Add an internal traffic filter under `Admin > Data Filters` to exclude your own IP address.
5. Keep Google Signals off unless remarketing is explicitly needed.
6. Validate events in DebugView after deployment.

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
