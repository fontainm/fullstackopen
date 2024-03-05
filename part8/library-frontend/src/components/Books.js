import { useQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE, ALL_GENRES } from '../queries'
import { useState } from 'react'

const Books = () => {
  const [genre, setGenre] = useState('')

  const resultBooks = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre },
  })
  const resultGenres = useQuery(ALL_GENRES)

  if (resultBooks.loading || resultGenres.loading) {
    return <div>loading...</div>
  }

  let books = resultBooks.data.allBooks
  let genres = resultGenres.data.allGenres

  return (
    <div>
      <h2>books</h2>
      {genre ? (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      ) : (
        ''
      )}
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre('')}>All</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
