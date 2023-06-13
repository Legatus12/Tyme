import { Menu, Transition } from '@headlessui/react'
import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday, startOfWeek } from 'date-fns'
import { Fragment, useEffect, useState, useContext } from 'react'
import { Link, Route } from 'react-router-dom'
import { getTymes } from '../../../../firebase'
import Day from './Day'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../../AuthProvider'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Calendar({ openDayModal, closeDayModal, selectedDay }) {

  const user = useContext(AuthContext)
  
  const { t } = useTranslation()

  const [tymesDates, setTymesDates] = useState([])
  const [date, setDate] = useState(new Date())
  let today = startOfToday()
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  //

  const loadTymes = (uid) => {
    setTymesDates([])
    getTymes(uid, docs => {
      const arr = []
      docs.forEach(doc =>{
        arr.push(doc.data().date)
      })
      setTymesDates(arr)
    })
    //console.log(today)

  }

  useEffect(() => {
    loadTymes(user.uid);
  }, [user])
/**
  const [dayModal, setDayModal] = useState(false)
  let [selectedDay, setSelectedDay] = useState(today)

  const openDayModal = (day) => {
    setSelectedDay(day)
    setDayModal(true)
  }

  const closeDayModal = () => setDayModal(false)
 */
  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  return (
    <div className='calendar-container'>
      <div className="calendar">
        <div className="flex items-center">
          <h2 className="flex-auto font-semibold">
            {t('date.month.' + firstDayCurrentMonth.getMonth())} {format(firstDayCurrentMonth, 'yyyy')}
          </h2>
          <button type="button" onClick={previousMonth} className="hover:bg-gray duration-200 rounded-full w-10 h-10 p-1 flex justify-center items-center">
            <img src="/src/img/left.png" alt="" />
          </button>
          <button onClick={nextMonth} type="button" className="hover:bg-gray duration-200 rounded-full w-10 h-10 p-1 flex justify-center items-center">
            <img src="/src/img/right.png" alt="" />
          </button>
        </div>
        <div className="grid grid-cols-7 text-xs mt-4 leading-6 text-center text-silver">
          <div>{t('date.d.0')}</div>
          <div>{t('date.d.1')}</div>
          <div>{t('date.d.2')}</div>
          <div>{t('date.d.3')}</div>
          <div>{t('date.d.4')}</div>
          <div>{t('date.d.5')}</div>
          <div>{t('date.d.6')}</div>
        </div>
        <div className="grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                ''
              )}
            >
              <button
                type="button"
                onClick={() => openDayModal(day)}
                className={classNames(
                  isEqual(day, selectedDay) && 'text-white',
                  !isEqual(day, selectedDay) && isToday(day) && '',
                  !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && '',
                  !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'font-extralight text-lightgray',
                  isEqual(day, selectedDay) && isToday(day) && '',
                  isEqual(day, selectedDay) && !isToday(day) && '',
                  !isEqual(day, selectedDay) && '',
                  (isEqual(day, selectedDay) || isToday(day)) && 'bg-sunset hover:bg-white text-black',
                  'mx-auto font-semibold flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray duration-200'
                )}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>
                  {format(day, 'd')}
                </time>
              </button>
              <div className="w-full h-2 flex justify-center">
                {tymesDates.some((tyme) =>
                  tyme == format(day, 'dd-MM-yyyy')
                ) && (
                  <div className="w-2 h-2 rounded-full bg-sunset"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  /**
  else{return(
    <div>
      <Day day={selectedDay}  closeDayModal={closeDayModal} />
    </div>
  )} */
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]
