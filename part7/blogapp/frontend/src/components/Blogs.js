import Blog from './Blog'
import { useQuery } from 'react-query'
import blogService from '../services/blogs'
import { useStoreValue } from '../StoreContext'

const Blogs = () => {
  const { storageUser: user } = useStoreValue()
  const byLikes = (b1, b2) => b2.likes - b1.likes

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
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }
}

export default Blogs
