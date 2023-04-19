import { useState, useEffect } from "react"

function Notes () {
  const [notes, setNotes] = useState([]);

  const [values, setValues] = useState({
    title: "",
    text: "",
  });

  const  handleSubmit = (evt) => {
    evt.preventDefault();
    setNotes(values)
    console.log(notes)
    setValues({title: "", text: ""})
    
  }

  const handleChange = (evt) => {

    const { target } = evt;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
  }

  const onSubmit = async (newNote)=> {
    setNotes(... newNote)
  }
  
  return(
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
      <input
        id="text"
        name="text"
        type="textarea"
        value={values.text}
        onChange={handleChange}
      />
      <button type="submit">Send</button>
    </form>
      {
        notes.length > 0 ?
          notes.map(note=>
              <div>
                <p>{note.title}</p>
                <p>{note.text}</p>
              </div>
            )
        : null
      }
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
  