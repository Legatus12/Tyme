import { useState, useEffect, useContext, useRef, useMountEffect } from "react"
import { Link, Route, Routes } from 'react-router-dom';
import { getTymesInNext24Hours } from "../../../firebase"
import { GlobalContext } from '../../GlobalProvider'
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday } from 'date-fns'
import Tyme from '../Tyme'


const Notifications = () => {

  const { user } = useContext(GlobalContext)

  const [tymes, setTymes] = useState([])

  //

  const loadTymes = async () => {
    setTymes([])
    const arr = []
    getTymesInNext24Hours(user.uid, docs => {
      docs.forEach(doc => {
        const aux = {
          ...doc.data(),
          id: doc.id
        }
        arr.push(aux)
      })
      setTymes(arr.filter(tyme => tyme.done !== true))
      console.log(tymes)
    })
  }


  useEffect(() => {
    loadTymes()
  }, [user])

  const [selectedTyme, setSelectedTyme] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openTyme = (tyme) => {
    console.log(tyme)
    setSelectedTyme(tyme)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    loadTymes(user.uid)
  }


  return (
    <div>
      <Link to={'/dashboard/overview'} replace>
        <button className="close" ><img src="/src/img/close.png" /></button>
      </Link>
      <h1>Notifications</h1>
      <div className="tyme-container">
        {tymes.map((tyme, index) => (
          <div className='tyme-sm' key={index} tabIndex={0} onClick={() => openTyme(tyme)}>
            <p className="tyme-sm-title">{tyme.title}</p>
            <p className="tyme-sm-body">{tyme.body}</p>
          </div>
        ))}
      </div>
      <Tyme tyme={selectedTyme} day={startOfToday()} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default Notifications