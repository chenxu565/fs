import React from 'react'
import { useQuery } from 'react-query'
import userService from '../services/users'
import { Link } from 'react-router-dom'

const Users = () => {
  const {
    isLoading,
    isError,
    isSuccess,
    data: users,
  } = useQuery('users', userService.getAllUsers, {
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return <div>loading...</div>
  }

  if (isError) {
    return <div>error...</div>
  }

  if (isSuccess) {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Users
