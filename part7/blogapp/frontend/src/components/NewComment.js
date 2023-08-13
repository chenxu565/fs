import blogService from '../services/blogs'
import { useQueryClient } from 'react-query'
import { useField } from '../hooks'
import { TextField, Button } from '@mui/material'

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
      <div>
        <TextField
          label="comment"
          variant="outlined"
          size="small"
          {...comment}
        />
      </div>
      <Button variant="contained" type="submit" color="primary">
        add comment
      </Button>
    </form>
    // <form onSubmit={addComment}>
    //   <input {...comment} />
    //   <button type="submit">add comment</button>
    // </form>
  )
}

export default NewComment
