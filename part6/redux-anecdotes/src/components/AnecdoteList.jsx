import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = id => {
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
  }

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