import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend)

export const TymesByProjectChart = ({tymesByProject}) => {

useEffect(() => {
    console.log(tymesByProject)
}, [])

    const options = {
        responsive: true
    }
    
    const data = {
        labels: Object.keys(tymesByProject),
        datasets: [
          {
            label: 'tymes',
            data: Object.values(tymesByProject),
            backgroundColor: ['#fad6a5', '#fcddb4']
          }
        ]
    }

    return <Doughnut data={data} options={{}} />
}