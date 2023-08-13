import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useNotifyWith } from '../StoreContext'
import { useField } from '../hooks'
import { Input, Button } from './StyledComponents'

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
          title
          <Input {...title} />
        </div>
        <div>
          author
          <Input {...author} />
        </div>
        <div>
          url
          <Input {...url} type="text" />
        </div>
        <Button type="submit">create</Button>
      </form>
    </div>
  )
}

export default BlogForm
