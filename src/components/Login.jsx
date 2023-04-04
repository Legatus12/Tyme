import { useState } from 'react'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

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
      signInWithPopup(auth, new GoogleAuthProvider())
      .then(credentials => console.log(credentials))
      .catch(error => console.log(error))
    }

    return (
      <div className='w-full h-full flex flex-col justify-center items-center gap-8 bg-silver'>
        <form className='bg-white flex flex-col items-center gap-8 p-8 rounded-xl shadow-2xl w-96'>

          <img src="src/img/tyme.png" alt="TYME" className='w-24' />

          <h1 className='text-3xl font-bold'>¡Bienvenido!</h1>

          <br />

          <input type="email" placeholder='correo electrónico'
          value={email} onChange={e => setEmail(e.target.value)}
          className='auth-input' />

          <input type="password" placeholder='contraseña' 
          value={password} onChange={e => setPassword(e.target.value)}
          className='auth-input' />

          <button onClick={signIn} className='auth-button'>iniciar sesión</button>
          
          <p className='h-8'></p>

          <button onClick={signInWithGoogle} className='w-full flex justify-center items-center gap-4 border-solid border-black border-2 p-2 hover:bg-ash'>
            <p>o continúa con Google</p>
            <img src="src/img/google.png" className='w-8'/>
          </button>

        </form>
        <p className='auth-redirect'>¿Todavía no tienes una cuenta? Crea una ahora.</p>
      </div>
    )
}
  
export default Login