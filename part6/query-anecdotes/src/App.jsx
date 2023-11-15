import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from './requests'
import { useReducer } from 'react'

const noteReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'REMOVE':
      return ''
    default:
      return state
  }
}


const App = () => {
	const [note, noteDispatch] = useReducer(noteReducer, '')

	const queryClient = useQueryClient()

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: () => anecdoteService.getAll(),
		retry: 1,
		refetchOnWindowFocus: false,
	})

	const replaceAnecdoteMutation = useMutation({
		mutationFn: anecdoteService.replace,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
		}
	})

	const anecdotes = result.data

	const handleVote = (anecdote) => {
		console.log('vote')
		const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
		replaceAnecdoteMutation.mutate(newAnecdote)

		noteDispatch({ type: 'SET', payload: `voted for '${anecdote.content}'`})
		setTimeout(() => noteDispatch({ type: 'REMOVE' }), 3000)
	}

	const toDisplay = () => {
		if (result.isPending)
			return <div>loading...</div>
		if (result.isError)
			return <div>anecdote service not available due to problems in server</div>
		return <div>
			{anecdotes.map(a => 
				<div key={a.id}>
					<div>{a.content}</div>			
					<div>
						has {a.votes}
						<button onClick={() => handleVote(a)}>vote</button>
					</div>			
				</div> 
			)}
		</div>
	}

	return (
		<div>
			<h3>Anecdote app</h3>
			<Notification note={note} />
			<AnecdoteForm dispatch={noteDispatch}/>
			{toDisplay()}
		</div>
	)
}

export default App
