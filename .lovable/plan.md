

## Plan: Add i18n with `react-i18next` (EN, DE, PL)

### Overview
Install `react-i18next` and `i18next`, create translation JSON files for all three languages, set up the i18n config, and wire the existing language switcher in the navbar to change the active language. All visible strings across every section will be translated. You can review and adjust the DE/PL translations afterward.

### File Structure

```text
src/
├── i18n/
│   ├── index.ts              ← i18next config + init
│   ├── en.json                ← English translations
│   ├── de.json                ← German translations
│   └── pl.json                ← Polish translations
```

### Tasks

1. **Install dependencies** — `react-i18next` and `i18next`

2. **Create `src/i18n/index.ts`** — Initialize i18next with the three language resources, default language `en`, and `interpolation.escapeValue: false`

3. **Create translation JSON files** (`en.json`, `de.json`, `pl.json`) — Extract all visible strings from:
   - Navbar (link labels, CTA)
   - HeroSection (eyebrow, headline, subtitle, CTA)
   - FeaturesSection (section header, 6 feature titles + descriptions)
   - AboutSection (header, 3 story blocks, team names/roles)
   - ServicesSection (header, 2 service cards)
   - PricingSection (header, tab labels, plan names, all feature lists, CTA buttons, custom section)
   - PortfolioSection (header, project descriptions, category labels)
   - FAQSection (header, 6 Q&A pairs)
   - CTASection (header, CTA text)
   - ContactModal (title, labels, placeholders, button)
   - Footer (tagline, column headers, copyright)

4. **Import i18n in `src/main.tsx`** — Add `import '@/i18n'`

5. **Update all components** — Replace hardcoded strings with `t('key')` calls using `useTranslation()` hook

6. **Wire the language switcher** — In `Navbar.tsx`, call `i18n.changeLanguage(lang.code.toLowerCase())` when a language is selected, and derive `activeLang` from `i18n.language`

### Translation Key Convention
Namespaced by section, e.g.:
- `nav.about`, `nav.services`, `nav.contactUs`
- `hero.eyebrow`, `hero.headline`, `hero.subtitle`
- `features.title`, `features.items.0.title`
- `pricing.tabs.webDesign`, `pricing.plans.starter.name`
- `faq.items.0.q`, `faq.items.0.a`

### Notes
- DE and PL translations will be AI-generated drafts for you to review and refine
- The language switcher already exists — it just needs to call `i18n.changeLanguage()`
- No URL-based routing for languages (single-page, client-side switching)

