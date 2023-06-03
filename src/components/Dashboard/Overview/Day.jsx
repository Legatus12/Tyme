import { useState, useEffect, useContext, useRef } from "react"
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { getTymesInDay, addTymeFb, deleteTyme, addTyme } from "../../../../firebase"
import { AuthContext } from '../../../AuthProvider'
import ModalAddTyme from '../../ModalAddTyme'

const Day = ({ day, closeDayModal, loadTymesOv }) => {

  const user = useContext(AuthContext)

  const { t, i18n } = useTranslation()

  const [tymes, setTymes] = useState([])

  //

  const loadTymes = async (uid) => {
    setTymes([])
    const arr = []
    getTymesInDay(uid, format(day, 'dd-MM-yyyy'), docs => docs.forEach(doc => {
      const aux = {
        ...doc.data(),
        id: doc.id
      }
      arr.push(aux)
    }))
    setTymes(arr)
    loadTymesOv(uid)
  }

  useEffect(() => {
    loadTymes(user.uid)
  }, [user])

  //

  const getOrdinal = (number) => {
    if (number == 1)
      return 'st'
    else if (number == 2)
      return 'nd'
    else if (number == 3)
      return 'rd'
    else
      return 'th'
  }

  const deleteTest = (id) => {
    deleteTyme(id);
    loadTymes(user.uid);
  }

  //

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalAddTyme = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    loadTymes(user.uid);
  };

  //

  return (
    <div className="day-view full">
      <button className="close" onClick={() => closeDayModal()}><img src="/src/img/close.png" /></button>
      <button className="bg-[#f1121f] w-fit ml-auto p-2 text-white" onClick={openModalAddTyme}>add</button>
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
              <p>{tyme.body}</p>
              <button className="ml-auto" onClick={() => deleteTest(tyme.id)}>delete</button>
            </div>
          ))}
        </div>
      </div>

      <ModalAddTyme day={day} isOpen={isModalOpen} onClose={closeModal} >
        <h2>Añadir Tyme</h2>
      </ModalAddTyme>
    </div>
  )
}

export default Day

/**
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleMouseDown = (event) => handleClickOutside(event);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isOpen ? (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        {children}
        <button className="modal-close" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  ) : null;
};
 */

    /*
  const handleDeleteTyme = async (tymeId) => {

  try {
    await deleteTymeFb(user.uid, tymeId)
    const updatedTymes = tymes.filter((tyme) => tyme.id !== tymeId)
    setTymes(updatedTymes)
  } catch (error) {
    console.error('Error deleting tyme:', error)
  }
  }



  
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

*/