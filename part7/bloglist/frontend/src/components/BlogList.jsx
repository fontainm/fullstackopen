import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import { Table } from 'react-bootstrap'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogs = useSelector((state) => {
    return state.blogs
  })

  const user = useSelector((state) => {
    return state.user
  })

  const blogFormRef = useRef()

  return (
    <>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {blogs
            // .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </tbody>
      </Table>
      {user !== null ? (
        <Toggleable buttonLabel="create blog" ref={blogFormRef}>
          <BlogForm user={user} />
        </Toggleable>
      ) : null}
    </>
  )
}

export default BlogList
