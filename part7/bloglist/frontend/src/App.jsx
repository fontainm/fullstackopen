import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Notification from './components/Notification'
import Home from './components/Home'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'

import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  return (
    <Router>
      <div className="container">
        <Header />
        <Notification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogInfo />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserInfo />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
