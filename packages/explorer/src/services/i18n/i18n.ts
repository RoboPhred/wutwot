import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { isProd } from "@/runtime-env";

i18n.use(initReactI18next).init({
  fallbackLng: "en",

  ns: ["common"],
  defaultNS: "common",

  resources: {
    en: {
      common: require("@/translations/en/common.json"),
    },
  },

  debug: !isProd,

  interpolation: {
    // Not needed for react
    escapeValue: false,
  },

  react: {
    wait: true,
  },
});

export default i18n;
