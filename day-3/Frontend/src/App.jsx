import { useEffect, useState } from "react"
import axios from "axios"

const App = () => {

  const [notes, setNotes] = useState([])

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  function fetchNotes() {
    axios.get('https://notes-o8tg.onrender.com/api/notes')
      .then((res) => {
        setNotes(res.data.note)
      })
  }

  function handleChange(e) {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handelSubmit(e) {
    e.preventDefault()

    axios.post("https://notes-o8tg.onrender.com/api/notes", formData)
      .then(() => {
        fetchNotes() // refresh notes after adding
        setFormData({
      title: "",
      description: ""
    })
      })

    
  }

  function handelDeleteNote(id){
      axios.delete("https://notes-o8tg.onrender.com/api/notes/"+id)
      .then(res => {
        console.log(res.data);
        fetchNotes()
      })
  }

  function handelUpdateNote(id){
    const newdes=prompt("Enter New Description:")
    axios.patch("https://notes-o8tg.onrender.com/api/notes/"+id,{
      description:newdes
    })
    .then(res => {
      console.log(res.data)
      fetchNotes()
    })
  }

  useEffect(function () {
    fetchNotes()
  }, [])

  return (
    <div className="container ">
      <div className="notecontainer">
        <form onSubmit={handelSubmit} className="noteForm">

          <label>Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Note Title"
          />

          <label>Description</label>
          <input
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Note Description"
          />

          <button>Create Note</button>
        </form>
      </div>

      <div className="notes">
        {notes.map(function (elem, idx) {
          return (
            <div key={idx} className="note">
              <h1>{elem.title}</h1>
              <p>{elem.description}</p>
              <div className="bottom">
                <button onClick={() => {handelUpdateNote(elem._id, elem.description)}}>Edit Note </button>
                <button onClick={() => {handelDeleteNote(elem._id)}}>Delete Note</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
