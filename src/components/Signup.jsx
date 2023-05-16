import { useState } from 'react'
import Header from './Header'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { Link } from "react-router-dom"

import { useTranslation } from 'react-i18next'

const Signup = () => {

    const { t } = useTranslation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const signUp = (e) => {
      e.preventDefault()
      createUserWithEmailAndPassword(auth, email, password)
      .then(credentials => console.log(credentials))
      .catch(error => console.log(error))
    }

    const signUpWithGoogle = (e) => {
      e.preventDefault()
      signInWithRedirect(auth, new GoogleAuthProvider())
      .then(credentials => console.log(credentials))
      .catch(error => console.log(error))
    }

    return (
      <div className='flex flex-col full'>
        <Header />
        <div className='auth full'>
          <img src="src/img/tyme.png" alt="TYME" className='auth-img'/>
          <form className='auth-form'>

            <h1 className='auth-title'>{t('auth.signupTitle')}</h1>

            <p className='auth-text'>{t('auth.signupIntro')}</p>

            <input type="email" placeholder={t('mail')}
            value={email} onChange={e => setEmail(e.target.value)}
            className='auth-input' />

            <input type="password" placeholder={t('pass')}
            value={password} onChange={e => setPassword(e.target.value)}
            className='auth-input' />

            <p value={msg}
            className='h-6'></p>

            <button onClick={signUp} className='auth-button p-2'>{t('auth.signup')}</button>
            
            <Link to='/login' className='auth-redirect self-center'>{t('auth.loginRedirect')}</Link>

            <hr className='my-8'/>

            <button onClick={signUpWithGoogle} className='auth-button flex justify-center items-center gap-4 p-4'>
              <p>{t('auth.google')}</p>
              <img src="../src/img/google.png" className='w-8'/>
            </button>

          </form>
        </div>
      </div>
    )
}
  
export default Signup