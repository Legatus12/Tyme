import { useContext } from 'react'
import { AuthContext } from '../../AuthProvider'

const User = () => {

  const user = useContext(AuthContext)

  //

  return (
    <div className="user">
      <h1>{user.uid}</h1>
      <h1>{user.displayName}</h1>
      <h1>{user.email}</h1>
    </div>
  )
}
  
export default User