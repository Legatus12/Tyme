import React, { useState, useRef, useEffect, useContext } from 'react'
import Select from 'react-select'
import { addTyme, updateTyme, getProjects, setProjectInTyme } from "../../firebase"
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
  const [projects, setProjects] = useState([]);
  //const [selectedProject, setSelectedProject] = useState('');
  const [selectedProject, setSelectedProject] = useState(tyme ? tyme.project : '');

  //

  useEffect(() => {
    if (tyme != null) {
      setTitle(tyme.title)
      setBody(tyme.body)
      setSelectedProject(tyme.project)
      const auxDate = new Date(tyme.timestamp)
      setDate(auxDate)
    } else {
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

    if (tyme)
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
                  value={format(date, 'yyyy-MM-dd')}
                  onChange={(e) => setDate(format(e.target.value, 'yyyy-MM-dd'))}
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
