import { Link, Route, Routes } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { getTymes, getTymesInDay, getIncomingTymes } from "../../../firebase"
import axios from 'axios'
import Day from './Overview/Day'
import Calendar from './Overview/Calendar'
import Habits from './Overview/Habits'
import Notes from './Overview/Notes'
import Projects from './Overview/Projects'
import { Menu, Transition } from '@headlessui/react'
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../AuthProvider'
import Tyme from '../Tyme'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const key = import.meta.env.VITE_API_KEY

const Overview = () => {

  const user = useContext(AuthContext)

  const { t, i18n } = useTranslation()

  let today = startOfToday()
  const [todayTymes, setTodayTymes] = useState([])
  const [incomingTymes, setIncomingTymes] = useState([])
  const [date, setDate] = useState(new Date())
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [pos, setPos] = useState({ data: null })
  const [weather, setWeather] = useState({ data: null })
  const [dayModal, setDayModal] = useState(false)
  let [selectedDay, setSelectedDay] = useState(today)

  //  

  const openDayModal = (day) => {
    setSelectedDay(day)
    setDayModal(true)
  }

  const closeDayModal = () => setDayModal(false)

  //

  const loadTymes = (uid) => {
    setTodayTymes([])
    const todayTymes = []
    getTymesInDay(uid, format(today, 'dd-MM-yyyy'), docs => docs.forEach(doc =>{ 
      const aux = {
        ...doc.data(),
        id: doc.id
      }
      todayTymes.push(aux)
  }))
    //console.log(today)
    setTodayTymes(todayTymes)

    setIncomingTymes([])
    const incomingTymes = []
    getIncomingTymes(uid, docs => docs.forEach(doc => {
      const aux = {
        ...doc.data(),
        id: doc.id
      }
      incomingTymes.push(aux)
    
    }))
    setIncomingTymes(incomingTymes)
  }

  useEffect(() => {
    loadTymes(user.uid);
  }, [user])

  const getLocationByIP = async () => {
      try {
        const response = await axios.get('http://ip-api.com/json')
        setPos(response.data);
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

  useEffect(() => {
      setInterval(() => setDate(new Date()), 1000)
  }, [])

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
    console.log(tyme)
    setSelectedTyme(tyme)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    loadTymes(user.uid)
  }

  //
    
  if(!dayModal){return (
      <div className='overview full'>

          <div className='day'>
              <p className='text-3xl self-start'>
                {t('date.day.' + date.getDay()) + ', '}
                {i18n.resolvedLanguage == 'es' 
                ? date.getDate() + ' de ' + t('date.month.' + date.getMonth())
                : t('date.month.' + date.getMonth()) + ' ' + date.getDate() + getOrdinal(date.getDate())}
              </p>
              <p className='text-gray self-start'>{date.toLocaleTimeString()}</p>
              <br />
              <p>{pos.city}</p>
              {weather.data !== null && 
                <div className='flex flex-col items-center'>
                  <img className='' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}  width="120" height="120"></img>
                  <div className='flex justify-center gap-4'>
                    <p className='self-center mr-2'>{ Math.round(weather.main.temp_min)}º</p>
                    <p className='text-8xl font-black'>{Math.round(weather.main.temp)}<span className='font-normal'>º</span></p>
                    <p className='self-center'>{Math.round(weather.main.temp_max)}º</p>
                  </div>
                </div>
              }
          </div>

          <Calendar openDayModal={openDayModal} closeDayModal={closeDayModal}/>
          
          <div className='tymes'>
            <div className='today'>
              <h1 className='text-2xl font-black'>{t('overview.today')}</h1>
              <div className='tyme-container'>
                {todayTymes.map((tyme, index) => (
                <div className='mini-tyme' key={index} tabIndex={0}>
                    {tyme.title}
                </div>
                ))}
                {todayTymes.length < 1 && (
                  <button className='tyme-sm-add'>{t('overview.todayMsg')}</button>
                )}
              </div>
            </div>
            <div className='incoming'>
              <h1 className='text-2xl font-black'>{t('overview.incoming')}</h1>
              <div className='tyme-container'>
                {incomingTymes.map((tyme, index) => (
                  <div className='tyme-sm' key={index} tabIndex={0} onClick={() => openTyme(tyme)}>
                    <p className='tyme-sm-days'>dentro de {Math.floor((tyme.timestamp - today.getTime()) / (1000 * 60 * 60 * 24))} días</p>
                    <p className='tyme-sm-title'>{tyme.title}</p>
                  </div>
                ))}
                {incomingTymes.length < 1 && (
                  <p className='my-6'>{t('overview.incomingMsg')}</p>
                )}
              </div>
            </div>
          </div>

          <div className='tools'>
              <Link to={'notes'} >notes</Link>
              <Link to={'projects'} >projects</Link>
              <Link to={'habits'} >habits</Link>
              <Link to={'charts'} >charts</Link>
          </div>

          <Tyme tyme={selectedTyme} day={null} isOpen={isModalOpen} onClose={closeModal}/>
      </div>
  )}
  else{return(
    <Day day={selectedDay} closeDayModal={closeDayModal} user={user} loadTymesOv={loadTymes}/>
  )}
}

export default Overview
