import { useTranslation } from 'react-i18next'
import ThemeSwitcher from '../ThemeSwitcher'
import LanguageSwitcher from '../LanguageSwitcher'

const Settings = () => {

    const { t } = useTranslation()

    return (
      <div className="settings full">
        <h1 className='settings-title'>{t('settings.title')}</h1>

        <h2>{t('settings.preferences')}</h2>
        <div className='settings-option'>
          <p>{t('settings.theme')}</p>
          <ThemeSwitcher />
        </div>
        <div className='settings-option'>
          <p>{t('settings.language')}</p>
          <LanguageSwitcher />
        </div>
        
        <h2>{t('settings.notifications')}</h2>

        <h2>{t('settings.language')}</h2>

        <h2>{t('settings.account')}</h2>
        
      </div>
    )
}
  
export default Settings
  