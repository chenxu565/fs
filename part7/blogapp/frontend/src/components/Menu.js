import React from 'react'
import { Link } from 'react-router-dom'
import LoggedUser from './LoggedUser'
import { Navigation } from './StyledComponents'

const Menu = () => {
  const padding = {
    padding: 5,
  }
  return (
    <Navigation>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <LoggedUser />
    </Navigation>
  )
}

export default Menu
