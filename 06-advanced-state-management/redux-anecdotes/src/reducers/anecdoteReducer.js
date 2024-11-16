import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { content: 'If it hurts, do it more often', id: 1, votes: 0 },
  {
    content: 'Adding manpower to a late software project makes it later!',
    votes: 0,
    id: 2,
  },
  {
    content:
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0,
    id: 3,
  },
  {
    content:
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0,
    id: 4,
  },
  {
    content: 'Premature optimization is the root of all evil.',
    votes: 0,
    id: 5,
  },
  {
    content:
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0,
    id: 6,
  },
]

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      console.log('ACTION ', action)
      const content = action.payload
      state.push({
        content,
        id: createId(),
        votes: 0,
      })
    },
    vote(state, action) {
      console.log('ACTION ', action)
      const id = action.payload
      const anecdoteToVote = state.find((n) => n.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      return state.map((note) => (note.id !== id ? note : votedAnecdote))
    },
  },
})

const createId = () => Number(100000 * Math.random().toFixed(0))

export const { createAnecdote, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
