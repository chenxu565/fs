import axios from 'axios'
import storageService from '../services/storage'
const baseUrl = '/api/blogs'

const getHeaders = () => {
  const user = storageService.loadUser()
  const headers = {
    Authorization: user ? `Bearer ${user.token}` : null,
  }
  return headers
}

const getAllBlogs = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async (object) => {
  const request = await axios.post(baseUrl, object, { headers: getHeaders() })
  return request.data
}

const updateBlog = async (object) => {
  const request = await axios.put(`${baseUrl}/${object.id}`, object, {
    headers: getHeaders(),
  })
  return request.data
}

const removeBlog = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers: getHeaders() })
}

export default { getAllBlogs, createBlog, updateBlog, removeBlog }
