import { useState, useEffect, useContext, useRef, useMountEffect } from "react"
import { Link, Route, Routes } from 'react-router-dom';
import { addHabit, getHabits, deleteHabitFB } from "../../../../firebase"
import { AuthContext } from '../../../AuthProvider'
import { useTranslation } from "react-i18next";

const Habits = () => {

  const user = useContext(AuthContext)

  const { t } = useTranslation()

  const [habits, setHabits] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const [values, setValues] = useState({
    name: "",
    description: "",
    completed: [],

  });

  const deleteHabit = (id) => {
    console.log(id)
    deleteHabitFB(id);
    loadHabits(user.uid)
  }

  const loadHabits = async (uid) => {
    if (uid) {

      getHabits(uid, (habits) => {
        const arr = []
        habits.forEach((habit) => {
          const aux = {
            ...habit.data(),
            id: habit.id,
          };
          arr.push(aux);
        })
        setHabits(arr)
      })
    }
  }

  useEffect(() => {
    loadHabits(user.uid)
  }, [user])

  const handleSubmit = (event) => {
    event.preventDefault();
    addHabit(user.uid, values.name, values.description);
    setValues({
      name: "",
      description: "",
      completed: [],
    });
    loadHabits(user.uid)
    setShowAdd(false)
  };

  const handleChange = (evt) => {

    const { target } = evt;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
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

  return (
    <div className="habits full">
      <div className="header-flex tool-header">
        <Link className="back" to={'/dashboard/overview'} replace>
          <img src={`/src/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />
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
                <button className="tyme-sm-add" type="submit">{t('notes.save')}</button>
              </form>
            </div>
          </div>
          : null
      }
      <div className="habits-container">
        {
          habits.length > 0 ?
            habits.map(habit =>
              <div className="habit" key={habit.id} tabIndex={0}>
                <div className="flex gap-4">
                  <input type="checkbox" />
                  <p>{habit.name}</p>
                </div>
                <button onClick={() => deleteHabit(habit.id)}>delete</button>
              </div>
            )
            : null
        }
        <button className="tyme-sm-add w-full" onClick={() => setShowAdd(true)}>{t('habits.add')}</button>
      </div>
      
    </div>
  )
}

export default Habits

