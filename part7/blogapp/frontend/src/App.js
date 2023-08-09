import { useEffect } from 'react'
import storageService from './services/storage'

import LoginForm from './components/Login'
import Notification from './components/Notification'
import LoggedUser from './components/LoggedUser'
import TogglableBlogForm from './components/TogglableNewBlog'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { useSetStorageUser, useStoreValue } from './StoreContext'

const App = () => {
  const setStorageUser = useSetStorageUser()
  const { storageUser: user } = useStoreValue()

  const padding = {
    padding: 5,
  }

  useEffect(() => {
    const user = storageService.loadUser()
    setStorageUser(user)
    // console.log('user', user)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <div className="menu">
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          <LoggedUser />
        </div>
        <h2>blogs</h2>
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <TogglableBlogForm />
                <Blogs />
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
