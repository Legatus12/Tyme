import { useState } from 'react'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { Link } from "react-router-dom"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const signIn = (e) => {
      e.preventDefault()
      signInWithEmailAndPassword(auth, email, password)
      .then(credentials => console.log(credentials))
      .catch(error => console.log(error))
    }

    const signInWithGoogle = (e) => {
      e.preventDefault()
      signInWithRedirect(auth, new GoogleAuthProvider())
      .then(credentials => console.log(credentials))
      .catch(error => console.log(error))
    }

    return (
      <div className='auth'>
        <img src="src/img/tyme.png" alt="TYME" className='auth-img'/>
        <form className='auth-form'>

          <h1 className='auth-title'>¡Bienvenido!</h1>

          <p className='auth-text'>Llegas justo a tiempo.</p>

          <input type="email" placeholder='correo electrónico'
          value={email} onChange={e => setEmail(e.target.value)}
          className='auth-input' />

          <input type="password" placeholder='contraseña' 
          value={password} onChange={e => setPassword(e.target.value)}
          className='auth-input' />

          <p value={msg}
          className='h-6'></p>

          <button onClick={signIn} className='auth-button p-2'>iniciar sesión</button>
          
          <Link to='/signup' className='auth-redirect self-center'>¿Todavía no tienes una cuenta?</Link>

          <hr className='my-8'/>

          <button onClick={signInWithGoogle} className='auth-button flex justify-center items-center gap-4 p-4'>
            <p>o continúa con Google</p>
            <img src="src/img/google.png" className='w-8'/>
          </button>

        </form>
      </div>
    )
}
  
export default Login