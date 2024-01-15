import { NoteContext } from '../App'
import { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { GENRE_BOOKS } from '../queries'
import BookList from './BookList'

const Recommend = () => {
  const { user } = useContext(NoteContext)
  const genre = user.favoriteGenre
  const result = useQuery(GENRE_BOOKS, { variables: { genre } })

  if (result.loading) return <div>is loading...</div>

  console.log('# of results:', result.data.allBooks.length)

  const books = result.data.allBooks
  if (books.length === 0) {
    return (
      <div>
        No books of genre <strong>{genre}</strong> found to reccomend for{' '}
        {user.name}
      </div>
    )
  }

  return (
    <div>
      <h2>Recommended books for {user.name}</h2>
      <div>
        books in your favorite genre <strong>{genre}</strong>
      </div>
      <BookList books={books} />
    </div>
  )
}

export default Recommend
