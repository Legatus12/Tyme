import { Link, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTymesFb, addTymeFb, deleteTymeFb  } from "../../../firebase";
import Calendar from './Overview/Calendar'
import Habits from './Overview/Habits'
import Notes from './Overview/Notes'
import Projects from './Overview/Projects'

const Overview = ({user}) => {

    const [tymes, setTymes] = useState([]);
    const [date, setDate] = useState(new Date())
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
  
    const getTymes = async (user) => {
        const tymes = await getTymesFb(user.uid);
        setTymes(tymes);
        console.log(tymes)
    }

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
    
    return (
        <div className='overview full'>

            <div className='day'>
                <p className='underline'>Madrid</p>
                <p className='text-4xl'>Sábado, 13 de mayo</p>
                <br /><br /><br />
                <p className='text-8xl font-black self-end'>20º</p>
                <p className='self-end mr-12'>12º - 26º</p>
                <p className='mt-auto text-2xl'>{date.toLocaleTimeString()}</p>
            </div>

            <div className='calendar'>
               <Calendar tymes={tymes} /> 
            </div>

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
    )
}

export default Overview
