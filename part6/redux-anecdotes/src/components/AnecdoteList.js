import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'

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
  console.log('filter', filter)
  const dispatch = useDispatch()

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const filteredAnecdotes = 
    filter === '' ? sortedAnecdotes :
    sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteOf(anecdote.id))}
        />
      )}
    </div>
  )
}

export default AnecdoteList