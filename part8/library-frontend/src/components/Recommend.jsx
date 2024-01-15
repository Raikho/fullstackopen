import { NoteContext } from '../App'
import { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookList from './BookList'

const Recommend = () => {
  const { user } = useContext(NoteContext)
  const result = useQuery(ALL_BOOKS)

  if (result.loading) return <div>is loading...</div>

  const filteredBooks = result.data.allBooks.filter(b =>
    b.genres.includes(user.favoriteGenre)
  )

  return (
    <div>
      <h2>Recommended books for {user.name}</h2>
      <div>
        books in your favorite genre <strong>{user.favoriteGenre}</strong>
      </div>
      <BookList books={filteredBooks} />
    </div>
  )
}

export default Recommend
