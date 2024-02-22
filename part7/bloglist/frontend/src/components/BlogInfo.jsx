import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const BlogInfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blogs = useSelector((state) => {
    return state.blogs
  })

  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)

  const user = useSelector((state) => {
    return state.user
  })

  if (!blog) return null

  const updateBlog = (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        ...blog,
        likes: blog.likes + 1,
      }
      blogObject.user = blogObject.user.id

      dispatch(likeBlog(blogObject))
      showNotification({
        message: 'Blog liked',
        type: 'success',
      })
    } catch (exception) {
      console.log(exception)
      showNotification({ message: 'Liking blog failed', type: 'error' })
    }
  }

  const removeBlog = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) return

    const blogId = blog.id

    try {
      dispatch(deleteBlog(blogId))
      showNotification({ message: 'Deleting blog successful', type: 'success' })
      navigate('/blogs')
    } catch (exception) {
      showNotification({ message: 'Deleting blog failed', type: 'error' })
    }
  }

  const showNotification = ({ message, type }) => {
    dispatch(setNotification(message, type, 5))
  }

  const addComment = (event) => {
    event.preventDefault()
    console.log('OK')
    try {
      const commentObject = {
        content: 'OK',
      }
      dispatch(createComment(commentObject))
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div className="blog">
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} Likes
          <Button onClick={updateBlog}>Like</Button>
        </div>
        <div>added by {blog.user.name}</div>
        {blog.user?.name === user?.name ? (
          <Button variant="danger" onClick={removeBlog}>
            Remove
          </Button>
        ) : null}
      </div>
      <div>
        <h3>Comments</h3>
        <ul>
          {blog.comments?.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
        <Form onSubmit={addComment}>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control type="text" name="Content" />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  )
}

export default BlogInfo
