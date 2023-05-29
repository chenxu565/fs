import React, { useEffect } from "react";

const ShowOneCountry = ({ country , handleSet}) => {
  // console.log(country.capitalInfo.latlng)
  // useEffect(() => {
  //   setSelectedCountry(country);
  // }, []);
  useEffect(() => {
    handleSet(country)
  }, [])

  return (
    <div>
    <h1>{country.name.common}</h1>
    <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
      <li>capital {country.capital}</li>
      <li>area {country.area}</li>
    </ul>
    <h3>languages:</h3>
    <ul style={{listStyleType: "disc"}}>
      {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
    </ul>
    <img src={country.flags.png} alt="flag" height="100" style={{marginTop: '10px'}}/>
    </div>
  )
}

export default ShowOneCountry