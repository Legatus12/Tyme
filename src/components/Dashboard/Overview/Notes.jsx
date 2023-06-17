import { useState, useEffect,useContext } from "react"
import { Link, Route, Routes } from 'react-router-dom'
import { addNote, getNotes, deleteNoteFB } from "../../../../firebase"
import { GlobalContext } from '../../../GlobalProvider'
import useMountEffect from '@restart/hooks/useMountEffect'
import { useTranslation } from "react-i18next"

const Notes = () => {

  const { user } = useContext(GlobalContext)

  const { t } = useTranslation()

  const [notes, setNotes] = useState([])
  const [smth, setSmth] = useState(false)
  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if(smth) {
      const date = new Date()
      addNote(user.uid, text, date.getTime())
      setText('')
      loadNotes(user.uid)
      setSmth(false)
    }
    
  }

  const loadNotes = async (uid) => {
    if (uid) {
      const arr = []
      getNotes(uid, (notes) => {
        notes.forEach((note) => {
          console.log(note.data())
          const aux = {
            text: note.data().text,
            id: note.id,
          }
          arr.push(aux)
        })
        setNotes(arr) // Actualizar el estado de las notas aquí
      })
    }
  }

  const deleteNote = (id) => {
    deleteNoteFB(id)
    loadNotes(user.uid)
  }
  
  useEffect(() => {
    loadNotes(user.uid)
  }, [user])


  const handleChange = (event) => {
    setText(event.target.value)
    if(event.target.value !== '')
      setSmth(true)
    else
      setSmth(false)
  }

  useMountEffect(() => {
    loadNotes()
  })

  return (
      <div className="notes full">
        <div className="header-flex tool-header">
          <Link className="back" to={'/dashboard/overview'} replace>
            <img src={`/src/assets/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />
          </Link>
          <h1>{t('notes.title')}</h1>
        </div>
        <div className="notes-container">
          <form onSubmit={handleSubmit}>
            <textarea
              id="text"
              name="text"
              type="textarea"
              value={text}
              onChange={handleChange}
              className="notes-submit"
              placeholder={t('notes.write')}
              ></textarea>
            <button className={`notes-submit ${smth ? 'notes-smth' : 'notes-none'}`} type="submit">{t('notes.save')}</button>
          </form>
          {
            notes.length > 0 ?
              notes.map(note =>
                <div className="note" key={note.id}>
                  <p>{note.text}</p>
                  <button className="notes-submit notes-delete" onClick={()=> deleteNote(note.id)}>
                    <img src={`/src/img/delete${document.documentElement.classList.contains("dark") ? '' : ''}.png`} />  
                  </button>
                </div>
              )
              : null
          }
        </div>

      </div>

  )
}
/*
function Form() {
  //const [notes, setNotes] = ([])
  const [values, setValues] = useState({
    title: "",
    text: "",
  })

  const  handleSubmit = async (evt) => {
    evt.preventDefault()

    await onSubmit(values)
    
  }

  function handleChange(evt) {

    const { target } = evt
    const { name, value } = target

    const newValues = {
      ...values,
      [name]: value,
    }

    // Sincroniza el estado de nuevo
    setValues(newValues)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="title"
        value={values.title}
        onChange={handleChange}
      />
      <label htmlFor="text">Note</label>
      <input
        id="text"
        name="text"
        type="textarea"
        value={values.text}
        onChange={handleChange}
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}
*/
export default Notes
