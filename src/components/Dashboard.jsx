import '../styles.css'
import { Link, Route, Routes } from 'react-router-dom'
import Calendar from './Dashboard/Calendar'
import Habits from './Dashboard/Habits'
import Notes from './Dashboard/Notes'
import Projects from './Dashboard/Projects'

function Dashboard() {

    return (
        <div className='dashboard'>
            <ul>
                <li>
                    <Link to='calendar'>
                        Calendar
                    </Link>
                </li>
                <li>
                    <Link to='habits'>
                        Habits
                    </Link>
                </li>
                <li>
                    <Link to='notes'>
                        Notes
                    </Link>
                </li>
                <li>
                    <Link to='projects'>
                        Projects
                    </Link>
                </li>

            </ul>

            <Routes>
                <Route path='/*' element={<Calendar />} />

                <Route path='calendar/*' element={<Calendar />} />

                <Route path='habits' element={<Habits />} />

                <Route path='notes' element={<Notes />} />

                <Route path='projects' element={<Projects />} />
            </Routes>


        </div>
    )
}

export default Dashboard
