import { Link, Route, Routes } from 'react-router-dom'
import Overview from './Overview'
import Notifications from './Notifications'
import User from './User'
import Settings from './Settings'

function Dashboard() {

    const menu = [
        { path: 'overview', name: 'general' },
        { path: 'notifications', name: 'general' },
        { path: 'user', name: 'general' },
        { path: 'settings', name: 'general' },
    ]

    return (
        <div className='dashboard'>

            <div className='dashboard-menu'>
                {menu.map(item => (<Link to={item.path}><abbr className='no-underline' title={item.name}><img src={`src/img/${item.path}.png`} className='w-8' /></abbr></Link>))}
            </div>

            <div className='dashboard-view'>
                <Routes>
                    <Route path='/*' element={<Overview />} />
                    <Route path='overview/*' element={<Overview />} />
                    <Route path='notifications' element={<Notifications />} />
                    <Route path='user' element={<User />} />
                    <Route path='settings' element={<Settings />} />
                </Routes>
            </div>

        </div>
    )
}

export default Dashboard
