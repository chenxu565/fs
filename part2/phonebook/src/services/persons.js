import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = '/api/persons'
// const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
    // const nonExisting = {
    //   id: 10000,
    //   name: 'NA',
    //   number: '444-444',
    // }
    // return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteRecord = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

// export default { getAll, create, update, deleteRecord }
const apiExports = { getAll, create, update, deleteRecord }

export default apiExports
