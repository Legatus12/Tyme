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
    /*language config*/
    let lan = localStorage.getItem('language')

    if(lan == null) {
      if(navigator.language.substring(0, 2) == 'es') {
        lan = 'es'
        localStorage.setItem('language', lan)
      } else {
        lan = 'en'
        localStorage.setItem('language', lan)
      }
    } 
    i18n.changeLanguage(lan)

    /*theme config*/
    let darkMode = localStorage.getItem('theme')

    if(darkMode == null || darkMode == 'light') {
      localStorage.setItem('theme', 'light')
    } else {
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
    }
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
