import { useQuery } from 'react-query'
import blogService from '../services/blogs'
import { useStoreValue } from '../StoreContext'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const { storageUser: user } = useStoreValue()
  const byLikes = (b1, b2) => b2.likes - b1.likes

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid',
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

  if (isLoading) {
    return <div>loading...</div>
  }

  if (isError) {
    return <div>error...</div>
  }

  if (isSuccess) {
    return (
      <div>
        {blogs.sort(byLikes).map((blog) => (
          <div key={blog.id} style={style}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    )
  }
}

export default Blogs
