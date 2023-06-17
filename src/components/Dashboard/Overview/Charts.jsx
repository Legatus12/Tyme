import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../GlobalProvider"
import { TymesByProjectChart } from "./Charts/TymesByProjectChart"
import { HabitsChart } from "./Charts/HabitsChart"
import { getProjects, getTymes, getTymesByProject, getHabits } from "../../../../firebase"

const Charts = () => {

  const { user, tymes, projects } = useContext(GlobalContext)

  const { t } = useTranslation()

  const [title, setTitle] = useState(t('charts.title'))
  const [habits, setHabits] = useState([])
  const [tymesByProject, setTymesByProject] = useState({})
  const [tymesByDate, setTymesByDate] = useState({})
  const [refresh, setRefresh] = useState(0)
  
  /*
  setTymesByDate(tymes.reduce((acc, tyme) => {
      const { date } = tyme
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {}))
  */

  //

  return (
    <div className="charts full">
      <div className="header-flex tool-header">
        <Link className="back" to={'/dashboard/overview'} replace>
          <img src={`/src/assets/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />
        </Link>
        <h1>{title}</h1>
      </div>
      <div className="charts-container">
        <div className="chart w-1/3 bg-white rounded-2xl">
          <h2>{t('charts.tymesByProject')}</h2>
          <TymesByProjectChart />
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
  