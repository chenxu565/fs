import { configureStore } from '@reduxjs/toolkit'

import noticeReducer from './reducers/noticeReducer'

const store = configureStore({
  reducer: {
    notice: noticeReducer,
  },
})

export default store
