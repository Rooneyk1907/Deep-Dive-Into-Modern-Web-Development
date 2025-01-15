import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import notificationReducer from './reducers/notificationReducer'
import blogReducer, { setBlogs } from './reducers/blogReducer'

import blogService from './services/blogs'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notifications: notificationReducer,
  },
})

// blogService.getAll().then(blogs =>
//   blogs.forEach(blog => {
//     store.dispatch(setBlogs(blog))
//   })
// )

console.log(store.getState())

store.subscribe(() => console.log(store.getState()))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
