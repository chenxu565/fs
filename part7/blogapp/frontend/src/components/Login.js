import { useSetStorageUser, useNotifyWith } from '../StoreContext'
import loginService from '../services/login'
import storageService from '../services/storage'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { Input, Button } from './StyledComponents'

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
        <Input {...username} />
      </div>
      <div>
        password
        <Input {...password} />
      </div>
      <Button id="login-button" type="submit">
        login
      </Button>
    </form>
  )
}

export default LoginForm
