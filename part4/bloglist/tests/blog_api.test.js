const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(2)
})

test('blogs have an id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('blog can be created', async () => {
  const blogsBefore = await api.get('/api/blogs')
  expect(blogsBefore.body).toHaveLength(2)

  const newBlog = {
    author: 'Test Author',
    title: 'Test Title',
    url: 'test.url',
    likes: 5,
  }
  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.body.id).toBeDefined()

  const blogsAfter = await api.get('/api/blogs')
  expect(blogsAfter.body).toHaveLength(3)
})

test('blog without likes will have 0 likes', async () => {
  const newBlog = {
    author: 'Test Author',
    title: 'Test Title',
    url: 'test.url',
  }
  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.body.likes).toEqual(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})
