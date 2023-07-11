import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoggedUser from './components/LoggedUser'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('green')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage('Logged out')
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
          <LoginForm setUser={setUser} setMessage={setMessage} setMessageType={setMessageType} />        </div>
      }
      { user &&
        <div>
          <h2>blogs</h2>
          <Notification message={message} messageType={messageType} />
          <LoggedUser user={user} handleLogout={handleLogout} />
          <Togglable buttonLabel="new blog" ref={noteFormRef}>
            <h2>create new</h2>
            <BlogForm 
              blogs={blogs} 
              setBlogs={setBlogs} 
              setMessage={setMessage} 
              setMessageType={setMessageType}
              noteFormRef={noteFormRef}
            />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} oneBlog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App