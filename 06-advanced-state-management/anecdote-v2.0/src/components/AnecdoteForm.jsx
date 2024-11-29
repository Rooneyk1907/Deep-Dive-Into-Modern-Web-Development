import { useNotificationDispatch } from '../NotificationContext'
import { useCreateMutation, useAnecdoteDispatch } from '../AnecdoteContext'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const anecdoteDispatch = useAnecdoteDispatch()
  const createMutation = useCreateMutation()

  const onCreate = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    createMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: newAnecdote => {
          anecdoteDispatch({ type: 'ADD_ANECDOTE', payload: newAnecdote })
          notificationDispatch({
            type: 'NEW_ANECDOTE',
            payload: `added ${newAnecdote.content}`,
          })
          setTimeout(
            () => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }),
            5000
          )
        },
        onError: () => {
          notificationDispatch({
            type: 'ERROR',
            payload: 'too short anecdote, must have length 5 or more',
          })
          setTimeout(
            () =>
              notificationDispatch({
                type: 'CLEAR_NOTIFICATION',
              }),
            5000
          )
        },
      }
    )
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
