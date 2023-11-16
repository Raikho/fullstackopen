import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../requests'
import { useNoteDispatch } from "../NoteContext"

const AnecdoteForm = () => {
  const noteDispatch = useNoteDispatch()

  const queryClient = useQueryClient()

	const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    
    newAnecdoteMutation.mutate({ content, votes: 0 })
    noteDispatch({ type: 'SET', payload: `created note '${content}'` })
    setTimeout(() => noteDispatch({ type: 'REMOVE' }), 3000)
    event.target.anecdote.value = ''
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
