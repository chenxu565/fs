import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useNotifyWith } from './StoreContext'

const App = () => {
  const queryClient = useQueryClient()
  const [user, setUser] = useState('')

  const blogFormRef = useRef()
  const notifyWith = useNotifyWith()

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
    console.log(user)
  }, [])

  const createBlogMutation = useMutation(blogService.createBlog, {
    onSuccess: (newBlog) => {
      queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
      notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
      blogFormRef.current.toggleVisibility()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      storageService.saveUser(user)
      notifyWith('welcome!')
    } catch (e) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
    notifyWith('logged out')
  }

  const like = async (blog) => {
    console.log(blog)
  }

  const remove = async (blog) => {
    console.log(blog)
  }

  const {
    isLoading,
    isError,
    isSuccess,
    data: blogs,
  } = useQuery('blogs', blogService.getAllBlogs, {
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!user, // query will not run until user is truthy
  })

  const byLikes = (b1, b2) => b2.likes - b1.likes

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    )
  }

  if (isLoading) {
    return <div>Loading...</div>
  } else if (isError) {
    return <div>Error: {isError.message}</div>
  } else if (isSuccess) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          {user.name} logged in
          <button onClick={logout}>logout</button>
        </div>
        <Togglable buttonLabel="new note" ref={blogFormRef}>
          <NewBlog createBlogMutation={createBlogMutation} />
        </Togglable>
        <div>
          {[...blogs].sort(byLikes).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              like={() => like(blog)}
              canRemove={user && blog.user.username === user.username}
              remove={() => remove(blog)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App
