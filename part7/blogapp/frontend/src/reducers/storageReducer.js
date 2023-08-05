import { createSlice } from '@reduxjs/toolkit'

import storageService from '../services/storage'

const storageUserSlice = createSlice({
  name: 'storageUser',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    },
  },
})

export const { setUser, removeUser } = storageUserSlice.actions

export const setStorageUser = (user) => {
  return (dispatch) => {
    storageService.saveUser(user)
    dispatch(setUser(user))
  }
}

export const removeStorageUser = () => {
  return (dispatch) => {
    storageService.removeUser()
    dispatch(removeUser())
  }
}

export default storageUserSlice.reducer
