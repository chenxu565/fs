import { useQuery, useMutation, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useNoticeDispatch } from './NoticeContext'

const App = () => {
  const queryClient = useQueryClient()
  const noticeDispatch = useNoticeDispatch()

  const createAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData('anecdotes', 
        anecdotes => [...anecdotes, newAnecdote])
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData('anecdotes', 
        anecdotes => anecdotes.map(anecdote => 
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
      )
    }
  })

  const result = useQuery('anecdotes', getAnecdotes,
    {
      retry: 1,
      refetchOnWindowFocus: false,
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
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    noticeDispatch({type: 'SET_NOTICE', payload: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      noticeDispatch({type: 'CLEAR_NOTICE'})
    }
    , 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm createAnecdoteMutation={createAnecdoteMutation}/>
    
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
