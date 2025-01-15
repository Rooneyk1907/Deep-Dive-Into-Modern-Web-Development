import React from 'react'
import { Link } from 'react-router-dom'
import BlogsByUserView from '../components/BlogsByUser'

const UserView = props => {
  // TODO: If a new blog is added, this prop needs to refresh
  const userStats = props.userStats
  console.log(userStats)
  return (
    <div>
      <h2>Users</h2>
      {userStats ? (
        <table>
          <tr>
            <td>
              <strong>Author</strong>
            </td>
            <td>
              <strong>Blogs</strong>
            </td>
          </tr>

          {userStats.map(user => (
            <tr key={user.name}>
              <td>
                <a href={`/users/${user.id}`}>{user.name}</a>
              </td>
              <td>{user.blogs}</td>
            </tr>
          ))}
        </table>
      ) : null}
    </div>
  )
}

export default UserView
