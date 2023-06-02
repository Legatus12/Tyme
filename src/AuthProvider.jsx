import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  //

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      console.log(user)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  //

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
