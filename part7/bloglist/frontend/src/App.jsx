import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogs = useSelector((state) => {
    return state.blogs
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
      const response = await blogService.update(blogObject.id, blogObject)
      const blogToUpdate = blogs.findIndex((blog) => blog.id === response.id)
      const newBlogs = blogs
      newBlogs[blogToUpdate] = response
      // setBlogs(newBlogs)
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
      await blogService.remove(blogId)
      // setBlogs(blogs.filter((blog) => blog.id !== blogId))
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
