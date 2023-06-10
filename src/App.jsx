import './styles.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Auth from './components/Auth'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Dashboard from './components/Dashboard'
import { useState, createContext } from 'react'
import useMountEffect from '@restart/hooks/useMountEffect'
import { useTranslation } from 'react-i18next'
import Verify from './components/Verify'

const App = () => {

  const { i18n } = useTranslation()

  /*config*/
  useMountEffect(() => {
    /*language*/
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

    /*theme*/
    let darkMode = localStorage.getItem('theme')
    if(darkMode == null || darkMode == 'light') {
      localStorage.setItem('theme', 'light')
    } else {
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
    }
  })
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Auth/>} />
        <Route path="/authentication" element={<Auth />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    )
}

export default App