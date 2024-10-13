const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'First Blog Post for Test DB',
    author: 'Jane Doe',
    url: 'http://localhost:3001/api/test-blogs/1',
    likes: 4,
  },
  {
    title: 'Second Blog Post for Test DB',
    author: 'John Doe',
    url: 'http://localhost:3001/api/test-blogs/2',
    likes: 3,
  },
]

const totalLikes = (blogs) => {
  const likeArray = blogs.map((blog) => blog.likes)
  const total = likeArray.reduce((sum, item) => {
    return sum + item
  }, 0)

  return total
}

const favoriteBlog = (blogs) => {
  let blogLikes = 0
  let likedBlog = []
  blogs.map((blog) => {
    const { title, author, likes } = blog
    const blogInfo = { title, author, likes }
    if (likes > blogLikes) {
      likedBlog = [blogInfo]
      blogLikes = likes
      console.log(
        `liked blog added after ${blog.title} with ${blog.likes}: `,
        likedBlog
      )
      console.log('current highest blog likes', blogLikes)
    } else if (likes === blogLikes) {
      likedBlog.push(blogInfo)
      console.log('blogs are tied with highest likes', likedBlog)
    }
  })

  return likedBlog
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const auth = async () => {
  const user = await User.findOne({ username: 'root' })

  const userLogin = {
    username: user.username,
    password: 'SECRET',
  }
  // User must login
  const loginResponse = await api
    .post('/api/login')
    .send(userLogin)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const token = loginResponse.body.token

  return token
}

module.exports = {
  initialBlogs,
  totalLikes,
  favoriteBlog,
  blogsInDb,
  usersInDb,
  auth,
}
