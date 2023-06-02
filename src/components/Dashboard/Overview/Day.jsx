import { useState, useEffect, useContext } from "react"
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { getTymesInDay, addTymeFb, deleteTyme, addTyme  } from "../../../../firebase"
import { AuthContext } from '../../../AuthProvider'

const Day = ({day, closeDayModal}) => {

  const user = useContext(AuthContext)

  const { t, i18n } = useTranslation()

  const [tymes, setTymes] = useState([])

  //

  const loadTymes = async (uid) => {
      setTymes([])
      const arr = []
      getTymesInDay(uid, format(day, 'dd-MM-yyyy'), docs => docs.forEach(doc => arr.push(doc.data())))
      setTymes(arr)
  }

  useEffect(() => {
    loadTymes(user.uid)
  }, [user])

  //

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
      /*
    try {
      await deleteTymeFb(user.uid, tymeId)
      const updatedTymes = tymes.filter((tyme) => tyme.id !== tymeId)
      setTymes(updatedTymes)
    } catch (error) {
      console.error('Error deleting tyme:', error)
    }*/
  }

  //

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

  const test = () => {
      addTyme(user.uid, format(day, 'dd-MM-yyyy'), format(day, 'dd-MM-yyyy'), day.getTime())
  }

  const deleteTest = (id) => {
      deleteTyme(id)
  }

  //

  return(
      <div className="day-view full">
          <button className="close" onClick={() => closeDayModal()}><img src="/src/img/close.png"/></button>
          <button className="bg-[#f1121f] w-fit ml-auto p-2 text-white" onClick={() => test()}>add</button>
          <div>
              <h1 className='text-3xl'>
                  {t('date.day.' + day.getDay()) + ', '}
                  {i18n.resolvedLanguage == 'es' 
                  ? day.getDate() + ' de ' + t('date.month.' + day.getMonth())
                  : t('date.month.' + day.getMonth()) + ' ' + day.getDate() + getOrdinal(day.getDate())}
              </h1>
              <div className="tyme-container">
                  {tymes.map((tyme, index) => (
                  <div className='mini-tyme' key={index}>
                      <p>{tyme.title}</p>
                      <button className="ml-auto" onClick={() => deleteTest(tyme.id)}>delete</button>
                  </div>
                  ))}
              </div>
          </div>
      </div>
  )
}

export default Day