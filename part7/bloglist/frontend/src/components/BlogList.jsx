import { useSelector } from 'react-redux'
import Blog from './Blog'
import { Table } from 'react-bootstrap'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogs = useSelector((state) => {
    return state.blogs
  })

  const user = useSelector((state) => {
    return state.user
  })

  return (
    <>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Likes</th>
          </tr>
          {blogs
            // .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </tbody>
      </Table>
      {user !== null ? <BlogForm user={user} /> : null}
    </>
  )
}

export default BlogList
