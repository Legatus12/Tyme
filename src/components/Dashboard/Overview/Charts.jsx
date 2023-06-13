import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const Charts = () => {

  const { t } = useTranslation()

  return (
    <div className="charts">
      <div className="header-flex tool-header">
        <Link  to={'/dashboard/overview'} replace>
          <button className="back" ><img src={`/src/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} /></button>
        </Link>
        <h1>{t('charts.title')}</h1>
      </div>
    </div>
  )
}
  
export default Charts
  