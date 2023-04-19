import { useState } from "react"

const MyForm = (props) => {

    const [values, setValues] = useState({
      title: '',
      note: '',
    })
  
    const [validations, setValidations] = useState({
      title: '',
      note: '',
    })
  
    const validateAll = () => {
      const { title, note } = values
      const validations = { title: '', note: '' }
      let isValid = true
  
      if (!title) {
        validations.title = 'title is required'
        isValid = false
      }
  
      if ((title && title.length < 3) || title.length > 50) {
        validations.title = 'title must contain between 3 and 50 characters'
        isValid = false
      }
  
      if (!note) {
        validations.note = 'note is required'
        isValid = false
      }
  
      if (note && note.length < 3  || title.length > 200) {
        validations.note = 'note format must be as example@mail.com'
        isValid = false
      }
  
      if (!isValid) {
        setValidations(validations)
      }
  
      return isValid
    }
  
    const validateOne = (e) => {
      const { title } = e.target
      const value = values[title]
      let message = ''
  
      if (!value) {
        message = `${title} is required`
      }
  
      if (value && title === 'title' && (value.length < 3 || value.length > 50)) {
        message = 'title must contain between 3 and 50 characters'
      }
  
      if (value && title === 'note' && !/\S+@\S+\.\S+/.test(value)) {
        message = 'note format must be as example@mail.com'
      }
  
      setValidations({ ...validations, [title]: message })
    }
  
    const handleChange = (e) => {
      const { title, value } = e.target
      setValues({ ...values, [title]: value })
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
  
      const isValid = validateAll()
  
      if (!isValid) {
        return false
      }
  
      alert(JSON.stringify(values))
    }
  
    const { title, note } = values
  
    const { title: titleVal, note: noteVal } = validations
  
    return (
      <div>
        <h1>Create note</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              title:
              <input
                type="text"
                title="title"
                value={title}
                onChange={handleChange}
                onBlur={validateOne}
              />
            </label>
            <div>{titleVal}</div>
          </div>
  
          <div>
            <label>
              note:
              <input
                type="note"
                title="note"
                value={note}
                onChange={handleChange}
                onBlur={validateOne}
              />
            </label>
            <div>{noteVal}</div>
          </div>
  
  
          <button type="submit">Send</button>
        </form>
  
        <div>
          <h2>Values of the form</h2>
          <p>{JSON.stringify(values)}</p>
        </div>
      </div>
    )
  }