import { useState } from 'react'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const sigIn = (e) => {
      e.preventDefault()
      signInWithEmailAndPassword(auth, email, password)
      .then(credentials => console.log(credentials))
      .catch(error => console.log(error))
    }

    return (
      <div>
        <div>
          <form onSubmit={sigIn}>
            <h1>log in</h1>

            <input type="email" placeholder='email'
            value={email} onChange={e => setEmail(e.target.value)} />

            <input type="password" placeholder='password' 
            value={password} onChange={e => setPassword(e.target.value)} />

            <button type='submit'>log in</button>

          </form>
        </div>
      </div>
    )
}
  
export default Login