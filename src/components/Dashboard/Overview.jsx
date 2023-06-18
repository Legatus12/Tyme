import { Link, Route, Routes } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Day from './Overview/Day'
import Calendar from './Overview/Calendar'
import Habits from './Overview/Habits'
import Notes from './Overview/Notes'
import Projects from './Overview/Projects'
import { Menu, Transition } from '@headlessui/react'
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday, startOfTomorrow } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { GlobalContext } from '../../GlobalProvider'
import Tyme from '../Tyme'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const key = import.meta.env.VITE_API_KEY

const Overview = () => {

  const { user, tymes } = useContext(GlobalContext)

  const { t, i18n } = useTranslation()

  const date = new Date()
  const [pos, setPos] = useState({ data: null })
  const [weather, setWeather] = useState({ data: null })
  const [dayModal, setDayModal] = useState(false)
  let [selectedDay, setSelectedDay] = useState(startOfToday())

  //  

  const openDayModal = (day) => {
    setSelectedDay(day)
    setDayModal(true)
  }

  const closeDayModal = () => {
    setDayModal(false)
  }

  //

  const getLocationByIP = async () => {
      try {
        const response = await axios.get('http://ip-api.com/json')
        setPos(response.data)
        //console.log(pos)
      } catch (error) {
        console.error('Error retrieving location:', error)
      }
  }
  
  useEffect(() => {
    getLocationByIP()
  }, [])

  //

  const getWeather = async (pos) => {
    if (pos.data !== null) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lon}&units=metric&appid=${key}`)
        .then((data) => {
          setWeather(data.data)
          //console.log(data.data)
        })
    }
  }
  
  useEffect(() => {
    if (pos !== null) {
      getWeather(pos)
    }
  }, [pos])

  //

  const getOrdinal = (number) => {
    if(number == 1)
      return 'st'
    else if(number == 2)
      return 'nd'
    else if(number == 3)
      return 'rd'
    else
      return 'th'
  }

  //

  const [selectedTyme, setSelectedTyme] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openTyme = (tyme) => {
    setSelectedTyme(tyme)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  //
    
  if(!dayModal){return (
      <div className='overview full'>

        <div className='overview-left'>

          <div className='day'>
            {weather.data !== null && 
              <div className='flex flex-col justify-center items-center py-8 pl-8 pr-8 md:pr-0 gap-4'>
                <div className='wheather-container'>
                  <div className='wheather'>
                    <img className='w-full' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}  width="100" height="100"></img>             
                  </div>
                  <div className='temperature'>
                    <p>{Math.round(weather.main.temp)}<span className='font-normal'>º</span></p>
                  </div>
                </div>
                <p className=''>{pos.city}</p>
              </div>
              
            }
            <div className='today'>
              <p className='text-2xl self-start'>
                {t('date.day.' + date.getDay()) + ', '}
                {i18n.resolvedLanguage == 'es' 
                ? date.getDate() + ' de ' + t('date.month.' + date.getMonth())
                : t('date.month.' + date.getMonth()) + ' ' + date.getDate() + getOrdinal(date.getDate())}
              </p>
              <br />
              <div className='tyme-container'>
                {tymes.filter(x => x.date == format(date, 'dd-MM-yyyy')).map((tyme, index) => (
                <div className='tyme-sm' key={index} tabIndex={0} onClick={() => openTyme(tyme)}>
                    <p className='tyme-sm-title'>{tyme.title}</p>
                    <p className='tyme-sm-body'>{tyme.body}</p>
                </div>
                ))}
                <button className='tyme-add' onClick={() => openTyme(null)}>{t('overview.todayMsg')}</button>
              </div>
            </div>
          </div>

          <div className='tools'>
            <Link to={'notes'} >
              <img src={`/src/assets/img/notes${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />
              <p>{t('overview.notes')}</p>
            </Link>
            <Link to={'projects'} >
              <img src={`/src/assets/img/projects${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />
              <p>{t('overview.projects')}</p>
            </Link>
            <Link to={'habits'} >
              <img src={`/src/assets/img/habits${document.documentElement.classList.contains("dark") ? '_dm' : ''}.png`} />
              <p>{t('overview.habits')}</p>
            </Link>
          </div>

        </div>

        <div className='overview-right'>

          <Calendar openDayModal={openDayModal} closeDayModal={closeDayModal}/>

          <div className='incoming'>
            <h1 className='text-xl font-black'>{t('overview.incoming')}</h1>
            <div className='tyme-container'>
              {tymes.filter(x => x.timestamp >= startOfTomorrow().getTime()).sort((a, b) => a.timestamp < b.timestamp ? -1 : 1).map((tyme, index) => (
                <div className='tyme-sm' key={index} tabIndex={0} onClick={() => openTyme(tyme)}>
                  <p className='tyme-sm-days'>{t('overview.in')} {Math.floor((tyme.timestamp - startOfToday().getTime()) / (1000 * 60 * 60 * 24))} {Math.floor((tyme.timestamp - startOfToday().getTime()) / (1000 * 60 * 60 * 24)) == 1 ? t('overview.day') : t('overview.days')}</p>
                  <p className='tyme-sm-title'>{tyme.title}</p>
                </div>
              ))}
              {tymes.length < 1 && (
                <p className='my-6'>{t('overview.incomingMsg')}</p>
              )}
            </div>
          </div>

        </div>

        <Tyme tyme={selectedTyme} day={date} isOpen={isModalOpen} onClose={closeModal} />
      </div>
  )}
  else{return(
    <Day day={selectedDay} closeDayModal={closeDayModal} user={user} />
  )}
}

export default Overview