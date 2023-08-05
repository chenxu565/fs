import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { notifyWith } from '../reducers/noticeReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const user = useSelector((state) => state.storageUser)
  const dispatch = useDispatch()

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid',
  }

  const like = () => {
    dispatch(likeBlog(blog))
    dispatch(
      notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`),
    )
  }

  const remove = () => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`,
    )
    if (!ok) {
      return
    }
    dispatch(removeBlog(blog.id))
    dispatch(
      notifyWith(`The blog '${blog.title}' by '${blog.author}' was removed`),
    )
  }
  // console.log('blog.user', blog.user)
  // console.log('user', user)
  const canRemove = user && blog.user && blog.user.username === user.username

  return (
    <div style={style} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'show'}
      </button>
      {visible && (
        <div>
          <div>
            {' '}
            <a href={blog.url}> {blog.url}</a>{' '}
          </div>
          <div>
            likes {blog.likes} <button onClick={like}>like</button>
          </div>
          <div>{blog.user && blog.user.name}</div>
          {canRemove && <button onClick={remove}>delete</button>}
        </div>
      )}
    </div>
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
