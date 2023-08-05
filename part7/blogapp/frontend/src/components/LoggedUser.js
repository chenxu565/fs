import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeStorageUser } from '../reducers/storageReducer'
import { notifyWith } from '../reducers/noticeReducer'

const LoggedUser = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.storageUser)

  const handleLogout = () => {
    dispatch(removeStorageUser())
    dispatch(notifyWith('Logged out'))
  }

  if (user === null) {
    return null
  }

  return (
    <div>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  )
}

export default LoggedUser
