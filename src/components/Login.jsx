import { useState } from 'react'
import Header from './Header'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, signInWithPopup, setPersistence, browserLocalPersistence } from 'firebase/auth'
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
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        setUser(result.user)
      }).catch((error) => {
        // An error happened.
        if (error.code === 'auth/account-exists-with-different-credential') {
          // Step 2.
          // User's email already exists.
          // The pending Google credential.
          var pendingCred = error.credential
          // The provider account's email address.
          var email = error.email
          // Get sign-in methods for this email.
          auth.fetchSignInMethodsForEmail(email).then(function(methods) {
            // Step 3.
            // If the user has several sign-in methods,
            // the first method in the list will be the "recommended" method to use.
            if (methods[0] === 'password') {
              // Asks the user their password.
              // In real scenario, you should handle this asynchronously.
              var password = promptUserForPassword() // TODO: implement promptUserForPassword.
              auth.signInWithEmailAndPassword(email, password).then(function(result) {
                // Step 4a.
                return result.user.linkWithCredential(pendingCred)
              }).then(function() {
                // Google account successfully linked to the existing Firebase user.
                goToApp()
              })
              return
            }
            // All the other cases are external providers.
            // Construct provider object for that provider.
            // TODO: implement getProviderForProviderId.
            var provider = getProviderForProviderId(methods[0])
            // At this point, you should let the user know that they already have an account
            // but with a different provider, and let them validate the fact they want to
            // sign in with this provider.
            // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
            // so in real scenario you should ask the user to click on a "continue" button
            // that will trigger the signInWithPopup.
            auth.signInWithPopup(provider).then(function(result) {
              // Remember that the user may have signed in with an account that has a different email
              // address than the first one. This can happen as Firebase doesn't control the provider's
              // sign in flow and the user is free to login using whichever account they own.
              // Step 4b.
              // Link to Google credential.
              // As we have access to the pending credential, we can directly call the link method.
              result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
                // Google account successfully linked to the existing Firebase user.
                goToApp()
              })
            })
          })
        }
      })
    }

    const handleUser = (credentials) => {
      if (credentials) {
        setUser(credentials.user)
      } else {
        setUser(null)
      }
    }

    return (
      <div className='flex flex-col full'>
        <Header />
        <div className='auth full'>
          <img src="../src/img/tyme.png" alt="TYME" className='auth-img'/>
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
              <img src="../src/img/google.png" className='w-8'/>
            </button>

          </form>
        </div>
      </div>
    )
}
  
export default Login