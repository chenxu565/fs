const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const maxLikesBlog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, blogs[0])

  return {
    title: maxLikesBlog.title,
    author: maxLikesBlog.author,
    likes: maxLikesBlog.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}