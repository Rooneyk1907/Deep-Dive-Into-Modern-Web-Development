import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './App'

import noteReducer from './reducers/noteReducer.js'
import filterReducer from './reducers/filterReducer.js'

import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'

import noteService from './services/notes'
import noteReducer, { setNotes } from './reducers/noteReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
})

noteService.getAll().then((notes) =>
  notes.forEach((note) => {
    store.dispatch(setNotes(note))
  })
)

console.log(store.getState())

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(
  createNote('combineReducers forms one reducer from many simple reducers')
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
