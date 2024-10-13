const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('Blog API Testing...', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)

    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('SECRET', 10)
    const user = new User({
      username: 'root',
      name: 'Root User',
      passwordHash,
    })

    await user.save()
  })

  test('blog posts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unique identifier is titled "id"', async () => {
    const response = await api.get('/api/blogs')

    const postIDs = response.body.map((r) => r.id)
    assert(!postIDs.includes(undefined))
  })

  test('a blog post can be added', async () => {
    const initialBlogs = await helper.blogsInDb()
    const token = await helper.auth()

    const newBlog = {
      title: 'Additive test',
      author: 'John Doe',
      url: 'http://localhost:3001/api/test-blogs/3',
    }

    const blogResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

    const titleTest = blogsAtEnd.map((n) => n.title)
    assert(titleTest.includes('Additive test'))
  })

  test('blog post has likes; default 0 if none in request', async () => {
    const token = await helper.auth()

    const newBlog = {
      title: 'Likes Test',
      author: 'John Doe',
      url: 'http://localhost:3001/api/test-blogs/3',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await api.get('/api/blogs')

    const blogLikes = blogs.body.map((blog) => blog.likes)

    assert(!blogLikes.includes(undefined))
  })

  test('400 Bad Request when title or URL are missing', async () => {
    const token = await helper.auth()

    const titlelessBlog = {
      author: 'Jim Doe',
      url: 'http://localhost:3001/api/test-blogs/4',
    }

    const noUrlBlog = {
      title: 'Oops, No URL',
      author: 'Janette Doe',
    }

    await api
      .post('/api/blogs')
      .send(titlelessBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(noUrlBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a blog post can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const token = await helper.auth()

    const fodderBlog = {
      title: 'Delete Me',
      author: 'root',
      url: 'http://localhost:3001/api/blogs/1',
    }

    await api
      .post('/api/blogs')
      .send(fodderBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    //

    const blogsBeforeDeletion = await helper.blogsInDb()

    const user = await User.findOne({ username: 'root' }).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
      id: 1,
    })

    const blogToDelete = user.blogs[0]._id.toString()

    await api
      .delete(`/api/blogs/${blogToDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map((r) => {
      r.title
    })

    assert(!titles.includes(fodderBlog.title))
  })

  test('a blog post can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const token = await helper.auth()

    const updatedBlog = {
      title: 'Updated Title',
      author: 'Updated Author',
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const title = blogsAtEnd.map((r) => r.title)
    const author = blogsAtEnd.map((r) => r.author)
    assert(title.includes('Updated Title'))
    assert(author.includes('Updated Author'))
  })
})

after(async () => {
  await mongoose.connection.close()
  console.log('Disconnected from MongoDB')
})
