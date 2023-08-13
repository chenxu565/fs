import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useNotifyWith } from '../StoreContext'
import { useField } from '../hooks'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ blogFormRef }) => {
  const [title, resetTitle] = useField('title')
  const [author, resetAuthor] = useField('author')
  const [url, resetUrl] = useField('url')
  const queryClient = useQueryClient()
  const notifyWith = useNotifyWith()

  const createBlogMutation = useMutation(blogService.createBlog, {
    onSuccess: (newBlog) => {
      // console.log('Returned from mock createBlog', newBlog)
      const blogs = queryClient.getQueryData('blogs') || []
      // console.log(blogs)
      // console.log(newBlog)
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
      notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
      blogFormRef.current.toggleVisibility()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log('create new blog', title, author, url)
    createBlogMutation.mutate({
      title: title.value,
      author: author.value,
      url: url.value,
    })
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <h4>Create a new blog</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="title" variant="outlined" size="small" {...title} />
        </div>
        <div>
          <TextField
            label="author"
            variant="outlined"
            size="small"
            {...author}
          />
        </div>
        <div>
          <TextField label="url" variant="outlined" size="small" {...url} />
        </div>
        <Button variant="contained" type="submit" color="primary">
          create
        </Button>
      </form>
      {/* <form onSubmit={handleSubmit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url
          <input {...url} type="text" />
        </div>
        <button type="submit">create</button>
      </form> */}
    </div>
  )
}

export default BlogForm
