import React, { useState, useRef, useEffect, useContext } from 'react'
import Select from 'react-select'
import { addTyme, updateTyme, getProjects, deleteTyme, updateTymeField } from "../../firebase"
import { GlobalContext } from '../GlobalProvider'
import { useTranslation } from 'react-i18next'
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, set, startOfToday } from 'date-fns'

const ModalAddTyme = ({ tyme, day, isOpen, onClose }) => {

  const { user, projects } = useContext(GlobalContext)

  const { t } = useTranslation()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [date, setDate] = useState(day)
  const [done, setDone] = useState('')
  const [selectedProject, setSelectedProject] = useState('')
  const [msgerror, setmsgerror] = useState('')

  //

  useEffect(() => {
    if (tyme != null) {
      setTitle(tyme.title)
      setBody(tyme.body)
      setSelectedProject(tyme.project)
      const auxDate = new Date(tyme.timestamp)
      setDate(auxDate)
      setDone(tyme.done)
    }
    else {
      setTitle('')
      setBody('')
      setSelectedProject('')
      setDate(day)
      setDone(false)
    }
  }, [tyme])

  //

  const handleProjectChange = (project) => {
    if (tyme != null) {
      updateTyme(tyme.id, { ...tyme, project })
    } 
    setSelectedProject(project)
  }

  const handleDone = (event) => {
    const isChecked = event.target.checked
    setDone(isChecked)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(title !== ''){
      if (tyme !== null) {
        let aux = { id: tyme.id, title: title, body: body, date: format(date, 'dd-MM-yyyy'), timestamp: date.getTime(), done: done }
        typeof selectedProject !== 'undefined' ? aux.project = selectedProject : null
        updateTyme(tyme.id, aux)
      }
      else {
        addTyme(user.uid, title, body, format(date, 'dd-MM-yyyy'), date.getTime(), selectedProject)
      }
      onClose()
      setTitle('')
      setBody('')
      setmsgerror('')
    }
    else{
      setmsgerror(t('tyme.noTitle'))
    }
  }

  const onChangeDate = (date) => {
    const dateArray = date.split("-")
    const dateObject = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
    setDate(dateObject)
  }

  //

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

  const close = () => {
    onClose()
    setmsgerror('')
  }

  //

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
          <div className='flex flex-col md:flex-row md:justify-between xl:justify-normal xl:gap-8 flex-wrap py-2 gap-2 md:gap-0'>
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
              <span className='mr-4'>-</span>
              <select id="project" className='bg-white' value={selectedProject} onChange={(e) => handleProjectChange(e.target.value)}>
                <option value="">{t('tyme.withoutProj')}</option>
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
              onChange={(e) => setBody(e.target.value.replace(/\n/g, '<br>'))}
            />
          </div>
          <div className='flex flex-col'>
            <p className='modal-error'>{msgerror}</p>
            <div className="modal-footer">
              <button className='modal-cancel' onClick={() => close()}>{tyme != null ? t('tyme.close') : t('tyme.cancel')}</button>
              <button className='modal-save' type="submit">{tyme != null ? t('tyme.save') : t('tyme.add')}</button>
              <button className={`${tyme != null ? 'block' : 'hidden'} modal-delete md:w-fit`} onClick={() => deleteTyme(tyme.id)}>{t('tyme.delete')}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null
}

export default ModalAddTyme
