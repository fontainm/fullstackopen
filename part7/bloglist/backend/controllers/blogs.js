const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {
      username: 1,
      name: 1,
    })
    .populate('comments', {
      content: 1,
    })

  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).end()
  }

  const user = request.user

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  await savedBlog.populate('user', {
    username: 1,
    name: 1,
  })
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  let result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  })
  result.user = request.user
  response.json(result)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!user) {
      return response.status(400).json({ error: 'user not found' })
    }

    if (!blog) {
      return response.status(400).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(400).json({ error: 'token invalid' })
    }

    await blog.deleteOne()
    return response.status(204).end()
  }
)

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(400).json({ error: 'blog not found' })
  }

  const comment = new Comment({
    content: request.body.content,
  })

  const savedComment = await comment.save()

  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  return response.status(201).json(savedComment)
})

module.exports = blogsRouter
