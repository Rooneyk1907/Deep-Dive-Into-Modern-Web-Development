import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { AnecdoteContextProvider } from './AnecdoteContext'
import AnecdoteDisplay from './components/AnecdoteDisplay'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service note available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <AnecdoteContextProvider anecdotes={anecdotes}>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote => (
        <AnecdoteDisplay
          key={anecdote.id}
          anecdote={anecdote}
        />
      ))}
    </AnecdoteContextProvider>
  )
}

export default App
