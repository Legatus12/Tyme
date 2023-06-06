import { useTranslation } from 'react-i18next'
import ThemeSwitcher from '../ThemeSwitcher'
import LanguageSwitcher from '../LanguageSwitcher'
import { useContext } from 'react'
import { AuthContext } from '../../AuthProvider'
import { auth } from '../../../firebase'

const Settings = () => {

  const user = useContext(AuthContext)

  const { t } = useTranslation()

  //

  return (
    <div className="settings full">
      <h1 className='settings-title'>{t('settings.title')}</h1>

      <h2>{t('settings.preferences')}</h2>
      <div className='settings-option'>
        <p>{t('settings.theme')}</p>
        <hr />
        <ThemeSwitcher />
      </div>
      <div className='settings-option'>
        <p>{t('settings.language')}</p>
        <hr />
        <LanguageSwitcher />
      </div>
      
      <h2>{t('settings.notifications')}</h2>

      <h2>{t('settings.account')}</h2>
      <div>
        <form>
          <div className='settings-option'>
            <label htmlFor="">{t('settings.username')}</label>
            <hr />
            <input type="text" value={user.displayName} />
          </div>
          <div className='settings-option'>
            <label htmlFor="">{t('settings.mail')}</label>
            <hr />
            <input type="text" value={user.email} />
          </div>
        </form>
      </div>
      <div className='settings-option'>
        <hr />
        <button onClick={() => auth.signOut()}>cerrar sesion</button>
      </div>
      
    </div>
  )
}
  
export default Settings
  