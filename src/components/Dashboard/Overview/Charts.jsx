import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import Chart from 'chart.js/auto'

const Charts = () => {

  const { t } = useTranslation()

  return (
    <div className="charts full">
      <div className="header-flex tool-header">
        <Link className="back" to={'/dashboard/overview'} replace>
          <img src={`/src/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />
        </Link>
        <h1>{t('charts.title')}</h1>
      </div>
      <div className="charts-container">
        <div>
          
        </div>
      </div>
    </div>
  )
}
  
export default Charts
  