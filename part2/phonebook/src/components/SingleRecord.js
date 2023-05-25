import React from "react"

const SingleRecord = ({ record, deleteRecord }) => {
    return (
      <li>
        {record.name} {record.number} {' '}
        {/* <button onClick={deleteRecord}>delete</button> */}
        <button onClick={() => deleteRecord(record.id)}>delete</button>
      </li>
    )
  }
export default SingleRecord