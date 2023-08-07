import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import {
  useNotifyWith,
  useSetStorageUser,
  useClearStorageUser,
} from './StoreContext'
import { useStoreValue } from './StoreContext'

const App = () => {
  const queryClient = useQueryClient()
  const setStorageUser = useSetStorageUser()
  const clearStorageUser = useClearStorageUser()
  const { storageUser: user } = useStoreValue()

  const blogFormRef = useRef()
  const notifyWith = useNotifyWith()

  useEffect(() => {
    const user = storageService.loadUser()
    setStorageUser(user)
    // console.log(user)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

  const updateBlogMutation = useMutation(blogService.updateBlog, {
    onSuccess: (updatedBlog) => {
      queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog)),
      )
      // notifyWith(`Blog '${updatedBlog.title}' updated`)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const deleteBlogMutation = useMutation(blogService.removeBlog, {
    onSuccess: (deletedBlog) => {
      queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.filter((blog) => blog.id !== deletedBlog.id),
      )
      notifyWith(`Blog '${deletedBlog.title}' deleted`)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setStorageUser(user)
      storageService.saveUser(user)
      notifyWith('welcome!')
    } catch (e) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const logout = async () => {
    clearStorageUser()
    storageService.removeUser()
    notifyWith('logged out')
  }

  const like = async (blog) => {
    // console.log(blog)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlogMutation.mutate(updatedBlog)
    notifyWith(`Blog '${updatedBlog.title}' liked`)
  }

  const remove = async (blog) => {
    // console.log(blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      // console.log('user is ok to remove')
      deleteBlogMutation.mutate(blog)
    }
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
