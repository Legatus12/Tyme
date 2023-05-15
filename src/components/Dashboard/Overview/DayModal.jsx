import { useState } from "react"

const DayModal = ({day}) => {

    const [dayModal, setDayModal] = useState(false)

    const toogleModal = (dayModal) => setDayModal(!dayModal)

}