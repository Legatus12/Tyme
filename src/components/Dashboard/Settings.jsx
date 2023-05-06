import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Settings = () => {

    const [theme, setTheme] = useState(localStorage.getItem('theme'))

    useEffect(() => {
      theme == 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
    }, [theme])

    const handleThemeSwitch = () => { 
      if(theme == 'dark') {
        setTheme('light')
        localStorage.setItem('darkMode', 'light')
      } else {
        setTheme('dark')
        localStorage.setItem('darkMode', 'dark')
      }
    }

    const { t, i18n } = useTranslation()

    const switchLanguage = (lan) => {
      i18n.changeLanguage(lan)
      localStorage.setItem('language', lan)
    }

    return (
      <div className="settings full">
        <h1 className='settings-title'>{t('settings.title')}</h1>

        <h2>{t('settings.preferences')}</h2>
        <div className='settings-option'>
          <p>{t('settings.theme')}</p>
          <button onClick={handleThemeSwitch}>theme</button>
        </div>
        <div className='settings-option'>
          <p>{t('settings.language')}</p>
          <div className='auth-languages'>
            <div className='flex justify-around items-center'>
              <button onClick={() => switchLanguage('en')} className={ i18n.resolvedLanguage == "en" ? 'font-black w-4' : 'w-4' }>en</button>
              <img src="src/img/en.png" className='w-8' />
            </div>
            <span className='w-[0.12rem] h-10 bg-silver'>&nbsp;</span>
            <div className='flex justify-around items-center'>
              <button onClick={() => switchLanguage('es')} className={ i18n.resolvedLanguage == "es" ? 'font-black w-4' : 'w-4' }>es</button>
              <img src="src/img/es.png" className='w-8' />
            </div>
          </div>
        </div>
        
        <h2>{t('settings.notifications')}</h2>

        <h2>{t('settings.language')}</h2>

        <h2>{t('settings.account')}</h2>
        
      </div>
    )
}
  
export default Settings
  