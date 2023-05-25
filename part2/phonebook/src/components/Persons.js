import React from "react"
import SingleRecord from "./SingleRecord"
// import personService from "../services/persons"

const Persons = ({ personsToShow, deleteRecord }) => {
    return (
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {
          personsToShow.map(person => 
          <SingleRecord 
            key={person.name} 
            record={person} 
            deleteRecord={() => deleteRecord(person.id)}  
          />)
        }
      </ul>
    )
  }

export default Persons