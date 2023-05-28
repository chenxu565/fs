import React from "react"
import ShowOneCountry from "./ShowOneCountry"

const CountriesDetail = ({ filtered }) => {
    return(
    <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
    {
    filtered.map(country => 
    <li key={country.name.common}>
      <ShowOneCountry country={country} />
    </li>
    )}
    </ul>
    )
  }

export default CountriesDetail