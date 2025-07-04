
import { useState, useEffect } from 'react';
import languageService, { Language } from '../services/languageService';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languageService.getCurrentLanguage()
  );

  const changeLanguage = (langCode: string) => {
    languageService.setLanguage(langCode);
    setCurrentLanguage(languageService.getCurrentLanguage());
  };

  const t = (key: string): string => {
    return languageService.translate(key);
  };

  useEffect(() => {
    const lang = languageService.getCurrentLanguage();
    document.documentElement.dir = lang.rtl ? 'rtl' : 'ltr';
  }, [currentLanguage]);

  return {
    currentLanguage,
    changeLanguage,
    t,
    allLanguages: languageService.getAllLanguages()
  };
};
