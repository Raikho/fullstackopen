import { useState, useContext } from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, CHANGE_BIRTH_DATE } from '../queries'
import { NoteContext } from '../App'
import { useField } from '../hooks'

const Authors = () => {
  const born = useField('number')
  const [name, setName] = useState(null)

  const result = useQuery(ALL_AUTHORS)
  const { setNote } = useContext(NoteContext)
  const [editAuthor] = useMutation(CHANGE_BIRTH_DATE, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: error =>
      setNote(error.graphQLErrors.map(e => e.message).join('\n')),
  })

  const submit = async event => {
    event.preventDefault()
    editAuthor({
      variables: { name: name.value || null, setBornTo: born.value || null },
    })

    born.reset()
  }

  if (result.loading) return <div>is loading...</div>

  const authors = result.data.allAuthors
  const options = authors.map(a => {
    return { value: a.name, label: a.name }
  })

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
          {authors.map(a => (
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
        <Select
          defaultvalue={name}
          onChange={setName}
          options={options}
          placeholder={'Select an Author'}
        />
        <label>
          born <input {...born.atts} />
        </label>
        <div>
          <button type='submit'>update author</button>
        </div>
      </form>
    </div>
  )
}

export default Authors
