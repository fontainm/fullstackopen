import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const userToken = window.localStorage.getItem('library-user-token')
    if (userToken) {
      setToken(userToken)
    }
  }, [])

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
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </Router>
  )
}

export default App
