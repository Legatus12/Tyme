import { Link, Route, Routes } from 'react-router-dom'
import Overview from './Overview'
import Notifications from './Notifications'
import User from './User'
import Settings from './Settings'

function Dashboard({user}) {

    const menu = [
        { path: 'overview', name: 'general' },
        { path: 'notifications', name: 'general' },
        { path: 'user', name: 'general' },
        { path: 'settings', name: 'general' },
    ]

    return (
        <div className='dashboard'>

            <div className='dashboard-menu'>

                <div>
                    <Link to='' className='dashboard-user'>
                        <img src="src/img/user.png" className='w-12' />
                        <p>{user.user.displayName}</p>
                    </Link>
                    <button className='hide-dashboard-menu'><img src="src/img/hide.png" /></button>
                </div>
                <div>
                    <img src="src/img/calendar.png" className='w-8' />
                    <Link to='calendar'>Calendar</Link>
                </div>
                <div>
                    <img src="src/img/habits.png" className='w-8' />
                    <Link to='habits'>Habits</Link>
                </div>
                <div>
                    <img src="src/img/notes.png" className='w-8' />
                    <Link to='notes'>Notes</Link>
                </div>
                <div>
                    <img src="src/img/projects.png" className='w-8' />
                    <Link to='projects'>Projects</Link>
                </div>
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
