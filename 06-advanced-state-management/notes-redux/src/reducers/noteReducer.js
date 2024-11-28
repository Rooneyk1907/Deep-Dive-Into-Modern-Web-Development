import { createSlice } from '@reduxjs/toolkit'

const generateId = () => Number((Math.random() * 100000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      console.log('ACTION ', action)
      const content = action.payload
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      console.log('ACTION ', action)
      const id = action.payload
      const noteToChange = state.find((n) => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      }

      return state.map((note) => (note.id !== id ? note : changedNote))
    },
    appendNote(state, action) {
      console.log('ACTION', action)
      state.push(action.payload)
    },
    setNotes(state, action) {
      console.log('ACTION', action)
      return action.payload
    },
  },
})

export const { createNote, toggleImportanceOf, appendNote } = noteSlice.actions
export default noteSlice.reducer
