import blogService from '../services/blogs'
import { useQueryClient } from 'react-query'
import { useField } from '../hooks'
import { Input, Button } from './StyledComponents'

const NewComment = ({ blog }) => {
  const [comment, resetComment] = useField('comment')
  const queryClient = useQueryClient()
  const addComment = async (event) => {
    event.preventDefault()
    let updatedBlog = null
    try {
      updatedBlog = await blogService.addCommentToBlog(blog, comment.value)
      resetComment()
    } catch (error) {
      console.log(error)
      return
    }

    const blogs = queryClient.getQueryData('blogs')
    queryClient.setQueryData(
      'blogs',
      blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog)),
    )
  }

  return (
    <form onSubmit={addComment}>
      <Input {...comment} />
      <Button type="submit">add comment</Button>
    </form>
  )
}

export default NewComment
