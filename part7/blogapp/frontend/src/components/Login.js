import { useSetStorageUser, useNotifyWith } from '../StoreContext'
import loginService from '../services/login'
import storageService from '../services/storage'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const LoginForm = () => {
  const [username] = useField('username')
  const [password] = useField('password')
  const setStorageUser = useSetStorageUser()
  const notifyWith = useNotifyWith()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
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
        <input {...username} />
      </div>
      <div>
        password
        <input {...password} />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
