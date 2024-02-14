import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return ''
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(showNotification(message))
    setTimeout(() => dispatch(hideNotification()), seconds * 1000)
  }
}

export default notificationSlice.reducer
