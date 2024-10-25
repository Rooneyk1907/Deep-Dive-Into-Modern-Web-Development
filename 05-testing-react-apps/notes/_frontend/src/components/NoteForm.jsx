import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }
  return (
    <div>
      <h2>Create a New Note</h2>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder='write note content here'
          id='note-input'
        />
        {/* <input value={'hello'} onChange={() => console.log('console log')} /> */}
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default NoteForm
