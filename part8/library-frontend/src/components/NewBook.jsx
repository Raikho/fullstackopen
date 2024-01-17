import { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'
import { NoteContext } from '../App'
import { useField, resetFields } from '../hooks'

const NewBook = () => {
  const title = useField('text')
  const author = useField('text')
  const published = useField('number')
  const genre = useField('text')
  const [genres, setGenres] = useState([])

  const { setNote } = useContext(NoteContext)
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: error =>
      setNote(error.graphQLErrors.map(e => e.message).join('\n')),
  })

  const submit = async event => {
    event.preventDefault()

    createBook({
      variables: {
        title: title.value || null,
        author: author.value || null,
        published: Number(published.value) || null,
        genres: genres || null,
      },
    })

    resetFields([title, published, author, genre])
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.value))
    genre.reset()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title <input {...title.atts} />
        </div>
        <div>
          author <input {...author.atts} />
        </div>
        <div>
          published <input {...published.atts} />
        </div>
        <div>
          <input {...genre.atts} />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
