import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      es: {
        translation: {
          mail: 'correo electrónico',
          pass: 'contraseña',
          auth: {
            loginTitle: '¡Bienvenido!',
            loginIntro: 'Llegas justo a tiempo.',
            login: 'iniciar sesión',
            signupTitle: 'Crea tu cuenta ahora',
            signupIntro: '¡Ha llegado el momento de empezar a ultizar TYME!',
            signup: 'crear cuenta',
            signupRedirect: '¿Todavía no tienes una cuenta?',
            loginRedirect: '¿Ya tienes una cuenta?',
            google: 'o continúa con Google'
          },
          settings: {
            title: 'Configuración',
            preferences: 'Preferencias',
            theme: 'Tema',
            language: 'Idioma',
            account: 'Cuenta',
            notifications: 'Notificaciones',
          },
          lightMode: 'claro',
          darkMode: 'oscuro',
        }
      },
      en: {
        translation: {
          mail: 'email',
          pass: 'password',
          auth: {
            welcome: 'Welcome!',
            login: 'log in',
            signup: 'sign up',
          }
        }
      }
    }
  });

export default i18n