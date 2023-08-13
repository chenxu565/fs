import React from 'react'
import { Link } from 'react-router-dom'
import LoggedUser from './LoggedUser'
import { AppBar, Toolbar, Button } from '@mui/material'

const Menu = () => {
  // const padding = {
  //   padding: 5,
  // }
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <LoggedUser />
      </Toolbar>
    </AppBar>
    // <div className="menu">
    //   <Link style={padding} to="/">
    //     blogs
    //   </Link>
    //   <Link style={padding} to="/users">
    //     users
    //   </Link>
    //   <LoggedUser />
    // </div>
  )
}

export default Menu
