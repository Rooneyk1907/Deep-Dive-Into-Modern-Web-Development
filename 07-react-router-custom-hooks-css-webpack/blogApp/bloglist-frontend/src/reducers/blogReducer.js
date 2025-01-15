import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      console.log('ACTION ', action)
      state.push(action.payload)
    },
    setBlogs(state, action) {
      console.log('ACTION ', action)
      return action.payload
    },
    appendBlog(state, action) {
      console.log('ACTION ', action)
      state.push(action.payload)
    },
  },
})

export const { createBlog, setBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer
