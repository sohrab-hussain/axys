import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';

import en from '../locales/en.json';
import ja from '../locales/ja.json';
import type { Language } from './types';

const LANGUAGE_KEY = '@app_language';

// Get device language
const getDeviceLanguage = (): Language => {
  const locale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager?.settings?.AppleLocale ||
        NativeModules.SettingsManager?.settings?.AppleLanguages?.[0]
      : NativeModules.I18nManager?.localeIdentifier;

  const languageCode = locale?.split('_')[0]?.split('-')[0] || 'en';

  // Return 'ja' if Japanese, otherwise default to 'en'
  return languageCode === 'ja' ? 'ja' : 'en';
};

// Initialize i18n
const initI18n = async (): Promise<void> => {
  let savedLanguage: Language | null = null;

  try {
    const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (storedLang && (storedLang === 'en' || storedLang === 'ja')) {
      savedLanguage = storedLang as Language;
    }
  } catch (error) {
    console.error('Error loading saved language:', error);
  }

  await i18n.use(initReactI18next).init({
    // compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      ja: { translation: ja },
    },
    lng: savedLanguage || getDeviceLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

  // Save language preference when it changes
  i18n.on('languageChanged', async (lng: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lng);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  });
};

initI18n().then(r => {
  console.log('I18n', r);
});

export default i18n;
