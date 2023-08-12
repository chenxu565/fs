import blogService from '../services/blogs'
import { useQueryClient } from 'react-query'
import { useField } from '../hooks'

const NewComment = ({ blog }) => {
  const [comment, resetComment] = useField('comment')
  const queryClient = useQueryClient()
  const addComment = async (event) => {
    event.preventDefault()
    const updatedBlog = await blogService.addCommentToBlog(blog, comment.value)
    resetComment()

    const blogs = queryClient.getQueryData('blogs')
    queryClient.setQueryData(
      'blogs',
      blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog)),
    )
  }

  return (
    <form onSubmit={addComment}>
      <input {...comment} />
      <button type="submit">add comment</button>
    </form>
  )
}

export default NewComment
