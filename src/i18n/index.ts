import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import de from './de.json';
import pl from './pl.json';
import { DEFAULT_LOCALE, getLocaleFromPathname, isSupportedLocale, SUPPORTED_LOCALES, type SupportedLocale } from '@/lib/localeRouting';

const LANGUAGE_STORAGE_KEY = 'monire-language';

const getInitialLanguage = (): SupportedLocale => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  return getLocaleFromPathname(window.location.pathname);
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
    pl: { translation: pl },
  },
  lng: getInitialLanguage(),
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: [...SUPPORTED_LOCALES],
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (language) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = isSupportedLocale(language) ? language : DEFAULT_LOCALE;
  }

  if (typeof window !== 'undefined' && isSupportedLocale(language)) {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = isSupportedLocale(i18n.language) ? i18n.language : DEFAULT_LOCALE;
}

export default i18n;
