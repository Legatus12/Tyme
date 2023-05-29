import { Link, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const key = import.meta.env.VITE_API_KEY

const Overview = ({user}) => {

  const { t, i18n } = useTranslation()

  let today = startOfToday()
  const [tymes, setTymes] = useState([])
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
    const today = []
    getTymesInDay(uid, date.getDate(), date.getMonth() + 1, date.getFullYear(), docs => docs.forEach(doc => today.push({id: doc.id, ...doc.data()})))
    //console.log(today)
    setTodayTymes(today)

    setIncomingTymes([])
    const incoming = []
    getIncomingTymes(uid, docs => docs.forEach(doc => incoming.push(doc.data())))
    setIncomingTymes(incoming)
  }

  useEffect(() => {
    loadTymes(user.uid)
  }, [user])

  //

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
          console.log(data.data)
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
    
  if(weather.data!==null && !dayModal){return (
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
              <div className='flex flex-col items-center'>
                <img className='' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}  width="120" height="120"></img>
                <div className='flex justify-center gap-4'>
                  <p className='self-center mr-2'>{ Math.round(weather.main.temp_min)}º</p>
                  <p className='text-8xl font-black'>{Math.round(weather.main.temp)}<span className='font-normal'>º</span></p>
                  <p className='self-center'>{Math.round(weather.main.temp_max)}º</p>
                </div>
              </div>
          </div>

          <Calendar openDayModal={openDayModal} closeDayModal={closeDayModal}/>
          
          <div className='tymes'>
            <div className='today'>
              <h1 className='text-2xl font-black'>{t('overview.today')}</h1>
              <div className='tyme-container'>
                {todayTymes.map((tyme, index) => (
                <div className='mini-tyme' key={index}>
                    {tyme.title}
                </div>
              ))}
              </div>
            </div>
            <div className='incoming'>
              <h1 className='text-2xl font-black'>{t('overview.incoming')}</h1>
              <div className='tyme-container'>
                {incomingTymes.map((tyme, index) => (
                  <div className='mini-tyme' key={index}>
                      {tyme.title}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='tools'>
              <Link to={'notes'} >notes</Link>
              <Link to={'projects'} >projects</Link>
              <Link to={'habits'} >habits</Link>
              <Link to={'charts'} >charts</Link>
          </div>

      </div>
  )}
  else{return(
    <Day day={selectedDay} closeDayModal={closeDayModal} user={user} />
  )}
}

export default Overview
