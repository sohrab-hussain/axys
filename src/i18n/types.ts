import en from '../locales/en.json';

// Define the structure of your translations
export type TranslationKeys = typeof en;

// Extend the i18next module to include your types
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: TranslationKeys;
    };
  }
}

export type Language = 'en' | 'ja';
