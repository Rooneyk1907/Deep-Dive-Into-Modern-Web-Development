/* eslint-disable react/prop-types */
import { useAnecdoteDispatch, useVoteMutation } from '../AnecdoteContext'

import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteDisplay = ({ anecdote }) => {
  const dispatch = useAnecdoteDispatch()
  const voteMutation = useVoteMutation()
  const notificationDispatch = useNotificationDispatch()

  const handleVote = anecdote => {
    voteMutation.mutate(anecdote, {
      onSuccess: () => {
        dispatch({ type: 'VOTE', payload: anecdote })
        notificationDispatch({
          type: 'VOTE_CONFIRMATION',
          payload: `anecdote '${anecdote.content}' voted`,
        })
        setTimeout(
          () => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }),
          5000
        )
      },
    })
  }

  return (
    <>
      <div>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{' '}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AnecdoteDisplay
