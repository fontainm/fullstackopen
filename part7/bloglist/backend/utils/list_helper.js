const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current
  }, {})
  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  if (!blogs.length) return {}
  const result = _(blogs).countBy('author').entries().maxBy(_.last)
  return {
    author: result[0],
    blogs: result[1],
  }
}

const mostLikes = (blogs) => {
  if (!blogs.length) return {}
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const likes = []
  _.forOwn(groupedByAuthor, (blogs, author) => {
    likes.push({ author, likes: totalLikes(blogs) })
  })
  const result = _.maxBy(likes, 'likes')
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
