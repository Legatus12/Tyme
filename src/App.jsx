import './styles.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import { useState } from 'react'

const App = () => {
  
  const [user, setUser] = useState(null);

  console.log(user)
  if(user === null){
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/*' element = { <Login setUser={setUser}/> } />
          <Route path='signup' element = { <Signup /> } />
        </Routes>
      </BrowserRouter>
    )
  }
  else{
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/*' element = { <Dashboard user={user}/> } />
          <Route path='dashboard/*' element = { <Dashboard/> } />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
