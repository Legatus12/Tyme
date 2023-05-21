import { Link, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTymesFb, addTymeFb, deleteTymeFb  } from "../../../firebase";
import axios from 'axios'
import Calendar from './Overview/Calendar'
import Habits from './Overview/Habits'
import Notes from './Overview/Notes'
import Projects from './Overview/Projects'

const key = import.meta.env.VITE_API_KEY

const Overview = ({user}) => {

    const [tymes, setTymes] = useState([]);
    const [date, setDate] = useState(new Date())
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [pos, setPos] = useState({ data: null });
    const [weather, setWeather] = useState({ data: null });



    const getTymes = async (user) => {
        const tymes = await getTymesFb(user.uid);
        setTymes(tymes);
        //console.log(tymes)
    }

    const getLocationByIP = async () => {
        try {
          const response = await axios.get('http://ip-api.com/json');
          setPos(response.data);
          //console.log(pos)
        } catch (error) {
          console.error('Error retrieving location:', error);
        }
      };
      
      const getWeather = async (pos) => {
        if (pos.data !== null) {
          axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lon}&units=metric&appid=${key}`)
            .then((data) => {
              setWeather(data.data);
              //console.log(data.data);
            });
        }
      };
      
      useEffect(() => {
        getLocationByIP();
      }, []);
      
      useEffect(() => {
        if (pos !== null) {
          getWeather(pos);
        }
      }, [pos]);

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
      };

      const handleDeleteTyme = async (tymeId) => {
        try {
          await deleteTymeFb(user.uid, tymeId);
          const updatedTymes = tymes.filter((tyme) => tyme.id !== tymeId)
          setTymes(updatedTymes)
        } catch (error) {
          console.error('Error deleting tyme:', error)
        }
      };
    
    if(weather.data!==null){return (
        <div className='overview full'>

            <div className='day'>
                <p className='underline'>{pos.city}</p>
                <p className='text-4xl'>Sábado, 13 de mayo</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}  width="150" height="150"></img>
                <p className='text-8xl font-black self-end'>{Math.round(weather.main.temp)}º</p>
                <p className='self-end mr-12'>{ Math.round(weather.main.temp_min)}º - {Math.round(weather.main.temp_max)}º</p>
                <p className='mt-auto text-2xl'>{date.toLocaleTimeString()}</p>
            </div>

            <Calendar tymes={tymes} /> 
            
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
 
            </div>

        </div>
    )}
}

export default Overview
