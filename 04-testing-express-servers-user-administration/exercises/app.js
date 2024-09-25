const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('connected to MongoDB')
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
