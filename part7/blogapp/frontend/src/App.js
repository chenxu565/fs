import { useEffect } from 'react'
import storageService from './services/storage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LoginForm from './components/Login'
import Notification from './components/Notification'
import Menu from './components/Menu'
import TogglableBlogForm from './components/TogglableNewBlog'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import { Page } from './components/StyledComponents'

import { useSetStorageUser, useStoreValue } from './StoreContext'

const App = () => {
  const setStorageUser = useSetStorageUser()
  const { storageUser: user } = useStoreValue()

  useEffect(() => {
    const user = storageService.loadUser()
    setStorageUser(user)
    // console.log('user', user)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <Page>
        {!user ? (
          <>
            <h2>log in to application</h2>
            <Notification />
            <LoginForm />
          </>
        ) : (
          <>
            <Menu />
            <h2>blog app</h2>
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
          </>
        )}
      </Page>
    </Router>
  )
}

export default App
