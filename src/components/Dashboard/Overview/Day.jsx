import { useState, useEffect, useContext, useRef } from "react"
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { getTymesInDay, addTymeFb, deleteTyme, addTyme } from "../../../../firebase"
import { AuthContext } from '../../../AuthProvider'
import Tyme from '../../Tyme'

const Day = ({ day, closeDayModal }) => {

  const user = useContext(AuthContext)

  const { t, i18n } = useTranslation()

  const [tymes, setTymes] = useState([])

  //

  const loadTymes = async (uid) => {
    setTymes([])
    const arr = []
    getTymesInDay(uid, format(day, 'dd-MM-yyyy'), docs => {
      docs.forEach(doc => {
        const aux = {
          ...doc.data(),
          id: doc.id
        }
        arr.push(aux)
      })
      setTymes(arr)
    })
  }

  useEffect(() => {
    loadTymes(user.uid)
  }, [user])

  //

  const getOrdinal = (number) => {
    if (number == 1)
      return 'st'
    else if (number == 2)
      return 'nd'
    else if (number == 3)
      return 'rd'
    else
      return 'th'
  }

  const deleteThisTyme = (id) => {
    deleteTyme(id)
    loadTymes(user.uid)
  }

  //

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

  //

  return (
    <div className="day-view full">
      <div className="flex items-center gap-4">
        <button className="day-close" onClick={() => closeDayModal()}><img src="/src/img/back.png" /></button>
        <h1 className='text-3xl'>
          {t('date.day.' + day.getDay()) + ', '}
          {i18n.resolvedLanguage == 'es'
            ? day.getDate() + ' de ' + t('date.month.' + day.getMonth())
            : t('date.month.' + day.getMonth()) + ' ' + day.getDate() + getOrdinal(day.getDate())}
        </h1>
      </div>
      <div>
        <button className="bg-[#f1121f] w-fit mb-4 p-2 text-white" onClick={() => openTyme(null)}>add</button>
        <div className="tyme-container">
          {tymes.map((tyme, index) => (
            <div className='tyme-sm' key={index} tabIndex={0} onClick={() => openTyme(tyme)}>
              <p className="tyme-sm-title">{tyme.title}</p>
              <p className="tyme-sm-body">{tyme.body}</p>
              <button onClick={()=>deleteThisTyme(tyme.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <Tyme tyme={selectedTyme} day={day} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default Day

/**
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null)

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose()
    }
  }

  useEffect(() => {
    const handleMouseDown = (event) => handleClickOutside(event)
    document.addEventListener('mousedown', handleMouseDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  return isOpen ? (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        {children}
        <button className="modal-close" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  ) : null
}
 */

/*
const handleDeleteTyme = async (tymeId) => {

try {
await deleteTymeFb(user.uid, tymeId)
const updatedTymes = tymes.filter((tyme) => tyme.id !== tymeId)
setTymes(updatedTymes)
} catch (error) {
console.error('Error deleting tyme:', error)
}
}



 
const handleTitleChange = (e) => {
setTitle(e.target.value)
}

const handleBodyChange = (e) => {
setBody(e.target.value)
}

const handleAddTyme = async () => {
const tyme = { title, body }
await addTymeFb(user.uid, tyme)
setTymes([...tymes, tyme])
setTitle('')
setBody('')
}

*/