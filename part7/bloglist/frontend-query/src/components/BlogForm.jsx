import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Toggleable from './Toggleable'

const BlogForm = ({ user }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState(user.name)
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
    }

    try {
      dispatch(createBlog(blogObject))
      dispatch(
        setNotification(
          `New blog added: ${blogObject.title} by ${blogObject.author}`,
          'success',
          5
        )
      )
      setTitle('')
      setAuthor(user.name)
      setUrl('')
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification('Adding new blog failed', 'danger', 5))
    }
  }

  return (
    <Toggleable buttonLabel="create blog" ref={blogFormRef}>
      <h2>Create new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={title}
            name="Title"
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>

          <Form.Control
            id="author"
            type="text"
            value={author}
            name="Author"
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={url}
            name="URL"
            placeholder="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button id="create-button" type="submit">
          create
        </Button>
      </Form>
    </Toggleable>
  )
}

BlogForm.propTypes = {
  user: PropTypes.object.isRequired,
}

export default BlogForm
