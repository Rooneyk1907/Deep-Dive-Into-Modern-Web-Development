const bcrypt = require('bcryptjs')
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('User API Testing...', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('SECRET', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('User can be created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testUser',
      name: 'Test User',
      password: 'TestPassword',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((users) => users.username)
    assert(usernames.includes(newUser.username))
  })

  describe('Validation Testing...', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidNameLength = {
      username: 'hi',
      name: 'Hi Hello',
      password: 'TestPassword',
    }

    const invalidPasswordLengh = {
      username: 'hello',
      name: 'Hi Hello',
      password: 'hi',
    }

    test('Invalid name length is denied', async () => {
      const response = await api
        .post('/api/users')
        .send(invalidNameLength)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      assert(
        response.body.error.includes(
          'Username and/or Password must be at least 3 characters in length'
        )
      )
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('Invalid password length is denied', async () => {
      const response = await api
        .post('/api/users')
        .send(invalidPasswordLengh)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      assert(
        response.body.error.includes(
          'Username and/or Password must be at least 3 characters in length'
        )
      )
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
  console.log('Disconnected from MongoDB')
})
