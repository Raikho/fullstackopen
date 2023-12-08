import { useState, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, CHANGE_BIRTH_DATE } from '../queries'
import { NoteContext } from '../App'

const Authors = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const { setNote } = useContext(NoteContext)
  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(CHANGE_BIRTH_DATE, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: error =>
      setNote(error.graphQLErrors.map(e => e.message).join('\n')),
  })

  const submit = async event => {
    event.preventDefault()
    editAuthor({
      variables: { name: name || null, setBornTo: Number(born) || null },
    })

    setName('')
    setBorn('')
  }

  if (result.loading) return <div>is loading...</div>

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <h3>Change author birthdate</h3>
      <form onSubmit={submit}>
        <div>name</div>
        <input
          type='text'
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <div>born</div>
        <input
          type='number'
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <button type='submit'>Submit Change</button>
      </form>
    </div>
  )
}

export default Authors
