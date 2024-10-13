const blogsRouter = require('express').Router()
const { authMiddleware } = require('../utils/middleware')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', authMiddleware, async (request, response) => {
  const body = await request.body
  const user = await request.user

  if (body.title && body.author && body.url) {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } else {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', authMiddleware, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'unauthorized' })
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.put('/:id', authMiddleware, async (request, response) => {
  const body = request.body

  const updatedBlog = { ...body }

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
