const Blog = require('../models/blog')

const initialUsers = [
  {
    name: 'user one',
    username: 'user1',
    password: 'user1',
  },
  {
    name: 'user two',
    username: 'user2',
    password: 'user2',
  },
]

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 4,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'toberemoved', url: 'to-be.removed' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = { initialUsers, initialBlogs, nonExistingId, blogsInDb }
