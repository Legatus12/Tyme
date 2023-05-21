import { useState } from "react"

const Day = ({day}) => {

    console.log('day', day)

    return(
        <div className="day-view full">
            {day}
        </div>
    )

}

export default Day