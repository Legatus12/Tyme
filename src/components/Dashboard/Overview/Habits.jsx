import { useState, useEffect, useContext, useRef, useMountEffect } from "react"
import { Link, Route, Routes } from 'react-router-dom'
import { addHabit, deleteHabitFB } from "../../../../fb"
import { GlobalContext } from '../../../GlobalProvider'
import { useTranslation } from "react-i18next"
import { ModalHabit } from './Habits/Habit'
import { isSameDay } from 'date-fns'

const Habits = () => {

  const { user, habits } = useContext(GlobalContext)

  const { t } = useTranslation()
  
  const currentDate = new Date()

  const [showAdd, setShowAdd] = useState(false)
  const [values, setValues] = useState({
    name: "",
    completed: [],
  })

  const deleteHabit = (id) => {
    console.log(id)
    deleteHabitFB(id)
  }

  const checkedHabit = (habit) => {
    return habit.completed.some(comp => !isSameDay(comp, new Date()))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addHabit(user.uid, values.name)
    setValues({
      name: "",
      completed: [],
    })
    setShowAdd(false)
  }


  const handleChange = (evt) => {

    const { target } = evt
    const { name, value } = target

    const newValues = {
      ...values,
      [name]: value,
    }

    setValues(newValues)
  }

  const modalRef = useRef(null)

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowAdd(false)
    }
  }
  useEffect(() => {
    const handleMouseDown = (event) => handleClickOutside(event)
    document.addEventListener('mousedown', handleMouseDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  const [isHabitOpen, setIsHabitOpen] = useState(false)
  const [selectedHabit, setSelectedHabit] = useState()
 
  const onClose =() => {
    setIsHabitOpen(false)
  }

  const onOpen = (habit) => {
    console.log('habit')
    setIsHabitOpen(true)
    setSelectedHabit(habit)
  }

 
  return (
    <div className="habits full">
      <div className="header-flex tool-header">
        <Link className="back" to={'/dashboard/overview'} replace>
          <img src={`/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />
        </Link>
        <h1>{t('habits.title')}</h1>
      </div>
      {
        showAdd ?
          <div className="modal">
            <div className="modal-content" ref={modalRef}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder={t('habits.write')}
                />
                <button className="modal-cancel" type="submit">{t('habits.save')}</button>
              </form>
            </div>
          </div>
          : null
      }
      <div className="habits-container">
        {
          habits.length > 0 ?
            habits.map(habit =>
              <div className="project" key={habit.id} tabIndex={0} onClick={()=>onOpen(habit)}>
                <p className="project-name">{habit.name}</p>
              </div>
            )
            : null
        }
        <button className="project-add" onClick={() => setShowAdd(true)}>{t('habits.add')}</button>
        {
          isHabitOpen ? 
            <ModalHabit habit={selectedHabit} onClose={onClose} />
          : null
        }
      </div>
      
    </div>
  )
}

export default Habits