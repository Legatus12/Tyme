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
          loading: 'cargando...',
          mail: 'correo electrónico',
          pass: 'contraseña',
          cancel: 'cancelar',
          confirmDelete: '¿Desea continuar con el borrado?',
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
          overview:{
            title: 'General',
            today: 'Hoy',
            incoming: 'Próximamente',
            todayMsg: '+ añade un tyme',
            incomingMsg: 'nada en el horizonte',
            in: 'dentro de',
            day: 'día',
            days: 'días',
          },
          charts: {
            title: 'Estadísticas',
            tracking: 'Seguimiento de las úlimas 2 semanas',
            project: 'proyecto',
            habit: 'hábito',
            tbp: 'tymes clasificados por proyectos'
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
            reset: 'cambiar contraseña',
            newPassword: 'escribe la nueva contraseña...',
            confirmPassword: 'confirma la nueva contraseña...',
            signOut: 'cerrar sesión',
            noMatch: 'La confirmación no coincide.',
            oldPassword: 'contraseña actual...',
            delete: 'eliminar cuenta',
            resetSuccess: 'Contraseña actualizada con éxito.',
            confirmDelete: '¿Está seguro de que desea borrar su cuenta?'
          },
          notes : {
            title: 'Notas',
            write: 'Escribe algo...',
            save: 'guardar'
          },
          projects: {
            title: 'Proyectos',
            deleteMsg: '¿Deseas eliminar también los tymes asociados a este proyecto?',
            delete: 'eliminar solo el proyecto',
            deleteAll: 'eliminar proyecto y tymes',
            deleteThis: 'eliminar proyecto',
            add: '+ crear un proyecto',
            save: 'crear proyecto'
          },
          habits: {
            title: 'Hábitos',
            add: '+ crear un hábito',
            write: 'Escribe el nombre del hábito',
            save: 'crear hábito'
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
            d: {
              0: 'D',
              1: 'L',
              2: 'M',
              3: 'X',
              4: 'J',
              5: 'V',
              6: 'S'
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
            alreadyInUse: 'Correo electrónico en uso.',
            weak: 'La nueva contraseña es demasiado corta.'
          },
          tyme: {
            withoutTitle: 'Sin título',
            withoutDesc: 'Añade una descripción',
            date: 'fecha',
            save: 'guardar cambios',
            add: 'crear tyme',
            tag: 'proyecto',
            withoutProj: 'ninguno',
            close: 'cerrar',
            cancel: 'cancelar',
            delete: 'eliminar',
            done: 'completado',
            noTitle: 'Es necesario añadir un título.'
          },
        }
      },
      en: {
        translation: {
          loading: 'loading...',
          mail: 'email',
          pass: 'password',
          cancel: 'cancel',
          confirmDelete: 'Do you wish to proceed with the deletion?',
          auth: {
            loginTitle: '¡Welcome!',
            loginIntro: 'Just in time.',
            login: 'Log in',
            signupTitle: 'Register now',
            signupIntro: "It's TYME to start!",
            signup: 'create an account',
            signupRedirect: "You still don't have an account?",
            loginRedirect: 'You already have an account?',
            google: 'continue with Google',
            reset: '¿Have you forgotten your password?',
            continue: 'send a recovery mail',
            sent: 'the recovery mail has been sent'
          },
          verify: {
            message: "To finish registration, click on the link we sent to your email. Once you verify your account, you will be able to access all the functions in our platform. If you don't recieve the recovery mail in a few minutes, check your spam folder and/or refresh.",
            cancel: 'cancel process'
          },
          overview:{
            title: 'General',
            today: 'Today',
            incoming: 'Coming soon',
            todayMsg: '+ add a tyme',
            incomingMsg: 'nothing on the horizon',
            in: 'in',
            day: 'a day',
            days: 'days',
          },
          charts: {
            title: 'Stats',
            tracking: 'Last 2 weeks follow up',
            project: 'project',
            habit: 'habit',
            tbp: 'tymes classified by projects'
          },
          settings: {
            title: 'Settings',
            preferences: 'Preferences',
            theme: 'Theme',
            language: 'Language',
            account: 'Account',
            username: 'Username',
            mail: 'Email',
            notifications: 'Notifications',
            reset: 'change password',
            newPassword: 'write your new password...',
            confirmPassword: 'confirm your new password...',
            signOut: 'log out',
            noMatch: 'The confirmation does not match.',
            oldPassword: 'current password...',
            delete: 'delete account',
            resetSuccess: 'Password updated successfully.',
            confirmDelete: 'Are you sure you want to delete your account?'
          },
          notes : {
            title: 'Notes',
            write: 'Write something...',
            save: 'save'
          },
          projects: {
            title: 'Projects',
            deleteMsg: 'Do you wish to delete the tymes associated with this project?',
            delete: 'delete just the protect',
            deleteAll: 'delete project and tymes',
            deleteThis: 'delete project',
            add: '+ create a project',
            save: 'create project'
          },
          habits: {
            title: 'Habits',
            add: '+ create a habit',
            write: 'Write the name of the habit',
            save: 'create habit'
          },
          lightMode: 'light',
          darkMode: 'dark',
          date: {
            day: {
              0: 'Sunday',
              1: 'Monday',
              2: 'Tuesday',
              3: 'Wednesday',
              4: 'Thursday',
              5: 'Friday',
              6: 'Saturday'
            },
            d: {
              0: 'D',
              1: 'L',
              2: 'M',
              3: 'X',
              4: 'J',
              5: 'V',
              6: 'S'
            },
            month: {
              0: 'January',
              1: 'February',
              2: 'March',
              3: 'April',
              4: 'May',
              5: 'June',
              6: 'July',
              7: 'August',
              8: 'September',
              9: 'October',
              10: 'November',
              11: 'December'
            }
          },
          error: {
            userNotFound: 'User not found.',
            wrongPassword: 'Wrong password.',
            invalidEmail: 'Invalid Email.',
            userDisabled: 'The user has been disabled.',
            default: 'An error has ocurred during log in.',
            alreadyInUse: 'This email has already been used.',
            weak: 'The new password is too short.'
          },
          tyme: {
            withoutTitle: 'Without title',
            withoutDesc: 'Add a description',
            date: 'Date',
            save: 'save changes',
            add: 'create a tyme',
            tag: 'project',
            withoutProj: 'none',
            close: 'close',
            cancel: 'cancel',
            delete: 'delete',
            done: 'completed',
            noTitle: 'It is necessary to add a title.'
          },
        }
      }
    }
  });

export default i18n