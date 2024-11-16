/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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
  // console.log(anecdotes)

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
                dispatch(vote(anecdote.id))
              }}
            />
          )
      )}
    </div>
  )
}

export default AnecdoteList
