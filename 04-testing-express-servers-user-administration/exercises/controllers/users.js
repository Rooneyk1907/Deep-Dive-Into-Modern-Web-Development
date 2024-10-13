const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()

const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password.length >= 3 && username.length >= 3) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } else {
    response.status(400).json({
      error: 'Username and/or Password must be at least 3 characters in length',
    })
  }
})

module.exports = usersRouter
