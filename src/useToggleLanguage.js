import { useTranslation } from 'react-i18next';

const useLanguageToggle = () => {
  const { i18n } = useTranslation();  // Access i18n instance from react-i18next

  // This will store the current language to trigger re-render when the language changes
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang); // Change the language using i18n's method
  };

  return {  toggleLanguage };
};

export default useLanguageToggle;
