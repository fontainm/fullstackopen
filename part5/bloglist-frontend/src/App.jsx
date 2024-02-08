import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState('')

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const showNotification = ({ message, type }) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
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
        <BlogForm createBlog={addBlog} />
      </Toggleable>
    </>
  )

  const blogList = () => (
    <>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      window.localStorage.setItem('blogUser', JSON.stringify(user))
      blogService.setToken(user.token)
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
    setUser(null)
    window.localStorage.removeItem('blogUser')
  }

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      blogFormRef.current.toggleVisibility()
      showNotification({
        message: `New blog added: ${response.title} by ${response.author}`,
        type: 'success',
      })
    } catch (exception) {
      showNotification({ message: 'Adding new blog failed', type: 'error' })
    }
  }

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? loginForm() : blogForm()}
      {blogList()}
    </div>
  )
}

export default App
