import React, { useState, useRef, useEffect,useContext } from 'react'
import Select from 'react-select'
import { addTyme, updateTyme } from "../../firebase"
import { AuthContext } from '../AuthProvider'
import { useTranslation } from 'react-i18next'
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, set, startOfToday } from 'date-fns'

const ModalAddTyme = ({ tyme, day = startOfToday(), isOpen, onClose }) => {

  const user = useContext(AuthContext)

  const { t, i18n } = useTranslation()
  
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [date, setDate] = useState(day)
  const [timestamp, setTimestamp] = useState('')

  //

  useEffect(() => {
    if(tyme != null) {
      console.log('echo')
      setTitle(tyme.title)
      setBody(tyme.body)
      const auxDate = new Date(tyme.timestamp)
      console.log(auxDate)
      setDate(auxDate)
      console.log(date)
    }
  }, [])

  //

  const handleSubmit = (event) => {
    event.preventDefault()

    if(tyme)
      updateTyme(tyme.id, title, body, format(date, 'dd-MM-yyyy'), date.getTime())
    else
      addTyme(user.uid, title, body, format(date, 'dd-MM-yyyy'), date.getTime())

    onClose()
    setTitle('')
    setBody('')
    setDate('')
    setTimestamp('')
  }

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

  const newFormat = (date) => {
    return date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0]
  }

  return isOpen ? (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <form onSubmit={handleSubmit} className=''>
          <div>
            <div>
              <input
                type="text"
                id="title"
                value={title}
                placeholder={t('tyme.withoutTitle')}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <hr />
            <div className='flex flex-col md:flex-row md:gap-12'>
              <div className='flex items-center'>
                <label className='p-4' htmlFor="date">{t('tyme.date')}</label>
                <input
                  type="date"
                  id="date"
                  required pattern="\d{2}-\d{2}-\d{4}"
                  value=''
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className='flex items-center'>
                <label className='p-4' htmlFor="date">{t('tyme.tag')}</label>
                <Select />
              </div>
            </div>
            <hr />
            <div>
              <input
                id="body"
                value={body}
                placeholder={t('tyme.withoutDesc')}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <p className='modal-error'>asd</p>
            <button className='auth-button p-2' type="submit">{tyme != null ? t('tyme.save') : t('tyme.add')}</button>
          </div>
        </form>
      </div>
    </div>
  ) : null
}

  export default ModalAddTyme

  /**
   const ModalAddTyme = ({ day,  isOpen, onClose }) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [date, setDate] = useState('')
    const [timestamp, setTimestamp] = useState('')

    const user = useContext(AuthContext)
  
    const handleSubmit = (event) => {
      event.preventDefault()

      console.log(day)
      addTyme(user.uid, title, body, format(day, 'dd-MM-yyyy'), day.getTime())

      onClose()
      setTitle('')
      setBody('')
      setDate('')
      setTimestamp('')
    }

    const modalRef = useRef(null)

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])

    return isOpen ? (
      <div className="modal">
        <div className="modal-content">
          <h2>Formulario</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="body">Contenido:</label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="date">Fecha:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="timestamp">Marca de tiempo:</label>
              <input
                type="time"
                id="timestamp"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
              />
            </div>
            <div className="modal-buttons">
              <button type="submit">Guardar</button>
              <button className="modal-close" onClick={() => onClose(null)}>
                Cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : null
  }
   */