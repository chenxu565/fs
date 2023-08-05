import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notifyWith } from '../reducers/noticeReducer'
import loginService from '../services/login'
import { setStorageUser } from '../reducers/storageReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      dispatch(setStorageUser(user))
      dispatch(notifyWith('welcome!'))
    } catch (e) {
      dispatch(notifyWith('wrong username or password', 'error'))
      console.log(e)
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
