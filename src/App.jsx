import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Logout from './components/Logout'
import Settings from './components/Settings'


function App() {

  return (
    <BrowserRouter >
      <header>
      <Link to='dashboard'>
          Dashboard
        </Link>
        <Link to='settings'>
          Settings
        </Link>
        <Link to='logout'>
          Logout
        </Link>
      </header>

      <Routes>
      <Route path='/*' element={<Dashboard />} />

        <Route path='dashboard/*' element={<Dashboard/>} />
      
        <Route path='settings' element={<Settings/>} />

        <Route path='logout' element={<Logout/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
