import blogService from '../services/blogs'
import { useQueryClient } from 'react-query'

const NewComment = ({ blog }) => {
  const queryClient = useQueryClient()
  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    const updatedBlog = await blogService.addCommentToBlog(blog, comment)

    const blogs = queryClient.getQueryData('blogs')
    queryClient.setQueryData(
      'blogs',
      blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog)),
    )
  }

  return (
    <form onSubmit={addComment}>
      <input name="comment" />
      <button type="submit">add comment</button>
    </form>
  )
}

export default NewComment
