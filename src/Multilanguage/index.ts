import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import english from './en.json';
export const resources = {
  en: english,
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  resources,
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
});

export default i18n;
