import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  console.log('anecdotes', anecdotes)
  console.log('filter', filter)
  const dispatch = useDispatch()

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const filteredAnecdotes = 
    filter === '' ? sortedAnecdotes :
    sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteOf(id))
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    const notification = {
      message: `you voted '${anecdote.content}'`,
      type: 'success'
    }
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }
    , 5000)
  }

  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id)}
        />
      )}
    </div>
  )
}

export default AnecdoteList