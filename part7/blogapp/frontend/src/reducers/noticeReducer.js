import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: null,
}

const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    setNotice(state, action) {
      const { message, type } = action.payload
      return { message, type }
    },
    clearNotice() {
      return initialState
    },
  },
})

export const { setNotice, clearNotice } = noticeSlice.actions

// An action creator
export const notifyWith = (message, type = 'info') => {
  return async (dispatch) => {
    dispatch(setNotice({ message, type }))
    setTimeout(() => {
      dispatch(clearNotice())
    }, 3000)
  }
}

// The reducer
export default noticeSlice.reducer
