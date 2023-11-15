import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import anecdoteService from './requests'

const App = () => {

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: () => anecdoteService.getAll(),
		retry: 1,
		refetchOnWindowFocus: false,
	})

	const anecdotes = result.data

	const handleVote = (anecdote) => {
		console.log('vote')
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
			<Notification />
			<AnecdoteForm />
			{toDisplay()}
		</div>
	)
}

export default App
