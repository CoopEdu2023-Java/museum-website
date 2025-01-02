import React from "react";
import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import enTranslation from './locales/en/translationEndPage.json';
import zhTranslation from './locales/zh/translationEndPage.json';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        supportedLngs: ['en', 'zh'],

        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        detection: {
            order: ['localStorage', 'cookie', 'navigator'], // Language detection order
            caches: ['localStorage', 'cookie'], // Cache user language
        },
        resources: {
            en: {
                translation: enTranslation,
            },
            zh: {
                translation: zhTranslation,
            }
        },
        lng: "en", // if you're using a language detector, do not define the lng option
        fallbackLng: "zh",
        ns: ['translation'],
        defaultNS: 'translation',
        interpolation: {
            escapeValue: false
        }
    });

function App() {
    const { t } = useTranslation();

    return <h2>{t('Welcome to React')}</h2>;
}

// append app to dom
const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);