import { useState, useEffect,useContext } from "react"
import { Link, Route, Routes } from 'react-router-dom';
import { addNote, getNotes, deleteNoteFB } from "../../../../firebase"
import { AuthContext } from '../../../AuthProvider'
import useMountEffect from '@restart/hooks/useMountEffect'

function Notes() {
  const [notes, setNotes] = useState([]);

  const [values, setValues] = useState({
    title: "",
    text: "",
  });

  const user = useContext(AuthContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    addNote(user.uid, values.title, values.text);
    setValues({
      title: "",
      text: "",
    });
    loadNotes(user.uid)
  };

  const loadNotes = async (uid) => {
    if (uid) {
      const arr = [];
      getNotes(uid, (notes) => {
        notes.forEach((note) => {
          const aux = {
            ...note.data(),
            id: note.id,
          };
          arr.push(aux);
        });
  
        setNotes(arr); // Actualizar el estado de las notas aquí
      });
    }
  };

  const deleteNote = (id) => {
    deleteNoteFB(id)
    loadNotes(user.uid)
  }
  
  useEffect(() => {
    loadNotes(user.uid)
  }, [user])


  const handleChange = (evt) => {

    const { target } = evt;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
  }

  useMountEffect(() => {
    loadNotes()
  })

  return (
      <div className="day-view full">
        <Link  to={'/dashboard/overview'} replace>
          <button className="close" ><img src="/src/img/close.png" /></button>
        </Link>
        <div>
          <h1>NOTES</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="title"
              value={values.title}
              onChange={handleChange}
            />
            <label htmlFor="text">Note</label>
            <textarea
              id="text"
              name="text"
              type="textarea"
              value={values.text}
              onChange={handleChange}
              ></textarea>
            <button type="submit">Send</button>
          </form>
          <div className="tyme-container">
          {
            notes.length > 0 ?
              notes.map(note =>
                <div key={note.id}>
                  <p>{note.title}</p>
                  <p>{note.text}</p>
                  <button onClick={()=> deleteNote(note.id)}>delete</button>
                </div>
              )
              : null
          }
          </div>
        </div>

      </div>

  )
}
/*
function Form() {
  //const [notes, setNotes] = ([])
  const [values, setValues] = useState({
    title: "",
    text: "",
  });

  const  handleSubmit = async (evt) => {
    evt.preventDefault();

    await onSubmit(values);
    
  }

  function handleChange(evt) {

    const { target } = evt;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    // Sincroniza el estado de nuevo
    setValues(newValues);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="title"
        value={values.title}
        onChange={handleChange}
      />
      <label htmlFor="text">Note</label>
      <input
        id="text"
        name="text"
        type="textarea"
        value={values.text}
        onChange={handleChange}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}
*/
export default Notes
