import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = id => dispatch(voteAnecdote(id))

  const filteredAnecdotes = 
    (filter === '')
    ? anecdotes
    : anecdotes.filter(a => a.content.includes(filter))

  const sortedAnecdotes = filteredAnecdotes
    .toSorted((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map(a => 
        <div key={a.id}>
          <div>{a.content}</div>
          <div>
            <span>has {a.votes}</span>
            <button onClick={() => vote(a.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList