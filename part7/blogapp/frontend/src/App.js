import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import LoggedUser from './components/LoggedUser'

import { setUser } from './reducers/storageReducer'
import storageService from './services/storage'

const App = () => {
  const user = useSelector((state) => state.storageUser)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    const storedUser = storageService.loadUser()
    dispatch(setUser(storedUser))
  }, [])

  return (
    <div>
      {!user && (
        <div>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm />
        </div>
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification />
          <LoggedUser />
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <NewBlog blogFormRef={blogFormRef} />
          </Togglable>
          <Blogs />
        </div>
      )}
    </div>
  )
}

export default App
