import { useContext } from 'react'
import { AuthContext } from '../../AuthProvider'
import { useTranslation } from 'react-i18next'

const User = () => {

  const user = useContext(AuthContext)

  const { t } = useTranslation()

  //

  return (
    <div className="user full">
      <h1>{t('user.title')}</h1>
      <div className='info'>
        <div className='img-container'>
          <img src="/src/img/user.png" alt="" />
        </div>
        <div>
          <form className='flex flex-col w-full'>
            <div className='info-container'>
              <label htmlFor=""></label>
              <hr />
              <input type="text" value={user.displayName} />
            </div>
            
            <input type="text" value={user.email} />
            <input type="text" value={user.phoneNumber} />
          </form>
        </div>
      </div>
    </div>
  )
}
  
export default User