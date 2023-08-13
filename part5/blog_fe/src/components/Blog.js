import { useState } from 'react'

const Blog = ({ blog, handleBlogUpdate, handleBlogRemoval }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = async() => {
    // console.log('like')
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    await handleBlogUpdate(updatedBlog)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible &&
      <div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={likeBlog}>like</button>
        </div>
        <div>{blog.user.name}</div>
        { blog.user.username === JSON.parse(localStorage.getItem('loggedBlogappUser')).username
          &&
          <button onClick={() => handleBlogRemoval(blog.id)}>remove</button> }
      </div>
      }
    </div>
  )
}

export default Blog