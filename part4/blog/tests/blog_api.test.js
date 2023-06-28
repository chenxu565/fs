const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('get blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://www.testurl.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(blogsAtEnd).toContainEqual(expect.objectContaining(newBlog))
  })

  test('if likes is missing, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://www.testurl.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find(blog => blog.title === 'Test Blog')

    expect(addedBlog.likes).toBe(0)
  })

  test('returns 400 if title is missing', async () => {
    const newBlog = {
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('returns 400 if url is missing', async () => {
    const newBlog = {
      title: 'Test Title',
      author: 'Test Author',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('returns 400 if both title and url are missing', async () => {
    const newBlog = {
      author: 'Test Author',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    expect(blogsAtEnd).not.toContainEqual(expect.objectContaining(blogToDelete))
  })

  test('fails with status code 404 if id is valid but does not exist', async () => {
    const validNonExistentId = await helper.nonExistentId()

    await api
      .delete(`/api/blogs/${validNonExistentId}`)
      .expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = 'not-a-valid-id'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: 'Updated Title',
      author: 'Updated Author',
      url: 'http://www.updatedurl.com',
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    expect(blogsAtEnd).toContainEqual(expect.objectContaining(updatedBlog))
  })

  test('fails with status code 404 if id is valid but does not exist', async () => {
    const validNonExistentId = await helper.nonExistentId()

    const updatedBlog = {
      title: 'Updated Title',
      author: 'Updated Author',
      url: 'http://www.updatedurl.com',
      likes: 1
    }

    await api
      .put(`/api/blogs/${validNonExistentId}`)
      .send(updatedBlog)
      .expect(404)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    expect(blogsAtEnd).not.toContainEqual(expect.objectContaining(updatedBlog))
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = 'not-a-valid-id'

    const updatedBlog = {
      title: 'Updated Title',
      author: 'Updated Author',
      url: 'http://www.updatedurl.com',
      likes: 1
    }

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(updatedBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    expect(blogsAtEnd).not.toContainEqual(expect.objectContaining(updatedBlog))
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with status code 404 if id is valid but does not exist', async () => {
    const validNonExistentId = await helper.nonExistentId()

    await api
      .get(`/api/blogs/${validNonExistentId}`)
      .expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = 'not-a-valid-id'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

afterAll(async() => {
  await mongoose.connection.close()
})