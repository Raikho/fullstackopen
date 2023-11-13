import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = id => dispatch(voteAnecdote(id))

  const sortedAnecdotes = anecdotes
    .sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map(a => 
        <div key={a.id}>
          <div>{a.content}</div>
          <div>
            <span>has {a.votes},  id:{a.id}</span>
            <button onClick={() => vote(a.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList