import React, { useState, useRef, useEffect, useContext } from 'react'
import Select from 'react-select'
import { addTyme, updateTyme, getProjects, setProjectInTyme } from "../../firebase"
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
  const [projects, setProjects] = useState([]);
  //const [selectedProject, setSelectedProject] = useState('');
  const [selectedProject, setSelectedProject] = useState(tyme ? tyme.project : '');

  //

  useEffect(() => {
    if (tyme !== null) {
      setTitle(tyme.title)
      setBody(tyme.body)
      setSelectedProject(tyme.project)
      const auxDate = new Date(tyme.timestamp)
      setDate(auxDate)
    }
    else {
      setTitle('')
      setBody('')
      setDate(day)
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
    if(tyme != null){
      setProjectInTyme(tyme.id, newProject)
      setSelectedProject(newProject);
    }
  };


  //TODO: Implementar el proyecto OPCIONALMENTE
  const handleSubmit = (event) => {
    event.preventDefault()
    if (tyme !== null){
      let aux = { id: tyme.id, title: title, body: body, date: format(date, 'dd-MM-yyyy'), timestamp: date.getTime()}
      console.log(typeof selectedProject === 'undefined')
      typeof selectedProject !== 'undefined' ? aux.project = selectedProject : null
      updateTyme(tyme.id, aux)
    }
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

  const onChangeDate = (date) => {
    const dateArray = date.split("-")
    const dateObject = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
    setDate(dateObject)
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
                  value={format(date, 'yyyy-MM-dd')}
                  onChange={(e) => onChangeDate(e.target.value)}
                />
              </div>
              <div className='flex items-center'>
                <label className='p-4' htmlFor="date">{t('tyme.tag')}</label>
                <select id="project" value={selectedProject} onChange={(e) => handleProjectChange(e.target.value)}>
                <option value="">Sin proyecto</option> {/* Agrega esta opción */}
                  {projects.map((project, index) => (
                    <option key={index} value={project.name}>
                      {project.name}
                    </option>
                  ))}
                </select>
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
