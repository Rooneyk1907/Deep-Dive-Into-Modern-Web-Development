import React from 'react'
import { useParams } from 'react-router-dom'

const BlogsByUser = () => {
  const userId = useParams().userId
  const blogs = useSelector(blogs)
  console.log(blogs)
  const userBlogs = blogs.map(blog => (blog.id === userId ? blog : null))
  console.log(userBlogs)
  return (
    <>
      <div>BlogsByUser {userId}</div>

      <div>{userBlogs}</div>
    </>
  )
}

export default BlogsByUser
