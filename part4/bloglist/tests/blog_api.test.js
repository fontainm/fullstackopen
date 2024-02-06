const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
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

test('blog without title cannot be created', async () => {
  const newBlog = {
    author: 'Test Author',
    url: 'test.url',
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('blog without url cannot be created', async () => {
  const newBlog = {
    title: 'Test Title',
    author: 'Test Author',
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
