import { useQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE, ME } from '../queries'

const Recommendations = () => {
  const resultMe = useQuery(ME)

  const genre = resultMe.data?.me.favoriteGenre

  const resultBooks = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre,
  })

  if (resultMe.loading || resultBooks.loading) {
    return <div>loading...</div>
  }

  const books = resultBooks.data.allBooks

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
