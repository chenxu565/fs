import React from "react"

const CountryNameList = ({ filtered }) => {
  return(
  <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
  {
  filtered.map(country => <li key={country.name.common}>{country.name.common}</li>)
  }
  </ul>
  )
}

export default CountryNameList