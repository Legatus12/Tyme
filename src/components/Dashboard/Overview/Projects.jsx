import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { addProject, getProjects, getTymesByProject, deleteProjectFB, deleteTymeByProject } from "../../../../firebase"
import { AuthContext } from '../../../AuthProvider'
import Tyme from '../../Tyme'
import { startOfToday } from 'date-fns'
import { useTranslation } from 'react-i18next'

function Projects() {

  const user = useContext(AuthContext)

  const { t } = useTranslation()

  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [tymes, setTymes] = useState([])


  const loadProjects = async (uid) => {
    if (uid) {
      getProjects(uid, (projects) => {
        const arr = []
        projects.forEach((project) => {
          const aux = {
            ...project.data(),
            id: project.id,
          }
          arr.push(aux)
        })
        setProjects(arr)
      })
    }
  }

  const loadTymesByProject = async (uid, project) => {
    //console.log(project)
    setTymes([])
    getTymesByProject(uid, project, docs => { 
      const arr = []
      docs.forEach(doc => {
        const aux = {
          ...doc.data(),
          id: doc.id
        }
        arr.push(aux)
      })
      setTymes(arr)
    })

    console.log(tymes)
  }

  useEffect(() => {
    if (selectedProject != null) {
      //console.log(selectedProject)
      loadTymesByProject(user.uid, selectedProject.name)
      console.log('RenderTymes')
    }
  }, [selectedProject])

  useEffect(() => {
    loadProjects(user.uid)
    //console.log(projects)
  }, [user, selectedProject])

  const handleSelectProject = (project) => {
    setSelectedProject(project)
  }

  //
  const [selectedTyme, setSelectedTyme] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openTyme = (tyme) => {
    //console.log(tyme)
    setSelectedTyme(tyme)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    loadTymesByProject(user.uid, selectedProject.name)
  }

  //
  const [showAdd, setShowAdd] = useState(false)
  const [values, setValues] = useState({
    name: "",
    description: "",
  })
  const [msgerror, setmsgerror] = useState('')
  const [showDelete, setShowDelete] = useState(false)
  const modalRef = useRef(null)

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      console.log('modal')
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

  const handleSubmit = (event) => {
    event.preventDefault()
    if(projects.some(project => project.name === values.name)){
      setmsgerror('No puedes añadir dos proyectos con el mismo nombre')
    }
    else{
      addProject(user.uid, values.name, values.description)
      setValues({
        name: "",
        description: "",
      })
      loadProjects(user.uid)
      setShowAdd(false)
    }

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

  const deleteProject = (deleteTymes) => {
    if(!deleteTymes){
      deleteProjectFB(selectedProject.id)
    }
    else{
      deleteProjectFB(selectedProject.id)
      deleteTymeByProject(user.uid, selectedProject.name)
    }
    loadProjects(user.uid)
    setSelectedProject(null)
  }

  return selectedProject === null ? (
    <div>
      <div className="header-flex tool-header">
        <Link  to={'/dashboard/overview'} replace>
          <button className="back" ><img src={`/src/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} /></button>
        </Link>
        <h1>{t('projects.title')}</h1>
      </div>
      <button onClick={() => setShowAdd(true)}>add project</button>
      {projects.map((project, index) => (
        <div key={index} className="tyme-sm-title" onClick={() => handleSelectProject(project)}>{project.name}</div>
      ))}

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
                <p>{msgerror}</p>
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
          : null
      }
    </div>
  )
    : (
      <div>
        <button onClick={() => setSelectedProject(null)}>back</button>
        <p>{selectedProject.name}</p>
        <div className="tyme-container">
          <button onClick={() => setShowAdd(true)}>delete project</button>
          {
            showAdd ? 
            <div className="modal">
              <div className="modal-content" ref={modalRef}>
                <p>¿Deseas eliminar los Tymes asociados a este proyecto?</p>
                <button onClick={() => deleteProject(false)}>Eliminar proyecto</button>
                <button onClick={() => deleteProject(true)}>Eliminar proyecto y Tymes</button>
                <button onClick={() => setShowDelete(false)}>canclel</button>
              </div>
            </div>
            : null
          }
          {tymes.map((tyme, index) => (
            <div className='tyme-sm' key={index} tabIndex={0} onClick={() => openTyme(tyme)}>
              <p className="tyme-sm-title">{tyme.title}</p>
              <p className="tyme-sm-body">{tyme.body}</p>
            </div>
          ))}
        </div>
        <Tyme tyme={selectedTyme} day={startOfToday()} isOpen={isModalOpen} onClose={closeModal} />
      </div>
    )
}

export default Projects