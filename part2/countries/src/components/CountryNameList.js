import React from "react"

const CountryNameList = ({ filtered, handleShowClick }) => {
  return(
  <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
  {
  filtered.map(country => (
    <li key={country.name.common}>
      {country.name.common}
      <button onClick={() => handleShowClick(country)}>show</button>
    </li>)
  )
  }
  </ul>
  )
}

export default CountryNameList