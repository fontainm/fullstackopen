import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { gql, useQuery } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`

const App = () => {
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)

  if (resultAuthors.loading || resultBooks.loading) {
    return <div>loading...</div>
  }

  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/authors">Authors</Link>
        <Link to="/books">Books</Link>
        <Link to="/add">Add Book</Link>
      </div>

      <Routes>
        <Route path="/" element={<>Home</>} />
        <Route
          path="/authors"
          element={<Authors authors={resultAuthors.data.allAuthors} />}
        />

        <Route
          path="/books"
          element={<Books books={resultBooks.data.allBooks} />}
        />

        <Route path="/add" element={<NewBook />} />
      </Routes>
    </Router>
  )
}

export default App
