import '../styles.css'
import { Link, Route, Routes } from 'react-router-dom'
import Calendar from './Dashboard/Calendar'
import Habits from './Dashboard/Habits'
import Notes from './Dashboard/Notes'
import Projects from './Dashboard/Projects'

function Dashboard() {

    return (
        <div className='dashboard'>

            <div className='dashboard-menu'>
                <div className='dashboard-title'>
                    <h1>T Y M E</h1>
                </div>
                <div className='menu-links h-full'>
                    <Link to='calendar'>
                        <img src="src/img/calendar.png" className='w-6' />
                        <p>Calendar</p>
                    </Link>
                    <Link to='habits'>
                        <img src="src/img/habits.png" className='w-6' />
                        <p>Habits</p>
                    </Link>
                    <Link to='notes'>
                        <img src="src/img/notes.png" className='w-6' />
                        <p>Notes</p>
                    </Link>
                    <Link to='projects'>
                        <img src="src/img/projects.png" className='w-6' />
                        <p>Projects</p>
                    </Link>
                </div>
                <div className='menu-links mb-8'>
                    <button><img src="src/img/notifications.png" className='w-6'/><p>Notificaciones</p></button>
                    <button><img src="src/img/user.png" className='w-6'/>username</button>
                    <button><img src="src/img/settings.png" className='w-6'/>ajustes</button>
                </div>

            </div>

            <div className='dashboard-view'>
                <Routes>
                    <Route path='/*' element={<Calendar />} />
                    <Route path='calendar/*' element={<Calendar />} />
                    <Route path='habits' element={<Habits />} />
                    <Route path='notes' element={<Notes />} />
                    <Route path='projects' element={<Projects />} />
                </Routes>
            </div>

        </div>
    )
}

export default Dashboard
