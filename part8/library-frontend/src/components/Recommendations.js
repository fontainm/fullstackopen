import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = () => {
  const resultBooks = useQuery(ALL_BOOKS)
  const resultMe = useQuery(ME)

  if (resultBooks.loading || resultMe.loading) {
    return <div>loading...</div>
  }

  const genre = resultMe.data.me.favoriteGenre
  const books = resultBooks.data.allBooks.filter((book) =>
    book.genres?.includes(genre)
  )

  return (
    <>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <strong>{genre}</strong>
      </p>
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
    </>
  )
}

export default Recommendations
