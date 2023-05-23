import React from "react"
import SingleRecord from "./SingleRecord"

const Persons = ({ personsToShow }) => {
    return (
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {
          personsToShow.map(person => <SingleRecord key={person.name} record={person} />)
        }
      </ul>
    )
  }

export default Persons