import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = event => {
    event.preventDefault()
    const filter = event.target.value
    dispatch(filterChange(filter))
  }

  const style = { marginBottom: 10 }

  return (
    <form style={style}>
      <span>filter</span>
      <input onChange={handleChange} />
    </form>
  )
}

export default Filter
