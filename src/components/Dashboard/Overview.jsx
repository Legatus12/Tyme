import { Link, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTymesFb, addTymeFb, deleteTymeFb  } from "../../../firebase";
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
    const [tymes, setTymes] = useState([]);
    const [date, setDate] = useState(new Date())
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [pos, setPos] = useState({ data: null });
    const [weather, setWeather] = useState({ data: null });
    const [dayModal, setDayModal] = useState(false)
    let [selectedDay, setSelectedDay] = useState(today)
  
    const openDayModal = (day) => {
      setSelectedDay(day)
      setDayModal(true)
    }
  
    const closeDayModal = () => setDayModal(false)

    const getTymes = async (user) => {
        const tymes = await getTymesFb(user.uid)
        setTymes(tymes)
        //console.log(tymes)
    }

    const getLocationByIP = async () => {
        try {
          const response = await axios.get('http://ip-api.com/json')
          setPos(response.data);
          //console.log(pos)
        } catch (error) {
          console.error('Error retrieving location:', error)
        }
    }
      
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
      getLocationByIP()
    }, [])
    
    useEffect(() => {
      if (pos !== null) {
        getWeather(pos)
      }
    }, [pos])

    useEffect(() => {
        getTymes(user)
    }, [user])

    useEffect(() => {
        setInterval(() => setDate(new Date()), 1000)
    }, [])

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    
    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }
    
    const handleAddTyme = async () => {
      const tyme = { title, body }
      await addTymeFb(user.uid, tyme)
      setTymes([...tymes, tyme])
      setTitle('')
      setBody('')
    }

    const handleDeleteTyme = async (tymeId) => {
      try {
        await deleteTymeFb(user.uid, tymeId);
        const updatedTymes = tymes.filter((tyme) => tyme.id !== tymeId)
        setTymes(updatedTymes)
      } catch (error) {
        console.error('Error deleting tyme:', error)
      }
    }

    /* Calendar */


    //let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    let days = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    })

    function previousMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
    
    if(weather.data!==null && !dayModal){return (
        <div className='overview full'>

            <div className='day'>
                <p className='text-3xl self-start'>{t('date.day.' + date.getDay())}, {i18n.resolvedLanguage == 'es' ? date.getDate() + ' de ' + t('date.month.' + date.getMonth()) : ''}</p>
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
            
            <div className='incoming'>
                <h1 className='text-2xl font-black'>Próximamente</h1>
                <ul className='list-disc list-inside text-xl'>
                    {tymes.map((tyme, index) => (
                        <li key={index}>
                            <p><b>{tyme.title}</b></p>
                            <p>{tyme.body}</p>
                            <button onClick={() => handleDeleteTyme(tyme.id)}>delete</button>
                        </li>
                    ))}
                </ul>
                <div className="add-tyme">
                    <p>title</p>
                    <input type="text" value={title} onChange={handleTitleChange} />
                    <p>body</p>
                    <input type="text" value={body} onChange={handleBodyChange} />
                    <button onClick={handleAddTyme}>Agregar Tyme</button>
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
      <div>
        <Day day={selectedDay}  closeDayModal={closeDayModal} />
      </div>
    )}
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


export default Overview
