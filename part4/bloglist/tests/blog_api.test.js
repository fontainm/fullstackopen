const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(helper.initialUsers[0])
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('viewing blogs', () => {
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
})

describe('creating a blog', () => {
  test('fails if token is not provided', async () => {
    await api.post('/api/blogs').send({}).expect(401)
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

    const loginResponse = await api.post('/api/login').send({
      username: 'user1',
      password: 'user1',
    })

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(newBlog)
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

    const loginResponse = await api.post('/api/login').send({
      username: 'user1',
      password: 'user1',
    })

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(newBlog)
    expect(response.body.likes).toEqual(0)
  })

  test('blog without title cannot be created', async () => {
    const newBlog = {
      author: 'Test Author',
      url: 'test.url',
    }

    const loginResponse = await api.post('/api/login').send({
      username: 'user1',
      password: 'user1',
    })

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(newBlog)
      .expect(400)
  })

  test('blog without url cannot be created', async () => {
    const newBlog = {
      title: 'Test Title',
      author: 'Test Author',
    }

    const loginResponse = await api.post('/api/login').send({
      username: 'user1',
      password: 'user1',
    })

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200 if input is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 100
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
    expect(response.body.likes).toEqual(100)
    expect(response.status).toBe(200)
  })
})

describe('deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const loginResponse = await api.post('/api/login').send({
      username: 'user1',
      password: 'user1',
    })

    const newBlog = {
      author: 'Test Author',
      title: 'Test Title',
      url: 'test.url',
      likes: 5,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(newBlog)

    const blogToDelete = response.body

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(204)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
