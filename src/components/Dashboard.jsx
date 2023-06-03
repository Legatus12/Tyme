import { Link, Route, Routes, Navigate } from 'react-router-dom'
import Overview from './Dashboard/Overview'
import Notifications from './Dashboard/Notifications'
import User from './Dashboard/User'
import Settings from './Dashboard/Settings'
import Day from './Dashboard/Overview/Day'
import Habits from './Dashboard/Overview/Habits'
import Notes from './Dashboard/Overview/Notes'
import Projects from './Dashboard/Overview/Projects'
import Charts from './Dashboard/Overview/Charts'
import { useContext } from 'react'
import { AuthContext } from '../AuthProvider'

const Dashboard = () => {

    const user = useContext(AuthContext)

    //

    const menu = [
        { path: 'overview', name: 'general' },
        { path: 'notifications', name: 'general' },
        { path: 'settings', name: 'general' },
    ]

    //
    
    if(user) {return (
        <div className='dashboard full'>

            <div className='dashboard-menu'>
                {menu.map(item => (<Link to={item.path}><abbr className='no-underline' title={item.name}><img src={`../src/img/${item.path}.png`} className='w-8' /></abbr></Link>))}
            </div>

            <div className='dashboard-view'>
                <Routes>
                    <Route path='/overview' element={<Overview />} />
                    <Route path='/notifications' element={<Notifications />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/day' element={<Day />} />
                    <Route path='dashboard/overview/habits' element={<Habits />} />
                    <Route path='dashboard/overview/notes' element={<Notes />} />
                    <Route path='dashboard/overview/projects' element={<Projects />} />
                    <Route path='dashboard/overview/charts' element={<Charts />} />
                    <Route path='/*' element={<Overview />} />
                </Routes>
            </div>
            

        </div>
    )} else { return <Navigate to="/authentication" replace /> }
}

export default Dashboard
