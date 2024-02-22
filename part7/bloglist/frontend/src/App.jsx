import { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Header from './components/Header'
import UsersInfo from './components/UsersInfo'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const user = useSelector((state) => {
    return state.user
  })

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const showNotification = ({ message, type }) => {
    dispatch(setNotification(message, type, 5))
  }

  const blogForm = () => (
    <>
      <Toggleable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} user={user} />
      </Toggleable>
    </>
  )

  useEffect(() => {
    dispatch(initializeBlogs())
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
      blogFormRef.current.toggleVisibility()
      showNotification({
        message: `New blog added: ${blogObject.title} by ${blogObject.author}`,
        type: 'success',
      })
    } catch (exception) {
      showNotification({ message: 'Adding new blog failed', type: 'error' })
    }
  }

  return (
    <Router>
      <div className="container">
        <Header />
        <Notification />
        {user !== null ? blogForm() : null}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogInfo />} />
          <Route path="/users" element={<UsersInfo />} />
          <Route path="/users/:id" element={<UserInfo />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
