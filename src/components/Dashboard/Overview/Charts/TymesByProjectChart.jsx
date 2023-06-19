import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useContext, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { GlobalContext } from "../../../../GlobalProvider";
import { useTranslation } from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend)

export const TymesByProjectChart = () => {

  const { t } = useTranslation()

  const { tymes, projects } = useContext(GlobalContext)

  //

  const tymesByProject = tymes.reduce((acc, tyme) => {
    const { project } = tyme
    acc[project == '' ? t('tyme.withoutProj') : project] = (acc[project == '' ? t('tyme.withoutProj') : project] || 0) + 1
    return acc
  }, {})

  const options = {
      responsive: true
  }
  
  const data = {
      labels: Object.keys(tymesByProject),
      datasets: [
        {
          label: 'tymes',
          data: Object.values(tymesByProject),
          backgroundColor: ['#000', '#424242', '#646464', '#808080']
        }
      ]
  }

  return <Doughnut data={data} options={{}} />
}