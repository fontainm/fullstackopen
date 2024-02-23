import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      blogService.setToken(action.payload?.token)
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      dispatch(setUser(user))
      window.localStorage.setItem('blogUser', JSON.stringify(user))
      dispatch(setNotification(`Welcome ${user.name}!`, 'success', 5))
    } catch (exception) {
      const message = exception.response?.data?.error ?? 'Wrong credentials'
      dispatch(setNotification(message, 'danger', 5))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(setUser(null))
    window.localStorage.removeItem('blogUser')
  }
}

export default userSlice.reducer
