import React from "react"

const SingleRecord = ({ record }) => {
    return (
      <li>{record.name} {record.number}</li>
    )
  }
export default SingleRecord