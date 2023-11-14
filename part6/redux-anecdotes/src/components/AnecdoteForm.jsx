import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    
    const newAnecdote = await anecdoteService.createNew(content)

    dispatch(appendAnecdote(newAnecdote))
    
    dispatch(setNotification(`created new anecdote '${content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
    event.target.content.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='content'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm