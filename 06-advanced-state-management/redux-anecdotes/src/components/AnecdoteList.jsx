/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
        <br /> {anecdote.votes} votes
      </div>
      <button onClick={handleVote}>vote</button>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    if (state.filter !== '') {
      const all = state.anecdotes
      console.log('FILTER ', state.filter)
      console.log('ALL ', all)
      return all.map((item) => item.content.includes(state.filter) && item)
    } else {
      return state.anecdotes
    }
  })

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map(
        (anecdote) =>
          anecdote && (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleVote={() => {
                handleVote(anecdote)
              }}
            />
          )
      )}
    </div>
  )
}

export default AnecdoteList
