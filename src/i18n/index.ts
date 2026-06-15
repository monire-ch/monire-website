import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import de from './de.json';
import pl from './pl.json';

const LANGUAGE_STORAGE_KEY = 'monire-language';
const supportedLanguages = ['en', 'de'] as const;
type SupportedLanguage = (typeof supportedLanguages)[number];

const isSupportedLanguage = (language: string | null): language is SupportedLanguage =>
  supportedLanguages.includes(language as SupportedLanguage);

const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return 'en';

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isSupportedLanguage(savedLanguage) ? savedLanguage : 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
    pl: { translation: pl },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (language) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = isSupportedLanguage(language) ? language : 'en';
  }

  if (typeof window !== 'undefined' && isSupportedLanguage(language)) {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = isSupportedLanguage(i18n.language) ? i18n.language : 'en';
}

export default i18n;
