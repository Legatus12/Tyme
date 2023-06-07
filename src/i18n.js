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
          cancel: 'cancelar',
          auth: {
            loginTitle: '¡Bienvenido!',
            loginIntro: 'Llegas justo a tiempo.',
            login: 'iniciar sesión',
            signupTitle: 'Crea tu cuenta ahora',
            signupIntro: '¡Ha llegado el momento de empezar a ultizar TYME!',
            signup: 'crear cuenta',
            signupRedirect: '¿Todavía no tienes una cuenta?',
            loginRedirect: '¿Ya tienes una cuenta?',
            google: 'o continúa con Google',
            reset: '¿Has olvidado tu contraseña?',
            continue: 'enviar correo de recuperación',
            sent: 'correo de recuperación enviado a la dirección de correo proporcionada'
          },
          verify: {
            message: 'Para finalizar el proceso de registro, haz click en el enlace que hemos enviado a tu dirección de correo electrónico. Una vez que hayas verificado tu cuenta, podrás acceder a todas las funcionalidades de nuestra plataforma. Si no recibes el correo de confirmación en unos minutos, revisa tu carpeta de spam o correo no deseado. Después, refresca la página.',
            cancel: 'cancelar proceso'
          },
          user: {
            title: 'Tu perfil',
          },
          settings: {
            title: 'Configuración',
            preferences: 'Preferencias',
            theme: 'Tema',
            language: 'Idioma',
            account: 'Cuenta',
            username: 'Nombre de usuario',
            mail: 'Correo electrónico',
            notifications: 'Notificaciones',
          },
          overview:{
            today: 'Hoy',
            incoming: 'Próximamente',
            todayMsg: 'añade un TYME',
            incomingMsg: 'nada en el horizonte',
          },
          lightMode: 'claro',
          darkMode: 'oscuro',
          date: {
            day: {
              0: 'Domingo',
              1: 'Lunes',
              2: 'Martes',
              3: 'Miércoles',
              4: 'Jueves',
              5: 'Viernes',
              6: 'Sábado'
            },
            month: {
              0: 'Enero',
              1: 'Febrero',
              2: 'Marzo',
              3: 'Abril',
              4: 'Mayo',
              5: 'Junio',
              6: 'Julio',
              7: 'Agosto',
              8: 'Septiembre',
              9: 'Octubre',
              10: 'Noviembre',
              11: 'Diciembre'
            }
          },
          error: {
            userNotFound: 'El usuario no existe.',
            wrongPassword: 'Contraseña incorrecta.',
            invalidEmail: 'Correo electrónico inválido.',
            userDisabled: 'El usuario ha sido deshabilitado.',
            default: 'Ocurrió un error al iniciar sesión.',
            alreadyInUse: 'Correo electrónico en uso.'
          }
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