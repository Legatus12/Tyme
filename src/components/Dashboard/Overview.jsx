import { Link, Route, Routes } from 'react-router-dom'
import Calendar from './Overview/Calendar'
import Habits from './Overview/Habits'
import Notes from './Overview/Notes'
import Projects from './Overview/Projects'

const Overview = () => {

    return (
        <div className='overview full'>

            <div className='day'>
                <p className='underline'>Madrid</p>
                <p className='text-4xl'>Sábado, 13 de mayo</p>
                <br /><br /><br />
                <p className='text-8xl font-black self-end'>20º</p>
                <p className='self-end mr-12'>12º - 26º</p>
                <p className='mt-auto text-5xl'>12:12</p>
            </div>

            <div className='calendar'>

            </div>

            <div className='incoming'>
                <h1 className='text-2xl font-black'>Próximamente</h1>
                <ul className='list-disc list-inside text-xl'>
                    <li className=''>La tarea 'TFG' concluye en 40 días.</li>
                </ul>
            </div>
            
            <div className='tools'>

            </div>

        </div>
    )
}

export default Overview
