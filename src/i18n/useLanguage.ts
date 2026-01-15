import { useTranslation } from 'react-i18next';
import type { Language } from './types';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = async (lang: Language): Promise<void> => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = i18n.language as Language;

  return {
    currentLanguage,
    changeLanguage,
    isEnglish: currentLanguage === 'en',
    isJapanese: currentLanguage === 'ja',
  };
};
