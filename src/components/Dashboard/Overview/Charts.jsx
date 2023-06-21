import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../GlobalProvider"
import { TymesByProjectChart } from "./Charts/TymesByProjectChart"
import { HabitsChart } from "./Charts/HabitsChart"

const Charts = () => {

  const { user, tymes, projects, habits } = useContext(GlobalContext)

  const { t } = useTranslation()

  //

  return (
    <div className="charts full">
      <div className="header-flex tool-header">
        <Link className="back" to={'/dashboard/overview'} replace>
          <img src={`/img/back${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />
        </Link>
        <h1>{t('charts.title')}</h1>
      </div>
      <div className="charts-container">
        <div className="charts-subcontainer">
          <div className="chart justify-center max-w-[24rem] max-h-[32rem]">
            <h2>{t('charts.tbp')}</h2>
            <TymesByProjectChart />
          </div>
          {projects.map((project, index) => (
            <div key={index} className="w-full flex flex-col bg-white p-4 rounded-2xl gap-4">
              <div className="flex justify-between items-center">
                <h2>{t('charts.project')} - {project.name}</h2>
                <p className="w-20">{project.done}/{project.number} tymes</p>
              </div>
              <div className="w-full h-8 bg-black p-1 relative rounded-2xl">
                <div className="bg-sunset h-full flex justify-end px-1 rounded-xl" style={{ width: `${project.percentage}%` }}>
                  <p className="font-bold overflow-hidden">{Math.floor(parseFloat(project.percentage))}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="charts-subcontainer">
        {habits.map((habit, index) => (
          <div key={index} className="chart justify-between max-w-[42rem] md:w-[42rem] max-h-[28rem] md:h-[28rem]">
            <p className="tracking">{t('charts.tracking')}</p>
            <div className="flex items-center">
              <h2>{t('charts.habit')} - {habit.name}</h2>
            </div>
            <HabitsChart habit={habit} />
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}
  
export default Charts
