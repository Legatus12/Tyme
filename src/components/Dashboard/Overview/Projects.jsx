import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import { addProject, getProjects, getTymesByProject, deleteProjectFB } from "../../../../firebase"
import { AuthContext } from '../../../AuthProvider'
import Tyme from '../../Tyme'
import { startOfToday } from 'date-fns';

function Projects() {

  const user = useContext(AuthContext)
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tymes, setTymes] = useState([])


  const loadProjects = async (uid) => {
    if (uid) {
      const arr = []
      getProjects(uid, (projects) => {
        projects.forEach((project) => {
          const aux = {
            ...project.data(),
            id: project.id,
          };
          arr.push(aux);
        })
        setProjects(arr)
      })
    }
  }

  const loadTymesByProject = async (uid, project) => {
    //console.log(project)
    setTymes([])
    const arr = []
    getTymesByProject(uid, project, docs => docs.forEach(doc => {
      const aux = {
        ...doc.data(),
        id: doc.id
      }
      arr.push(aux)
    }))
    setTymes(arr)
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
  const [showAdd, setShowAdd] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
  });
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values)
    addProject(user.uid, values.name, values.description)
    setValues({
      name: "",
      description: "",
    });
    loadProjects(user.uid)
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

  const deleteProject = (id) => {
    deleteProjectFB(id)
    loadProjects(user.id)
    setSelectedProject(null)
  }

  return selectedProject === null ? (
    <div>
      <Link to={'/dashboard/overview'} replace>
        <button className="close" ><img src="/src/img/close.png" /></button>
      </Link>
      <h1>Projects</h1>
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
          <button onClick={() => deleteProject(selectedProject.id)}>delete project</button>
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