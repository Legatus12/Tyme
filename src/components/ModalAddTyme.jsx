import React, { useState, useRef, useEffect,useContext } from 'react';
import { addTyme } from "../../firebase"
import { AuthContext } from '../AuthProvider'
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday } from 'date-fns'

const ModalAddTyme = ({ day, isOpen, onClose, children }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const user = useContext(AuthContext)

  const handleSubmit = (event) => {
    event.preventDefault();

    addTyme(user.uid, title, body, format(day, 'dd-MM-yyyy'), day.getTime());

    onClose();
    setTitle('');
    setBody('');
    setDate('');
    setTimestamp('');
  };

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
      <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="body">Contenido:</label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="date">Fecha:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="timestamp">Marca de tiempo:</label>
              <input
                type="time"
                id="timestamp"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
              />
            </div>
            <div className="modal-buttons">
              <button type="submit">Guardar</button>
            </div>
          </form>
      </div>
    </div>
  ) : null;
};

  export default ModalAddTyme;

  /**
   const ModalAddTyme = ({ day,  isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState('');
    const [timestamp, setTimestamp] = useState('');

    const user = useContext(AuthContext)
  
    const handleSubmit = (event) => {
      event.preventDefault();

      console.log(day)
      addTyme(user.uid, title, body, format(day, 'dd-MM-yyyy'), day.getTime());

      onClose();
      setTitle('');
      setBody('');
      setDate('');
      setTimestamp('');
    };

    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return isOpen ? (
      <div className="modal">
        <div className="modal-content">
          <h2>Formulario</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="body">Contenido:</label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="date">Fecha:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="timestamp">Marca de tiempo:</label>
              <input
                type="time"
                id="timestamp"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
              />
            </div>
            <div className="modal-buttons">
              <button type="submit">Guardar</button>
              <button className="modal-close" onClick={() => onClose(null)}>
                Cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : null;
  };
   */