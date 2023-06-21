import { useState, useEffect, useContext, useRef } from "react"
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { GlobalContext } from '../../../GlobalProvider'
import Tyme from '../../Tyme'

const Day = ({ day, closeDayModal }) => {

  const { user, tymes } = useContext(GlobalContext)

  const { t, i18n } = useTranslation()

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
  }

  //

  return (
    <div className="day-view full">
      <div className="header-flex">
        <button className="back" onClick={() => closeDayModal()}><img src={`/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} /></button>
        <h1 className='text-3xl'>
          {t('date.day.' + day.getDay()) + ', '}
          {i18n.resolvedLanguage == 'es'
            ? day.getDate() + ' de ' + t('date.month.' + day.getMonth())
            : t('date.month.' + day.getMonth()) + ' ' + day.getDate() + getOrdinal(day.getDate())}
        </h1>
      </div>
      <button className="self-end project-add" onClick={() => openTyme(null)}>{t('overview.todayMsg')}</button>
      <div className="tyme-container">
        {tymes.filter(x => x.date == format(day, 'dd-MM-yyyy')).map((tyme, index) => (
          <div className='tyme-sm' key={index} tabIndex={0} onClick={() => openTyme(tyme)}>
            <p className="tyme-sm-title">{tyme.title}</p>
            <p className="tyme-sm-body" dangerouslySetInnerHTML={{__html:tyme.body}}></p>
          </div>
        ))}
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