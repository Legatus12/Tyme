import { useTranslation } from 'react-i18next'

const Settings = () => {

    const { t } = useTranslation()

    return (
      <div className="settings full">
        <h1 className='settings-title'>{t('settings.title')}</h1>
        <h2>{t('settings.preferences')}</h2>
        <div className='settings-option'>
          <p>{t('settings.theme')}</p>
          <div class="toggle-switch">
            <label class="switch-label">
              <input type="checkbox" class="checkbox"/>
              <span class="slider"></span>
            </label>
          </div> 
        </div>
        <div className='settings-option'>
          <p>{t('settings.language')}</p>
          <div class="flex items-center">
            <select name="" id="">
              <option value="">Español</option>
              <option value="">English</option>
            </select>
          </div> 
        </div>
        <hr />
        <h2>{t('settings.notifications')}</h2>
        <hr />
        <h2>{t('settings.language')}</h2>
        <hr />
        <h2>{t('settings.account')}</h2>
      </div>
    )
}
  
export default Settings
  