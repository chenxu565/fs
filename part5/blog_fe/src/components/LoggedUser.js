const LoggedUser = ({ user, handleLogout }) => {
  if (user === null) {
    return null
  }

  return (
    <div>
      <p>{user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  )
}

export default LoggedUser