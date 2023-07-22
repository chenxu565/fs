import { useQuery } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './requests'

const App = () => {
  const result = useQuery('anecdotes', getAnecdotes,
    {
      retry: 1,
    }
  )

  console.log(result)

  if (result.isLoading) {
    return <div>Loading...</div>
  }
  else if (result.status === 'error') {
    if (result.error.name === 'AxiosError') {
      return <div>anecdote service not available due to problems in network</div>
    }
    return <div>error: {result.error.message}</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
