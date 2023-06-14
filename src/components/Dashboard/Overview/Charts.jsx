import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../AuthProvider"
import { TymesByProjectChart } from "./Charts/TymesByProjectChart"
import { getProjects, getTymes } from "../../../../firebase"

const Charts = () => {

  const user = useContext(AuthContext)

  const { t } = useTranslation()

  const [projects, setProjects] = useState([])
  const [tymes, setTymes] = useState([])
  const [tymesByProject, setTymesByProject] = useState({})
  
  //

  useEffect(() => {

    getTymes(user.uid, (docs) => {
      const arr = []
      docs.forEach(doc => {
        const aux = { id: doc.id, ...doc.data() }
        arr.push(aux)
      })
      setProjects(arr)
    })

    getTymes(user.uid, (docs) => {
      const arr = []
      docs.forEach(doc => {
        const aux = { id: doc.id, ...doc.data() }
        arr.push(aux)
      })
      setTymes(arr)
    })

    setTymesByProject(tymes.reduce((acc, tyme) => {
      const { project } = tyme
      acc[project == undefined ? t('tyme.withoutProj') : project] = (acc[project] || 0) + 1
      return acc
    }, {}))
    console.log(tymesByProject)
  }, [user])

  //

  return (
    <div className="charts full">
      <div className="header-flex tool-header">
        <Link className="back" to={'/dashboard/overview'} replace>
          <img src={`/src/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />
        </Link>
        <h1>{t('charts.title')}</h1>
      </div>
      <div className="charts-container">
        <div className="chart">
          <h2>{t('charts.tymesByProject')}</h2>
          <TymesByProjectChart tymesByProject={tymesByProject} />
        </div>
        
      </div>
    </div>
  )
}
  
export default Charts
  