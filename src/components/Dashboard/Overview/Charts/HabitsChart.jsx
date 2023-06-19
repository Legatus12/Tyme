import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js"
import { eachDayOfInterval, startOfToday, add, format } from "date-fns"
import { Line } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement)

export const HabitsChart = ({habit}) => {

  let today = startOfToday()

  let ago = add(today, { days: -15 })

  let days = eachDayOfInterval({
    start: ago,
    end: today
  })
  
  const labels = []
  days.map(x => labels.push(format(x, 'dd-MM-yyyy')))

  const dataAux = []
  days.map(x => {
    if(habit.completed.some(completed => completed == format(x, 'dd-MM-yyyy')))
      dataAux.push(1)
    else {
      if(habit.recur.some(recur => recur == x.getDay()))
        dataAux.push(-1)
      else
        dataAux.push(0)
  }})

  const options = {
    scales: {
      y: {
        suggestedMin: -1,
        suggestedMax: 2, 
        ticks: {
          autoSkip: true,
          beginAtZero: true,
          callback: function (value) {
            if(value == 1)
              return 'realizado'
            else if(value == 0)
              return 'no programado'
            else if(value == -1)
              return 'no realizado'
          } 
        }
      }
    }
  }
    
  const data = {
      labels: labels,
      datasets: [
        {
          label: '',
          data: dataAux,
          tension: 1,
          cubicInterpolationMode: 'monotone',
          pointBackgroundColor: '#fad6a5',
          borderColor: '#000'
        }
      ]
  }

  return (<Line data={data} options={options} />)
}