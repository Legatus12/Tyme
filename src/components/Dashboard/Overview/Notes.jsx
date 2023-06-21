import { useState, useEffect,useContext } from "react"
import { Link, Route, Routes } from 'react-router-dom'
import { addNote, deleteNoteFB } from "../../../../firebase"
import { GlobalContext } from '../../../GlobalProvider'
import useMountEffect from '@restart/hooks/useMountEffect'
import { useTranslation } from "react-i18next"

const Notes = () => {

  const { user, notes } = useContext(GlobalContext)

  const { t } = useTranslation()

  const [smth, setSmth] = useState(false)
  const [text, setText] = useState('')

  //

  const handleSubmit = (event) => {
    event.preventDefault()
    if(smth) {
      const date = new Date()
      addNote(user.uid, text, date.getTime())
      setText('')
      setSmth(false)
    }
    
  }

  const handleChange = (event) => {
    setText(event.target.value)
    if(event.target.value !== '')
      setSmth(true)
    else
      setSmth(false)
  }

  const deleteNote = (id) =>{
    if(confirm(t('confirmDelete'))) {
      deleteNoteFB(id)
    }
  }

  //

  return (
      <div className="notes full">
        <div className="header-flex tool-header">
          <Link className="back" to={'/dashboard/overview'} replace>
            <img src={`/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />
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
                    <img src={`/img/delete${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />  
                  </button>
                </div>
              )
              : null
          }
        </div>

      </div>

  )
}

export default Notes