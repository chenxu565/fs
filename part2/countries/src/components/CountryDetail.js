import React from "react"

const CountryDetail = ({ filtered }) => {
    return(
    <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
    {
    filtered.map(country => <li key={country.name.common}>
      <h1>{country.name.common}</h1>
      <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
        <li>capital {country.capital}</li>
        <li>area {country.area}</li>
      </ul>
      <h2>languages:</h2>
      <ul style={{listStyleType: "disc"}}>
        {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag" height="100" style={{marginTop: '10px'}}/>
    </li>)
    }
    </ul>
    )
  }

export default CountryDetail