// import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useNotifyWith, useStoreValue } from '../StoreContext'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = () => {
  // const [visible, setVisible] = useState(false)
  const queryClient = useQueryClient()
  const notifyWith = useNotifyWith()
  const { storageUser: user } = useStoreValue()
  const id = useParams().id
  const blogs = queryClient.getQueryData('blogs')
  const blog = blogs.find((blog) => blog.id === id)
  const navigate = useNavigate()

  const canRemove = user && user.username === blog.user.username

  const updateBlogMutation = useMutation(blogService.updateBlog, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog)),
      )
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const deleteBlogMutation = useMutation(blogService.removeBlog, {
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.filter((blog) => blog.id !== deletedBlog.id),
      )
      notifyWith(`Blog '${deletedBlog.title}' removed`)
    },
    onError: (error) => {
      console.log(error)
      notifyWith('Error removing blog')
    },
  })

  const like = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlogMutation.mutate(updatedBlog, {
      onSuccess: () => {
        notifyWith(`Blog '${updatedBlog.title}' liked`)
      },
    })
  }

  const remove = async () => {
    // console.log('remove, user', user)
    // console.log('remove, chromeUser', chromeUser)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog, {
        onSuccess: () => {
          navigate('/')
        },
      })
    }
  }

  // const style = {
  //   marginBottom: 2,
  //   padding: 5,
  //   borderStyle: 'solid',
  // }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={like}>like</button>
      </div>
      <div>added by {blog.author}</div>
      {canRemove && (
        <div>
          <button onClick={remove}>remove</button>
        </div>
      )}
    </div>
    // <div style={style} className="blog">
    //   {blog.title} {blog.author}
    //   <button onClick={() => setVisible(!visible)}>
    //     {visible ? 'hide' : 'show'}
    //   </button>
    //   {visible && (
    //     <div>
    //       <div>
    //         {' '}
    //         <a href={blog.url}> {blog.url}</a>{' '}
    //       </div>
    //       <div>
    //         likes {blog.likes} <button onClick={like}>like</button>
    //       </div>
    //       <div>{blog.user && blog.user.name}</div>
    //       {canRemove && <button onClick={remove}>delete</button>}
    //     </div>
    //   )}
    // </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }),
}

export default Blog
