import { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import Header from './components/Header'
import UsersInfo from './components/UsersInfo'
import UserInfo from './components/UserInfo'

import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'

const App = () => {
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

  const blogForm = () => (
    <>
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
    <Router>
      <Header />
      <Notification />
      {user !== null ? blogForm() : null}
      <Routes>
        <Route path="/" />
        <Route path="/blogs" element={blogList()} />
        <Route path="/users" element={<UsersInfo />} />
        <Route path="/users/:id" element={<UserInfo />} />
      </Routes>
    </Router>
  )
}

export default App
