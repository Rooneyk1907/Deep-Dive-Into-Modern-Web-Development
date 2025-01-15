import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      console.log('ACTION', action)
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
