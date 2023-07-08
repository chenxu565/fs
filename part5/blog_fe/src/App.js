import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoggedUser from './components/LoggedUser'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('green')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user) {
      console.log('user', user)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } else {
      setBlogs([])
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('loggedUserJSON', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('user', user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Logged in')
      setMessageType('green')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('wrong credentials')
      setMessage('wrong username or password')
      setMessageType('red')
      console.log('exception', exception)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage('Logged out')
    setMessageType('green')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    console.log('returnedBlog', returnedBlog)
    setBlogs(blogs.concat(returnedBlog))
    setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setMessageType('green')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  
  return (
    <div>
      { !user && 
        <div>
          <h2> log in to applicaiton</h2>
          <Notification message={message} messageType={messageType}/>
          <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
        </div>
      }
      { user &&
        <div>
          <h2>blogs</h2>
          <Notification message={message} messageType={messageType} />
          <LoggedUser user={user} handleLogout={handleLogout} />
          <h2>create new</h2>
          <BlogForm addBlog={addBlog} />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App