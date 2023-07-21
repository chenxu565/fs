import { appendAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { setNotification, clearNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ""
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))

    const notification = {
      message: `you created '${anecdote}'`,
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm