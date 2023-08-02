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

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (object) => {
  const request = await axios.post(baseUrl, object, { headers: getHeaders() })
  return request.data
}

const update = async (object) => {
  const request = await axios.put(`${baseUrl}/${object.id}`, object, {
    headers: getHeaders(),
  })
  return request.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers: getHeaders() })
}

export default { getAll, create, update, remove }
