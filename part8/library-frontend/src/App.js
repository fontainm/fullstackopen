import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const userToken = window.localStorage.getItem('library-user-token')
    if (userToken) {
      setToken(userToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      updateCache(
        client.cache,
        { query: ALL_BOOKS_BY_GENRE, variables: { genre: '' } },
        addedBook
      )
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/authors">Authors</Link>
        <Link to="/books">Books</Link>
        {token ? (
          <>
            <Link to="/add">Add Book</Link>
            <Link to="/recommendations">Recommendations</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>

      <Routes>
        <Route path="/" element={<>Home</>} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </Router>
  )
}

export default App
