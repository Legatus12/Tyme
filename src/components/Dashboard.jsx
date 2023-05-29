import { Link, Route, Routes } from 'react-router-dom'
import Overview from './Dashboard/Overview'
import Notifications from './Dashboard/Notifications'
import User from './Dashboard/User'
import Settings from './Dashboard/Settings'
import Day from './Dashboard/Overview/Day'
import Habits from './Dashboard/Overview/Habits'
import Notes from './Dashboard/Overview/Notes'
import Projects from './Dashboard/Overview/Projects'
import Charts from './Dashboard/Overview/Charts'

const Dashboard = ({user}) => {

    const menu = [
        { path: 'overview', name: 'general' },
        { path: 'notifications', name: 'general' },
        { path: 'user', name: 'general' },
        { path: 'settings', name: 'general' },
    ]
    //console.log(user)
    return (
        <div className='dashboard full'>

            <div className='dashboard-menu'>
                {menu.map(item => (<Link to={item.path}><abbr className='no-underline' title={item.name}><img src={`../src/img/${item.path}.png`} className='w-8' /></abbr></Link>))}
            </div>

            <div className='dashboard-view'>
                <Routes>
                    <Route path='/*' element={<Overview user={user}/>} />
                    <Route path='overview/*' element={<Overview user={user}/>} />
                    <Route path='overview/day' element={<Day />} />
                    <Route path='overview/habits' element={<Habits />} />
                    <Route path='overview/notes' element={<Notes />} />
                    <Route path='overview/projects' element={<Projects />} />
                    <Route path='overview/charts' element={<Charts />} />
                    <Route path='notifications' element={<Notifications />} />
                    <Route path='user' element={<User user={user}/>} />
                    <Route path='settings' element={<Settings />} />
                </Routes>
            </div>
            

        </div>
    )
}

export default Dashboard
