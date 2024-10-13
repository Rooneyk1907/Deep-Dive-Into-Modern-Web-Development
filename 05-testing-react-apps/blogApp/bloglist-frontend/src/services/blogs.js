import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (blogPost) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blogPost, config)
  return response.data
}

export default { setToken, getAll, create }
