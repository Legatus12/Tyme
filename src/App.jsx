import './styles.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Logout from './components/Logout'
import Settings from './components/Settings'


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element = { <Dashboard /> } />
        <Route path='login' element = { <Login /> } />
        <Route path='signup' element = { <Signup /> } />
        <Route path='dashboard/*' element = { <Dashboard/> } />
        <Route path='settings' element = { <Settings/> } />
        <Route path='logout' element = { <Logout/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
