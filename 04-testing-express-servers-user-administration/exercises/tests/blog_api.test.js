const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const helper = require('./list_helper')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  console.log('saved')
  await Promise.all(promiseArray)
  console.log('done')
})

test('blog posts are returned as json', async () => {
  console.log('entered blog posts format test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// test('there are two blog posts', async () => {
//   console.log('entered blog number test')

//   const response = await api.get('/api/blogs')
//   assert.strictEqual(response.body.length, 2)
// })

test('unique identifier is titled "id"', async () => {
  const response = await api.get('/api/blogs')

  const postIDs = response.body.map((r) => r.id)
  assert(!postIDs.includes(undefined))
})

test('a blog post can be added', async () => {
  const initialBlogs = await helper.blogsInDb()
  // console.log('initial blogs', initialBlogs)
  // console.log('initial blogs length', initialBlogs.length)

  const newBlog = {
    title: 'Additive test',
    author: 'John Doe',
    url: 'http://localhost:3001/api/test-blogs/3',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  // console.log('blogs at end', blogsAtEnd)
  // console.log('blogs at end length', blogsAtEnd.length)
  assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

  const titleTest = blogsAtEnd.map((n) => n.title)
  assert(titleTest.includes('Additive test'))
})

test('blog post has likes; default 0 if none in request', async () => {
  const newBlog = {
    title: 'Likes Test',
    author: 'John Doe',
    url: 'http://localhost:3001/api/test-blogs/3',
  }
  await api.post('/api/blogs').send(newBlog)

  const blogs = await api.get('/api/blogs')
  // console.log(blogs.body)
  const blogLikes = blogs.body.map((blog) => blog.likes)
  // console.log(blogLikes)
  assert(!blogLikes.includes(undefined))
  // console.log(blogLikes)
})

test('400 Bad Request when title or URL are missing', async () => {
  const titlelessBlog = {
    author: 'Jim Doe',
    url: 'http://localhost:3001/api/test-blogs/4',
  }

  const noUrlBlog = {
    title: 'Oops, No URL',
    author: 'Janette Doe',
  }
  await api.post('/api/blogs').send(titlelessBlog).expect(400)
  await api.post('/api/blogs').send(noUrlBlog).expect(400)
  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('a blog post can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map((r) => {
    r.title
  })
  assert(!titles.includes(blogToDelete.title))
})

test('a blog post can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    title: 'Updated Title',
    author: 'Updated Author',
  }

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  const title = blogsAtEnd.map((r) => r.title)
  // console.log(title)
  const author = blogsAtEnd.map((r) => r.author)
  // console.log(author)
  assert(title.includes('Updated Title'))
  assert(author.includes('Updated Author'))
})

after(async () => {
  await mongoose.connection.close()
})
