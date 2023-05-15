import { Link, Route, Routes } from 'react-router-dom'
import Day from './Calendar/Day'
import Month from './Calendar/Month'
import Week from './Calendar/Week'

function Calendar() {

    return (
        <div className='calendar'>
        <header>
        <Link to='day'>
            Day
          </Link>
          <Link to='week'>
            Week
          </Link>
          <Link to='month'>
            Month
          </Link>
        </header>

        <Routes>
          
            <Route path='/*' element={<Day />} />

            <Route path='day' element={<Day/>} />

            <Route path='week' element={<Week/>} />

            <Route path='month' element={<Month/>} />

        </Routes>


        </div>
    )
  }
  
export default Calendar