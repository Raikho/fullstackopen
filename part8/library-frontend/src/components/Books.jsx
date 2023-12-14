import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
  const [genres, setGenres] = useState(['a test'])
  const [filter, setFilter] = useState('all')
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (!result.data || !result.data.allBooks) return

    const array = []
    result.data.allBooks.forEach(b =>
      b.genres.forEach(g => (array.includes(g) ? null : array.push(g)))
    )
    array.push('all')
    setGenres(array)
  }, [result])

  const handleGenre = genre => {
    setFilter(genre)
  }

  if (result.loading) return <div>is loading...</div>

  const filteredBooks =
    filter === 'all'
      ? result.data.allBooks
      : result.data.allBooks.filter(b => b.genres.includes(filter))

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className='genre-button-list'>
        {genres.map(g => (
          <li
            key={g}
            className={`genre-button${filter === g ? ' active' : ''}`}
          >
            <button onClick={() => handleGenre(g)}>{g}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Books
