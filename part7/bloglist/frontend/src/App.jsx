import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { loginUser, setUser, logoutUser } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector((state) => {
    return state.blogs
  })

  const user = useSelector((state) => {
    return state.user
  })

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const showNotification = ({ message, type }) => {
    dispatch(setNotification(message, type, 5))
  }

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </>
  )

  const blogForm = () => (
    <>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Toggleable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} user={user} />
      </Toggleable>
    </>
  )

  const blogList = () => (
    <>
      <h2>blogs</h2>
      {blogs
        // .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(
        loginUser({
          username,
          password,
        })
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      const message = exception.response?.data?.error
      showNotification({
        message: message ?? 'Wrong credentials',
        type: 'error',
      })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

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

  const updateBlog = async (blogObject) => {
    try {
      blogObject.user = blogObject.user.id
      dispatch(likeBlog(blogObject))
      showNotification({
        message: 'Blog liked',
        type: 'success',
      })
    } catch (exception) {
      showNotification({ message: 'Liking blog failed', type: 'error' })
    }
  }

  const removeBlog = async (blogId) => {
    try {
      dispatch(deleteBlog(blogId))
      showNotification({ message: 'Deleting blog successful', type: 'success' })
    } catch (exception) {
      showNotification({ message: 'Deleting blog failed', type: 'error' })
    }
  }

  return (
    <div>
      <Notification />
      {user === null ? loginForm() : blogForm()}
      {blogList()}
    </div>
  )
}

export default App
