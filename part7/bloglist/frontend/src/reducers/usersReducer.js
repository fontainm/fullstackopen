import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const response = await usersService.getAll()
    dispatch(setUsers(response))
  }
}

export default userSlice.reducer
