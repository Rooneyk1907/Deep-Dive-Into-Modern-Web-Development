import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (blogPost) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blogPost, config)
  return response.data
}

const addLike = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/${id}`)
  const blogToLike = response.data

  const addedLike = (blogToLike.likes += 1)
  const blogWithLike = { ...blogToLike, addedLike }
  const request = await axios.put(`${baseUrl}/${id}`, blogWithLike, config)
  return request.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { setToken, getAll, create, addLike, getOne, deleteBlog }
