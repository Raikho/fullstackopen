import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = event => {
    event.preventDefault()
    const content = event.target.content.value
    dispatch(createAnecdote(content))
    event.target.content.value = ''
  }

  
  return (
      <form onSubmit={create}>
        <div><input name='content'/></div>
        <button type='submit'>create</button>
      </form>
  )
}

export default AnecdoteForm