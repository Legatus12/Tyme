import React, { useState, useRef, useEffect, useContext } from 'react'
import Select from 'react-select'
import { addTyme, updateTyme, getProjects, setProjectInTyme, deleteTyme, updateTymeField } from "../../firebase"
import { AuthContext } from '../AuthProvider'
import { useTranslation } from 'react-i18next'
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, set, startOfToday } from 'date-fns'

const ModalAddTyme = ({ tyme, day, isOpen, onClose }) => {

  const user = useContext(AuthContext)

  const { t, i18n } = useTranslation()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [date, setDate] = useState(day)
  const [timestamp, setTimestamp] = useState('')
  const [hora, setHora] = useState('')
  const [done, setDone] = useState('')
  const [projects, setProjects] = useState([]);
  //const [selectedProject, setSelectedProject] = useState('');
  const [selectedProject, setSelectedProject] = useState(tyme ? tyme.project : '');
  const [msgerror, setmsgerror] = useState('')

  //

  useEffect(() => {
    if (tyme !== null) {
      setTitle(tyme.title)
      setBody(tyme.body)
      setSelectedProject(tyme.project)
      const auxDate = new Date(tyme.timestamp)
      setDate(auxDate)
      setDone(tyme.done)
      setHora(new Date(tyme.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    else {
      setTitle('')
      setBody('')
      setDate(day)
      setDone(false)
    }
  }, [tyme, day])

  //

  const loadProjects = async (uid) => {
    if (uid) {
      const arr = [];
      getProjects(uid, (projects) => {
        projects.forEach((project) => {
          const aux = {
            ...project.data(),
            id: project.id,
          };
          arr.push(aux);
        });

        setProjects(arr);
      });
    }
  };

  useEffect(() => {
    loadProjects(user.uid);
  }, [user]);


  const handleProjectChange = (newProject) => {
    console.log(newProject)
    if (tyme != null) {
      setProjectInTyme(tyme.id, newProject)
      setSelectedProject(newProject);
    }
  };

  const handleDone = (event) => {
    const isChecked = event.target.checked;
    setDone(isChecked);
  }

  //TODO: Implementar el proyecto OPCIONALMENTE
  const handleSubmit = (event) => {
    event.preventDefault()
    if(title !== ''){
      if (tyme !== null) {
        const [hour, minute] = hora.split(':');
        let newDate = date;
        newDate.setHours(hour);
        newDate.setMinutes(minute);
        let aux = { id: tyme.id, title: title, body: body, date: format(date, 'dd-MM-yyyy'), timestamp: newDate.getTime(), done: done }
        typeof selectedProject !== 'undefined' ? aux.project = selectedProject : null
        updateTyme(tyme.id, aux)
        console.log(aux)
      }
      else {
        const [hour, minute] = hora.split(':');
        let newDate = date;
        newDate.setHours(hour);
        newDate.setMinutes(minute);
        addTyme(user.uid, title, body, format(date, 'dd-MM-yyyy'), newDate.getTime())
      }
      onClose()
      setTitle('')
      setBody('')
      //setDate('')
      setTimestamp('')
      setmsgerror('')
    }
    else{
      setmsgerror(t('tyme.noTitle'))
    }
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

  const onChangeDate = (date) => {
    const dateArray = date.split("-")
    const dateObject = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
    setDate(dateObject)
  }

  const close = () => {
    onClose()
    setmsgerror('')
  }

  return isOpen ? (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <form onSubmit={handleSubmit} className='justify-between'>
          <div className=''>
            <input
              type="text"
              id="title"
              className='modal-title'
              value={title}
              placeholder={t('tyme.withoutTitle')}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <hr />
          <div className='flex flex-col md:flex-row md:justify-between flex-wrap py-2 gap-2 md:gap-0'>
            <div className='flex items-center'>
              <label className='p-4' htmlFor="date">{t('tyme.date')}</label>
              <input
                type="date"
                id="date"
                value={format(date, 'yyyy-MM-dd')}
                onChange={(e) => onChangeDate(e.target.value)}
              />
            </div>
            <div className='flex items-center'>
              <label htmlFor="hora">Hora:</label>
              <input
                type="time"
                id="hora"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
              />
            </div>
            <div className='flex items-center'>
              <label className='p-4' htmlFor="date">{t('tyme.tag')}</label>
              <span className='mr-4'>-</span>
              <select id="project" className='bg-white' value={selectedProject} onChange={(e) => handleProjectChange(e.target.value)}>
              <option value="">{t('tyme.withoutProj')}</option> {/* Agrega esta opción */}
                {projects.map((project, index) => (
                  <option key={index} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex items-center'>
              <label htmlFor="done">{t('tyme.done')}</label>
              <input
                type="checkbox"
                id="done"
                checked={done}
                onChange={handleDone}
                className='mx-3'
              />
            </div>
          </div>
          <hr />
          <div className='full'>
            <textarea
              id="body"
              value={body}
              placeholder={t('tyme.withoutDesc')}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <p className='modal-error'>{msgerror}</p>
            <div className="modal-footer">
              <button className='tyme-cancel' onClick={() => close()}>{tyme != null ? t('tyme.close') : t('tyme.cancel')}</button>
              <button className='tyme-save' type="submit">{tyme != null ? t('tyme.save') : t('tyme.add')}</button>
              <button className={`${tyme != null ? 'block' : 'hidden'} tyme-delete md:w-fit`} onClick={() => deleteTyme(tyme.id)}>{t('tyme.delete')}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null
}

export default ModalAddTyme
