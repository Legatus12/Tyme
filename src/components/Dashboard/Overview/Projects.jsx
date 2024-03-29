import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { addProject, deleteProjectFB, deleteTymeByProject } from "../../../../fb"
import { GlobalContext } from '../../../GlobalProvider'
import Tyme from '../../Tyme'
import { startOfToday } from 'date-fns'
import { useTranslation } from 'react-i18next'

const Projects = () => {

  const { user, projects, tymes } = useContext(GlobalContext)

  const { t } = useTranslation()

  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedTyme, setSelectedTyme] = useState(null)

  //

  const handleSelectProject = (project) => {
    setSelectedProject(project)
    console.log(project)
  }

  //

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openTyme = (tyme) => {
    setSelectedTyme(tyme)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  //

  const [showAdd, setShowAdd] = useState(false)
  const [name, setName] = useState('')
  const [msgerror, setmsgerror] = useState('')
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
    if(name == ""){
      setmsgerror(t('error.undefinedProject'))
    }
    else if(projects.some(project => project.name === name)) {
      setmsgerror(t('error.existingProject'))
    }
    else {
      addProject(user.uid, name)
      setName('')
      setShowAdd(false)
      setSelectedProject({ uid: user.uid, name: name })
    }
  }

  const handleChange = (event) => setName(event.target.value)

  const deleteProject = (deleteTymes) => {
    if(!deleteTymes){
      if(confirm(t('confirmDelete'))) {
        deleteProjectFB(selectedProject.id)
        setShowAdd(false)

      }
    }
    else{
      if(confirm(t('confirmDelete'))) {
        deleteProjectFB(selectedProject.id)
        deleteTymeByProject(user.uid, selectedProject.name)
        setShowAdd(false)
      }
    }
    setSelectedProject(null)
    console.log(selectedProject)
  }

  //

  return selectedProject === null ? (
    <div className='projects full'>
      <div className="header-flex tool-header">
        <Link className='back' to={'/dashboard/overview'} replace>
          <img src={`/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />
        </Link>
        <h1>{t('projects.title')}</h1>
      </div>
      <div className='project-container'>
        {projects.map((project, index) => (
          <div key={index} className="project" onClick={() => handleSelectProject(project)} tabIndex={0}>
            <h1 className='project-name'>{project.name}</h1>
            <p className='number-tymes'>{project.number} tymes</p>
          </div>
        ))}
        <button className='project-add' onClick={() => setShowAdd(true)}>{t('projects.add')}</button>
      </div>
      

      {
        showAdd ?
          <div className="modal">
            <div className="modal-content" ref={modalRef}>
              <form onSubmit={handleSubmit}>
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={name}
                  onChange={handleChange}
                  placeholder={t('tyme.withoutTitle')}
                />
                <p className='modal-error mb-4'>{msgerror}</p>
                <button className='modal-cancel' type="submit">{t('projects.save')}</button>
              </form>
            </div>
          </div>
          : null
      }
    </div>
  )
    : (
      <div className='projects full'>
        <div className="header-flex tool-header">
          <button onClick={() => setSelectedProject(null)} className="back" ><img src={`/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} /></button>
          <h1>{selectedProject.name}</h1>
        </div>
        <div className='full flex p-4 md:p-8'>
          <div className="tyme-container">
            <button className='tyme-delete md:w-fit ml-auto' onClick={() => setShowAdd(true)}>{t('projects.deleteThis')}</button>
            {
              showAdd ? 
              <div className="modal">
                <div className="modal-content" ref={modalRef}>
                  <p>{t('projects.deleteMsg')}</p>
                  <div className='modal-footer mt-auto'>
                    <button className='modal-delete' onClick={() => deleteProject(false)}>{t('projects.delete')}</button>
                    <button className='modal-save' onClick={() => deleteProject(true)}>{t('projects.deleteAll')}</button>
                  </div>
                  <button className='modal-cancel' onClick={() => setShowAdd(false)}>{t('tyme.cancel')}</button>
                </div>
              </div>
              : null
            }
            {tymes.filter(x => x.project == selectedProject.name).map((tyme, index) => (
              <div className='tyme-sm' key={index} tabIndex={0} onClick={() => openTyme(tyme)}>
                <p className="tyme-sm-days">{tyme.date}</p>
                <p className="tyme-sm-body">{tyme.title}</p>
              </div>
            ))}
          </div>
        </div>
        
        <Tyme tyme={selectedTyme} day={startOfToday()} isOpen={isModalOpen} onClose={closeModal} />
      </div>
    )
}

export default Projects