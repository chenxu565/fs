import React from "react"

const Notification = ({ message, messageType }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={`msg ${messageType}`}>
        {message}
      </div>
    )
  }

    export default Notification