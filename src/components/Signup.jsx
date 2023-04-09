import { useState } from 'react'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { Link } from "react-router-dom"

const Signup = () => {

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
      <div className='auth'>
        <img src="src/img/tyme.png" alt="TYME" className='auth-img'/>
        <form className='auth-form'>

          <h1 className='auth-title'>Crea tu cuenta ahora</h1>

          <p className='auth-text'>¡Ha llegado el momento de empezar a ultizar TYME!</p>

          <input type="email" placeholder='correo electrónico'
          value={email} onChange={e => setEmail(e.target.value)}
          className='auth-input' />

          <input type="password" placeholder='contraseña' 
          value={password} onChange={e => setPassword(e.target.value)}
          className='auth-input' />

          <p value={msg}
          className='h-6'></p>

          <button onClick={signUp} className='auth-button p-2'>crear cuenta</button>
          
          <Link to='/login' className='auth-redirect self-center'>¿Ya tienes una cuenta?</Link>

          <hr className='my-8'/>

          <button onClick={signUpWithGoogle} className='auth-button flex justify-center items-center gap-4 p-4'>
            <p>o continúa con Google</p>
            <img src="src/img/google.png" className='w-8'/>
          </button>

        </form>
      </div>
    )
}
  
export default Signup