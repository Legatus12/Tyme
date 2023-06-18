import { Link, Route, Routes, Navigate } from 'react-router-dom'
import Overview from './Dashboard/Overview'
import Settings from './Dashboard/Settings'
import Day from './Dashboard/Overview/Day'
import Habits from './Dashboard/Overview/Habits'
import Notes from './Dashboard/Overview/Notes'
import Projects from './Dashboard/Overview/Projects'
import Charts from './Dashboard/Overview/Charts'
import { useContext } from 'react'
import { GlobalContext } from '../GlobalProvider'
import { useTranslation } from 'react-i18next'

const Dashboard = () => {

    const { user } = useContext(GlobalContext)

    const { t } = useTranslation()

    //

    const menu = [
        { path: 'overview', name: t('ovewview.title') },
        { path: 'charts', name: t('charts.title') },
        { path: 'settings', name: t('settings.title') },
    ]

    //
    
    if(user && user.emailVerified) {return (
        <div className='dashboard full'>

            <div className='dashboard-view'>
                <Routes>
                    <Route path='/overview' element={<Overview />} />
                    <Route path='/charts' element={<Charts />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/day' element={<Day />} />
                    <Route path='/overview/habits' element={<Habits />} />
                    <Route path='/overview/notes' element={<Notes />} />
                    <Route path='/overview/projects' element={<Projects />} />
                    <Route path='/*' element={<Overview />} />
                </Routes>
            </div>
            
            <div className='dashboard-menu'>
                {menu.map(item => (<Link key={item.path} to={item.path}><abbr className='no-underline' title={item.name}><img src={`../src/assets/img/${item.path}${document.documentElement.classList.contains("dark") ? '_dm' : '_dm'}.png`} className='w-8' /></abbr></Link>))}
            </div>

        </div>
    )} else if (user && !user.emailVerified) {
        return <Navigate to="/verify" replace />
    } else { 
        return <Navigate to="/authentication" replace /> 
    }
}

export default Dashboard
