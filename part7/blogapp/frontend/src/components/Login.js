import { useState } from 'react'
import { useSetStorageUser, useNotifyWith } from '../StoreContext'
import loginService from '../services/login'
import storageService from '../services/storage'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const setStorageUser = useSetStorageUser()
  const notifyWith = useNotifyWith()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setStorageUser(user)
      storageService.saveUser(user)
      notifyWith('welcome!')
      navigate('/')
    } catch (e) {
      if (e.response.status === 401) {
        notifyWith('wrong username or password', 'error')
      } else {
        notifyWith('something went wrong', 'error')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
