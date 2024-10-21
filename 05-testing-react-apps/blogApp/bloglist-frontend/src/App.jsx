import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notificationType, setNotificationType] = useState('success')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogPost) => {
    blogService
      .create(blogPost)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationMessage(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch((error) => {
        setNotificationType('error')
        setNotificationMessage(error.message)
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType('success')
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong Credentials')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType('success')
      }, 5000)
    }
  }

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch (error) {
      if (error.message === 'token expired') {
        setNotificationMessage('Session Expired. Please log in again')
        setNotificationType('error')

        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType('success')
        }, 5000)
      }
    }
  }

  const handleLike = async (blog) => {
    try {
      await blogService.addLike(blog.id)
      const blogAtEnd = await blogService.getOne(blog.id)
      setBlogs(
        blogs.map((blog) =>
          blog.id === blogAtEnd.id ? { ...blog, likes: blogAtEnd.likes } : blog
        )
      )
    } catch (error) {
      if (error.response.data.error === 'token expired') {
        handleLogout()
      }
    }
  }

  const handleDelete = async (blog) => {
    const { title, author, id } = blog
    window.confirm(`Delete blog ${title} by ${author}?`)
    const blogToDelete = await blogService.deleteBlog(id)
    console.log(`blog ${title} deleted`)
    setBlogs(blogs.map((blog) => blog.id !== id && blog))
  }

  const sortedBlogs = [...blogs].sort(
    (blogOne, blogTwo) => blogTwo.likes - blogOne.likes
  )
  // console.log('unsorted blogs', blogs)
  // console.log('sorted blogs', sortedBlogs)

  const blogFormRef = useRef()
  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <NewBlog createBlog={addBlog} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      {user === null ? (
        <>
          <h2>log in to application</h2>
          <Notification
            notificationType={notificationType}
            message={notificationMessage}
          />

          <LoginForm
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
            // handleUsernameChange={handleUsernameChange}
            // handlePasswordChange={handlePasswordChange}
            username={username}
            password={password}
          />
        </>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification
            notificationType={notificationType}
            message={notificationMessage}
          />
          <p>{user.name} logged in</p>

          <div>
            <button onClick={handleLogout}>logout</button>
          </div>

          {blogForm()}

          <Togglable>buttonLabel unohtui...</Togglable>
          <div>
            {sortedBlogs.map(
              (blog) =>
                blog && (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    blogUserId={blog.user.id}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                    user={user}
                  />
                )
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
