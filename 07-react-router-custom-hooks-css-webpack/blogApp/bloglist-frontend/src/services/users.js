import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  const users = response.data
  const userStats = users.map(user => ({
    name: user.name,
    blogs: user.blogs.length,
    id: user.id,
  }))
  return userStats
}

export default { getUsers }
