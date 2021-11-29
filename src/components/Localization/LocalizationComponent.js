import React from 'react';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import languageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import i18next from 'i18next';



export function Localization() {

    return (

        i18n
            .use(initReactI18next)
            .use(languageDetector)
            .use(HttpApi)

            .init({
                //if you're using a language detector don't define the lng option
                fallbackLng: "en",

                //language detection
                detection: {
                    order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
                    caches: ['cookie'],
                },

                //i18next http backend
                backend: {
                    loadPath: '../../assets/locales/{{lng}}/translation.json'

                },

                react: { useSuspense: false }
            })

    )

}

export default Localization