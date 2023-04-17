import '../styles.css'
import { Link, Route, Routes } from 'react-router-dom'
import Calendar from './Dashboard/Calendar'
import Habits from './Dashboard/Habits'
import Notes from './Dashboard/Notes'
import Projects from './Dashboard/Projects'

function Dashboard({user}) {

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
