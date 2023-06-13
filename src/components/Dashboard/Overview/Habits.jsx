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
    <div className="habits">
      <div className="header-flex tool-header">
        <Link className="back" to={'/dashboard/overview'} replace>
          <img src={`/src/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />
        </Link>
        <h1>{t('habits.title')}</h1>
      </div>
      <button onClick={() => setShowAdd(true)}>add</button>
      {
        showAdd ?
          <div className="modal">
            <div className="modal-content" ref={modalRef}>
              <form onSubmit={handleSubmit}>
                <label htmlFor="title">Name</label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={values.name}
                  onChange={handleChange}
                />
                <label htmlFor="text">Description</label>
                <textarea
                  id="description"
                  name="description"
                  type="textarea"
                  value={values.description}
                  onChange={handleChange}
                ></textarea>
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
          : null
      }

      {
        habits.length > 0 ?
          habits.map(habit =>
            <div key={habit.id}>
              <p>{habit.name}</p>
              <p>{habit.description}</p>
              <p>Marcar como realizado</p>
              <input type="checkbox" />
              <button onClick={() => deleteHabit(habit.id)}>delete</button>
            </div>
          )
          : null
      }
    </div>
  )
}

export default Habits

