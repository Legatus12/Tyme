import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../AuthProvider"
import { TymesByProjectChart } from "./Charts/TymesByProjectChart"
import { HabitsChart } from "./Charts/HabitsChart"
import { getProjects, getTymes, getTymesByProject, getHabits } from "../../../../firebase"

const Charts = () => {

  const user = useContext(AuthContext)

  const { t } = useTranslation()

  const [title, setTitle] = useState(t('charts.title'))
  const [projects, setProjects] = useState([])
  const [tymes, setTymes] = useState([])
  const [habits, setHabits] = useState([])
  const [tymesByProject, setTymesByProject] = useState({})
  const [tymesByDate, setTymesByDate] = useState({})
  const [refresh, setRefresh] = useState(0)
  
  //

  const loadTymes = (uid) => {
    getTymes(uid, (docs) => {
      const arr = []
      docs.forEach(doc => {
        const aux = { id: doc.id, ...doc.data() }
        arr.push(aux)
      })
      setTymes(arr)
    })
  }

  const loadProjects = (uid) => {
    if (uid) {
      getProjects(uid, (projects) => {
        const arr = []
        projects.forEach((project) => {
          //getTymesByProject(uid, project.data().name, (docs) => docs.forEach(() => number ++))
          const aux = {
            ...project.data(), 
            number: 0,
            done: 0,
            id: project.id
          }
          arr.push(aux)
        })
        setProjects(arr)
      })
    }
  }

  const loadHabits = async (uid) => {
    if (uid) {
      getHabits(uid, (habits) => {
        const arr = []
        habits.forEach((habit) => {
          const aux = {
            ...habit.data(),
            id: habit.id,
          }
          arr.push(aux)
        })
        setHabits(arr)
      })
    }
  }

  const loadNumbers = () => {
    const aux = [] 
    projects.map(project => {
      let number = 0
      let done = 0
      tymes.map(tyme => {
        tyme.project == project.name ? number++ : 0
        tyme.project == project.name && tyme.done ? done ++ : 0
      })
      console.log(number)
      console.log(done)
      project.number = number
      project.done = done
      aux.push(project)
    })
    setProjects(aux)
    console.log(projects)
  }

  useEffect(() => {

    loadTymes(user.uid)
    loadProjects(user.uid)
    loadHabits(user.uid)
    loadNumbers()

    setTymesByProject(tymes.reduce((acc, tyme) => {
      const { project } = tyme
      acc[project] = (acc[project] || 0) + 1
      return acc
    }, {}))

    setTymesByDate(tymes.reduce((acc, tyme) => {
      const { date } = tyme
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {}))

  }, [user])

  useEffect(() => {
    setProjects(projects)
  }, [projects, user])

  //

  return (
    <div className="charts full">
      <div className="header-flex tool-header">
        <Link className="back" to={'/dashboard/overview'} replace>
          <img src={`/src/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />
        </Link>
        <h1>{title}</h1>
      </div>
      <div className="charts-container">
        <div className="chart w-1/3 bg-white rounded-2xl">
          <h2>{t('charts.tymesByProject')}</h2>
          <TymesByProjectChart tymesByProject={tymesByProject} />
        </div>

        <div className="flex flex-col w-2/3 gap-8">
          <div className="w-full flex flex-col bg-white p-4 rounded-2xl gap-4">
            <div className="flex justify-between items-center">
              <div>
                <label>Proyecto -</label>
                <select className="bg-transparent"> <option>Daw</option> </select>
              </div>
              <p className="w-20">2/3 tymes</p>
            </div>
            <div className="w-full h-8 bg-black p-1 relative rounded-2xl">
              <div className="bg-sunset h-full flex justify-end px-1 rounded-xl" style={{ width: `${66}%` }}>
                <p className="font-bold">66%</p>
              </div>
            </div>
          </div>
            
          <div className='chart full'>
            <div className="self-start p-4">
              <label>Hábito -</label>
              <select className="bg-transparent"> <option>Entrenar</option> </select>
            </div>
            <HabitsChart />
          </div>
        </div>

      </div>
    </div>
  )
}
  
export default Charts
  