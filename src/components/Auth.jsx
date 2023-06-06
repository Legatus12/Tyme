import { useState, useContext, useEffect } from 'react'
import Header from './Header'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, signInWithPopup, setPersistence, browserLocalPersistence, createUserWithEmailAndPassword, sendPasswordResetEmail  } from 'firebase/auth'
import { useTranslation } from 'react-i18next'
import { useNavigate, Navigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Login = () => {

  const user = useContext(AuthContext)

  const { t } = useTranslation()

  const MySwal = withReactContent(Swal)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  
  const [login, setLogin] = useState(true)
  const [reset, setReset] = useState(false)

  //

  const signIn = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(credentials => console.log(credentials))
    .catch(error => handleFirebaseAuthError(error))
  }

  const signUp = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
    .then(credentials => console.log(credentials))
    .catch(error => handleFirebaseAuthError(error))
  }

  const signInWithGoogle = (e) => {
    e.preventDefault()
    //setPersistence(auth, browserLocalPersistence).catch(error => console.log(error))
    signInWithPopup(auth, new GoogleAuthProvider())
    .then(result => {
      setPersistence(auth, browserLocalPersistence).catch(error => console.log(error))
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      setUser(result.user)
    }).catch((error) => {
      // An error happened. (Código de la documentación de firebase)
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

  const handleFirebaseAuthError = (error) => {
    console.log(error.code)
    switch (error.code) {
      case 'auth/user-not-found':
        setMsg(t('error.userNotFound'))
        break
      case 'auth/wrong-password':
        setMsg(t('error.wrongPassword'))
        break
      case 'auth/invalid-email':
        setMsg(t('error.invalidEmail'))
        break
      case 'auth/user-disabled':
        setMsg(t('error.userDisabled'))
        break
      default:
        setMsg(t('error.default'))
        break
    }
  }

  const switchAuth = () => {
    if (login) {
      setLogin(false)
      setReset(false)
    } else setLogin(true)

    setMsg('')
  }

  const switchReset = () => {
    setReset(!reset)
    setMsg('')
  }

  const sendReset = (e) => {
    e.preventDefault()
    if (email == "")
      setMsg(t('error.invalidEmail'))
    else {
      sendPasswordResetEmail(auth, email)
      setReset(false)
      setMsg('')
      alert(t('auth.sent'))
    }
  }

  //

  if(!user) {return (
    <div className='flex flex-col full'>
      <Header />
      <div className='full flex items-center justify-center'>
        <div className={`auth ${login ? 'flex-col lg:flex-row' : 'flex-col-reverse lg:flex-row-reverse'}`}>
          <div className='auth-img-container'>
            <img src="../src/img/tyme.png" alt="TYME" className='auth-img'/>
            {login ? (
              <p tabIndex={0} onClick={switchAuth} className='auth-redirect self-center'>{t('auth.signupRedirect')}</p>
            ) : (
              <p tabIndex={0} onClick={switchAuth} className='auth-redirect self-center'>{t('auth.loginRedirect')}</p>
            )}
          </div>
          <form className='auth-form'>

            <div>
              {login ? (
                <div>
                  <h1 className='auth-title'>{t('auth.loginTitle')}</h1>
                  <p className='auth-text'>{t('auth.loginIntro')}</p>
                </div>
              ) : (
                <div>
                  <h1 className='auth-title'>{t('auth.signupTitle')}</h1>
                  <p className='auth-text'>{t('auth.signupIntro')}</p>
                </div>
              )}
            </div>

            <input type="email" placeholder={t('mail')}
            value={email} onChange={e => setEmail(e.target.value)}
            className='auth-input' />

            {!reset ? (
              <div>
                <input type="password" placeholder={t('pass')} 
                value={password} onChange={e => setPassword(e.target.value)}
                className='auth-input' />
              </div>
            ) : (
              <div className='hidden'></div>
            )}
            
            { reset ? (
              <div className='flex flex-col items-center gap-4'>
                <button onClick={sendReset} className='auth-button p-2'>{t('auth.continue')}</button>
                <p className='auth-reset' onClick={switchReset}>{t('cancel')}</p>
              </div>
            ) : login ? (
              <div className='flex flex-col items-center gap-4'>
                <button onClick={signIn} className='auth-button p-2'>{t('auth.login')}</button>
                <p className='auth-reset' onClick={switchReset}>{t('auth.reset')}</p>
              </div>
            ) : (
              <button onClick={signUp} className='auth-button p-2'>{t('auth.signup')}</button>
            )}

            <p className='h-6 text-[#f1121f]'>{msg}</p>

            { !reset ? (
              <div className='flex flex-col items-center gap-6'>
                <hr className='w-full'/>
                <button onClick={signInWithGoogle} className='auth-button flex justify-center items-center gap-4 p-4'>
                  <p>{t('auth.google')}</p>
                  <img src="../src/img/google.png" className='w-8'/>
                </button>
              </div>
            ) :  (
              <div className='hidden'></div>
            )}

          </form>
        </div>
      </div>
    </div>
  )} else { return <Navigate to="/dashboard/overview" replace /> }
}
  
export default Login