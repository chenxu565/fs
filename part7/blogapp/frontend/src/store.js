import { configureStore } from '@reduxjs/toolkit'

import noticeReducer from './reducers/noticeReducer'
import blogReducer from './reducers/blogReducer'
import storageReducer from './reducers/storageReducer'

const store = configureStore({
  reducer: {
    notice: noticeReducer,
    blogs: blogReducer,
    storageUser: storageReducer,
  },
})

export default store
