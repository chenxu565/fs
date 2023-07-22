import { useNoticeDispatch } from "../NoticeContext"

const AnecdoteForm = ({createAnecdoteMutation}) => {
  const noticeDispatch = useNoticeDispatch()

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    createAnecdoteMutation.mutate({ content, votes: 0 })
    noticeDispatch({type: 'SET_NOTICE', payload: `anecdote '${content}' created`})
    setTimeout(() => {
      noticeDispatch({type: 'CLEAR_NOTICE'})
    }
    , 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
