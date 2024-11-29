/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'
import { createAnecdote, voteAnecdote } from './requests'

import { useQueryClient, useMutation } from '@tanstack/react-query'

const anecdoteReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ANECDOTES':
      return action.payload
    case 'VOTE':
      return action.payload
    case 'CREATE_ANECDOTE':
      return action.payload
    default:
      return state
  }
}

const AnecdoteContext = createContext()

export const useAnecdoteValue = () => {
  const anecdoteAndDispatch = useContext(AnecdoteContext)
  return anecdoteAndDispatch[0]
}

export const useAnecdoteDispatch = () => {
  const anecdoteAndDispatch = useContext(AnecdoteContext)
  return anecdoteAndDispatch[1]
}

export const useVoteMutation = () => {
  const context = useContext(AnecdoteContext)
  return context[2]
}

export const useCreateMutation = () => {
  const context = useContext(AnecdoteContext)
  return context[3]
}

export const AnecdoteContextProvider = props => {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: newAnecdote => {
      anecdoteDispatch({ type: 'CREATE_ANECDOTE', payload: newAnecdote })
      queryClient.invalidateQueries('anecdotes')
    },
  })
  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const [anecdote, anecdoteDispatch] = useReducer(
    anecdoteReducer,
    props.anecdotes
  )

  return (
    <AnecdoteContext.Provider
      value={[anecdote, anecdoteDispatch, voteMutation, createMutation]}>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export default AnecdoteContext
