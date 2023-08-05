import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { initializeBlogs } from '../reducers/blogReducer'
import Blog from './Blog'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      {[...blogs].sort(byLikes).map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
