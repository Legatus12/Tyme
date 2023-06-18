import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement)

export const HabitsChart = () => {

    const options = {
        scales: {
          y: {
            suggestedMin: -1, // Valor mínimo del eje Y
            suggestedMax: 2, // Valor máximo del eje Y
            ticks: {
                autoSkip: true,
                beginAtZero: true,
                callback: function (value) {
                    if(value == 1)
                        return 'realizado';
                    else if(value == 0)
                        return 'no programado'
                    else if(value == -1)
                        return 'no realizado'
                }
              }
          }
        }
      };
    
    const data = {
        labels: ['12/6', '13/6', '14/6', '15/6', '17/6', '18/6'],
        datasets: [
          {
            label: '',
            data: [1, 0, -1, 0, 1, 0],
            tension: 1,
            cubicInterpolationMode: 'monotone',
            pointBackgroundColor: '#fad6a5',
            borderColor: '#000'
          }
        ]
    }

    return <Line data={data} options={options} />
}