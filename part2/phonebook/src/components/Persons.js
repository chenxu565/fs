import React from "react"
import SingleRecord from "./SingleRecord"
// import personService from "../services/persons"

const Persons = ({ personsToShow, deleteRecord }) => {
    return (
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {
          personsToShow.map(record => 
          <SingleRecord 
            key={record.name} 
            record={record} 
            // deleteRecord={() => deleteRecord(record.id)}  
            deleteRecord={deleteRecord}
          />)
        }
      </ul>
    )
  }

export default Persons