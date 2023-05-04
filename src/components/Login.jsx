import { useState } from 'react'
import Header from './Header'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from 'firebase/auth'
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'

const Login = ({setUser}) => {
  
    const { t } = useTranslation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const signIn = (e) => {
      e.preventDefault()
      signInWithEmailAndPassword(auth, email, password)
      .then(credentials => handleUser(credentials))
      .catch(error => console.log(error))
    }

    const signInWithGoogle = (e) => {
      e.preventDefault()
      signInWithPopup(auth, new GoogleAuthProvider())
      .then(credentials => handleUser(credentials))
      .catch(error => console.log(error))
    }

    const handleUser = (credentials) => {
      if (credentials) {
        setUser(credentials.user);
      } else {
        setUser(null);
      }
    };

    return (
      <div className='auth full'>
        <Header />
        <form className='auth-form'>

          <h1 className='auth-title'>{t('auth.loginTitle')}</h1>

          <p className='auth-text'>{t('auth.loginIntro')}</p>

          <input type="email" placeholder={t('mail')}
          value={email} onChange={e => setEmail(e.target.value)}
          className='auth-input' />

          <input type="password" placeholder={t('pass')} 
          value={password} onChange={e => setPassword(e.target.value)}
          className='auth-input' />

          <p value={msg}
          className='h-6'></p>

          <button onClick={signIn} className='auth-button p-2'>{t('auth.login')}</button>
          
          <Link to='/signup' className='auth-redirect self-center'>{t('auth.signupRedirect')}</Link>

          <hr className='my-8'/>

          <button onClick={signInWithGoogle} className='auth-button flex justify-center items-center gap-4 p-4'>
            <p>{t('auth.google')}</p>
            <img src="src/img/google.png" className='w-8'/>
          </button>

        </form>
      </div>
    )
}
  
export default Login