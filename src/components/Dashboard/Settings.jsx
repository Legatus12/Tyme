import { useTranslation } from 'react-i18next'
import ThemeSwitcher from './settings/ThemeSwitcher'
import LanguageSwitcher from './settings/LanguageSwitcher'
import { useContext, useState } from 'react'
import { GlobalContext } from '../../GlobalProvider'
import { auth } from '../../../firebase'
import { updatePassword, deleteUser } from 'firebase/auth'
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'

const Settings = () => {

  const { user } = useContext(GlobalContext)

  const { t } = useTranslation()

  const [reset, setReset] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [smth, setSmth] = useState(false)

  //

  const handleOld = (event) => {
    setOldPassword(event.target.value)
    if(event.target.value !== '' && newPassword != '' && confirmPassword != '')
      setSmth(true)
    else
      setSmth(false)
  }

  const handleNew = (event) => {
    setNewPassword(event.target.value)
    if(event.target.value !== '' && oldPassword != '' && confirmPassword != '')
      setSmth(true)
    else
      setSmth(false)
  }

  const handleConfirm = (event) => {
    setConfirmPassword(event.target.value)
    if(event.target.value !== '' && oldPassword != '' && newPassword != '')
      setSmth(true)
    else
      setSmth(false)
  }

  const handleSubmit = () => {
    if(smth) {
      if(newPassword === confirmPassword) {
        const credential = EmailAuthProvider.credential(
          user.email,
          oldPassword
        )
        reauthenticateWithCredential(user, credential).then(() => {
          updatePassword(auth.currentUser, confirm).then(() => {
            clear()
            alert(t('settings.resetSuccess'))
          }).catch(error => handleFirebaseAuthError(error))
        }).catch(error => handleFirebaseAuthError(error))
      } else setMsg(t('settings.noMatch'))
    } else console.log('test')
  }

  const handleFirebaseAuthError = (error) => {
    console.log(error.code)
    switch (error.code) {
      case 'auth/weak-password':
        setMsg(t('error.weak'))
        break
      case 'auth/wrong-password':
        setMsg(t('error.wrongPassword'))
        break
      default:
        setMsg(t('error.default'))
        break
    }
  }

  const clear = () => {
    if(!reset)
      setReset(true)
    else {
      setReset(false)
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setMsg('')
      setSmth(false)
    }
  }

  const signOut = () => {
    auth.signOut()
    location.reload()
  }

  const deleteAccount = () => {
    if(confirm(t('settings.confirmDelete'))) {
      deleteUser(user).then(() => {
        location.reload()
      }).catch(error => console.log(error))
    }
  }

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

      <h2>{t('settings.account')}</h2>
      <div className='account-option'>
        <h3 className='whitespace-nowrap'>{t('settings.mail')}</h3>
        <hr />
        <p>{user.email}</p>
      </div>
      <div className='drop'>
        <button className='modal-delete' onClick={clear}>{reset ? t('tyme.cancel') : t('settings.reset')}</button>
        {reset && (
          <div className="drop-flex">
            <div>
              <input placeholder={t('settings.oldPassword')} type="password" value={oldPassword} onChange={handleOld} />
              <input placeholder={t('settings.newPassword')} type="password" value={newPassword} onChange={handleNew} />
              <input placeholder={t('settings.confirmPassword')} type="password" value={confirmPassword} onChange={handleConfirm} />
            </div>
            <div>
              <p className='modal-error md:text-right'>{msg}</p>
              <button onClick={handleSubmit} className={`notes-submit ${smth ? 'notes-smth' : 'notes-none'}`}>{t('settings.reset')}</button>
            </div>
            
          </div>
          
        )}
      </div>
      <div className='drop'>
        <button className='modal-delete' onClick={signOut}>{t('settings.signOut')}</button>
      </div>
      <div className='drop'>
        <button className='modal-delete' onClick={deleteAccount}>{t('settings.delete')}</button>
      </div>
    </div>
  )
}
  
export default Settings
  