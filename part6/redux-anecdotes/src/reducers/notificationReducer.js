// src/reducers/notificationReducer.js
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotice(state, action) {
      // console.log('action', action)
      // console.log('state', state )
      return action.payload
    },
    clearNotice(state) {
      return ''
    }
  }
})

export const setNotification = (message, seconds=10) => {
  return async dispatch => {
    dispatch(setNotice(message))
    setTimeout(() => {
      dispatch(clearNotice())
    }
    , seconds * 1000)
  }
}

export const { setNotice, clearNotice } = notificationSlice.actions
export default notificationSlice.reducer
