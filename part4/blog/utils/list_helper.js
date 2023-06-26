const _ = require('lodash')

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // create an object with author and count
  const authorCount = _.countBy(blogs, 'author')

  // find the author with most blogs
  const mostBlogsAuthor = _.maxBy(Object.keys(authorCount), (author) => authorCount[author])

  return {
    author: mostBlogsAuthor,
    blogs: authorCount[mostBlogsAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}