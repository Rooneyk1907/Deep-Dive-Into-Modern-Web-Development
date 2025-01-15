/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { Routes, Route, useParams } from 'react-router-dom'

import { setNotification } from './reducers/notificationReducer'
import { setBlogs, appendBlog } from './reducers/blogReducer'

import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UserView from './components/UserView'
import BlogsByUserView from './components/BlogsByUser'

const App = () => {
  const params = useParams()
  console.log(params.id)
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  // const [blogs, setBlogs] = useState([])

  const [notificationType, setNotificationType] = useState('success')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userStats, setUserStats] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => dispatch(setBlogs(blogs)))
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      userService.getUsers().then(users => setUserStats(users))
    }
  }, [])

  const addBlog = blogPost => {
    blogService
      .create(blogPost)
      .then(returnedBlog => {
        dispatch(appendBlog(returnedBlog))
        dispatch(
          setNotification(
            `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
          )
        )
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
      })
      .catch(error => {
        setNotificationType('error')
        dispatch(setNotification(error.message))
        setTimeout(() => {
          dispatch(setNotification(null))
          setNotificationType('success')
        }, 5000)
      })
  }

  const handleLogin = async event => {
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
      dispatch(setNotification('Wrong Credentials'))
      setNotificationType('error')
      setTimeout(() => {
        dispatch(setNotification(null))
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

  const handleLike = async blog => {
    try {
      await blogService.addLike(blog.id)
      const blogAtEnd = await blogService.getOne(blog.id)
      setBlogs(
        blogs.map(blog =>
          blog.id === blogAtEnd.id ? { ...blog, likes: blogAtEnd.likes } : blog
        )
      )
    } catch (error) {
      if (error.response.data.error === 'token expired') {
        handleLogout()
      }
    }
  }

  const handleDelete = async blog => {
    const { title, author, id } = blog
    window.confirm(`Delete blog ${title} by ${author}?`)
    await blogService.deleteBlog(id)
    console.log(`blog ${title} deleted`)
    dispatch(setBlogs(blogs.map(blog => blog.id !== id && blog)))
  }

  console.log(blogs)

  const sortedBlogs = [...blogs].sort(
    (blogOne, blogTwo) => blogTwo.likes - blogOne.likes
  )

  const blogFormRef = useRef()
  const blogForm = () => {
    return (
      <div>
        <Togglable
          buttonLabel='new blog'
          ref={blogFormRef}>
          <NewBlog addBlog={addBlog} />
        </Togglable>
      </div>
    )
  }

  return (
    <>
      <Routes>
        {/* <Route
          path='/'
          // element={<Home />}
        /> */}
        <Route
          path='/users/:userId'
          element={<BlogsByUserView />}
        />
      </Routes>
      <div>
        <Notification notificationType={notificationType} />
        {user === null ? (
          <>
            <h2>log in to application</h2>

            <LoginForm
              handleLogin={handleLogin}
              setUsername={setUsername}
              setPassword={setPassword}
              username={username}
              password={password}
            />
          </>
        ) : (
          <div>
            <h2>blogs</h2>

            <p>{user.name} logged in</p>

            <div>
              <button onClick={handleLogout}>logout</button>
            </div>
            {blogForm()}
            <div>
              <UserView userStats={userStats} />
            </div>
            {/* <Togglable>buttonLabel unohtui...</Togglable> */}
            <div>
              {sortedBlogs &&
                sortedBlogs.map(
                  blog =>
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
    </>
  )
}

export default App
