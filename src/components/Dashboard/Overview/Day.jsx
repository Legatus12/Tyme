import { useState } from "react"
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday } from 'date-fns'

const Day = ({day, closeDayModal}) => {
    return(
        <div className="day-view full">
            <button onClick={() => closeDayModal()}>back</button>
            <p>Dia seleccionado:</p>
            <time dateTime={format(day, 'yyyy-MM-dd')}>
                    {format(day, 'yyyy-MM-dd')}
            </time>
        </div>
    )

}

export default Day