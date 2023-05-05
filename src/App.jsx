import './styles.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import { useState } from 'react'
import useMountEffect from '@restart/hooks/useMountEffect'
import { useTranslation } from 'react-i18next'

const App = () => {

  const { i18n } = useTranslation()

  useMountEffect(() => {

    let lan = localStorage.getItem('language')
    console.log(lan)

    if(lan == null) {
      console.log('echo')
      if(navigator.language.substring(0, 2) == 'es') {
        lan = { key: 'es', name: 'Español' }
        localStorage.setItem('language', lan)
      } else {
        lan = { key: 'es', name: 'English' }
        localStorage.setItem('language', lan)
        console.log(localStorage.getItem('language'))
      }
    } 
    i18n.changeLanguage(lan.key)
    
  })
  
  const [user, setUser] = useState(null);

  //console.log(user)
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
