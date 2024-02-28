import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {
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
        <Route path="/authors" element={<Authors />} />

        <Route path="/books" element={<Books />} />

        <Route path="/add" element={<NewBook />} />
      </Routes>
    </Router>
  )
}

export default App
