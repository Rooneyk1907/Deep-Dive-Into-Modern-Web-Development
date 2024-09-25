const { test, describe } = require('node:test')
const assert = require('node:assert/strict')

const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '66ea1a6ad7c2ad1c2494425e',
    title: 'First Blog Post - Test',
    author: 'John Doe',
    url: 'http://localhost:3001/api/blogs',
    likes: 1,
    __v: 0,
  },
  {
    _id: '66ea1a9dd7c2ad1c24944261',
    title: 'Second Blog Post - Test',
    author: 'Jane Doe',
    url: 'http://localhost:3001/api/blogs/2',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 6,
  },
]

const popularBLog = [
  {
    title: 'Second Blog Post - Test',
    author: 'Jane Doe',

    likes: 12,
  },
  // {
  //   title: 'Canonical string reduction',
  //   author: 'Edsger W. Dijkstra',
  //   likes: 12,
  // },
]

// test('dummy returns one', () => {
//   const blogs = []

//   const result = listHelper.dummy(blogs)
//   assert.strictEqual(result, 1)
// })

// describe('total likes', () => {
//   test('total likes accross all blog posts', () => {
//     assert.strictEqual(listHelper.totalLikes(blogs), 10)
//   })
// })

describe('favorite blog', () => {
  test('return blog with most likes', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), popularBLog)
  })

  return console.log(listHelper.favoriteBlog(blogs))
})
