import { useEffect } from 'react'
import storageService from './services/storage'

import LoginForm from './components/Login'
import Notification from './components/Notification'
import LoggedUser from './components/LoggedUser'
import TogglableBlogForm from './components/TogglableNewBlog'
import Blogs from './components/Blogs'

import { useSetStorageUser, useStoreValue } from './StoreContext'

const App = () => {
  const setStorageUser = useSetStorageUser()
  const { storageUser: user } = useStoreValue()

  useEffect(() => {
    const user = storageService.loadUser()
    setStorageUser(user)
    console.log('user', user)
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
    <div>
      <h2>blogs</h2>
      <Notification />
      <LoggedUser />
      <TogglableBlogForm />
      <Blogs />
    </div>
  )
}

export default App
