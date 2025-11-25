import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';
import tr from './tr.json';
import en from './en.json';

const resources = {
  tr: { translation: tr },
  en: { translation: en },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    const locales = Localization.getLocales();
    const language = locales[0]?.languageCode || 'tr';
    callback(language);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr',
    debug: __DEV__,
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3',
  });

export default i18n;

