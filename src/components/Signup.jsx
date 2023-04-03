import { useState } from 'react'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const sigUp = (e) => {
      e.preventDefault()
      createUserWithEmailAndPassword(auth, email, password)
      .then(credentials => console.log(credentials))
      .catch(error => console.log(error))
    }

    return (
      <div>
        <div>
          <form onSubmit={sigUp}>
            <h1>Sign up</h1>

            <input type="email" placeholder='email'
            value={email} onChange={e => setEmail(e.target.value)} />

            <input type="password" placeholder='password' 
            value={password} onChange={e => setPassword(e.target.value)} />

            <button type='submit'>sign up</button>

          </form>
        </div>
      </div>
    )
}
  
export default Signup