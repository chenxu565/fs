import React from 'react'
import { Link } from 'react-router-dom'
import LoggedUser from './LoggedUser'

const Menu = () => {
  const padding = {
    padding: 5,
  }
  return (
    <div className="menu">
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <LoggedUser />
    </div>
  )
}

export default Menu
