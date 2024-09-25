const dummy = (blogs) => {
  return 1
}

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

module.exports = { dummy, totalLikes, favoriteBlog }
