import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowOneCountry = ({ country , handleSet}) => {
  // console.log(country.capitalInfo.latlng)
  // useEffect(() => {
  //   setSelectedCountry(country);
  // }, []);
  // useEffect(() => {
  //   handleSet(country)
  // }, [])
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  
  useEffect(() => {
    if (country) {
      console.log('fetching weather...')
      // console.log('selectedCountry', selectedCountry.name.common)
      // console.log('coordinates', selectedCountry.capitalInfo.latlng)
      const [lat, lng] = country.capitalInfo.latlng
      console.log('lat', lat)
      console.log('lng', lng)
      axios
        .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`)
        .then(response => {
          console.log('promise fulfilled')
          console.log(response.data)
          setWeather(response.data)
          // console.log('weather', weather.current.weather[0].icon)
        })
    }
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
    {weather
   ? (<div>
       <h2>Weather in {country.capital}</h2>
       <div>temperature {(weather.current.temp).toFixed(2)} Celsius</div>
       <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}.png`} alt={weather.current.weather[0].description} />
       <div>wind {weather.current.wind_speed} m/s</div>
     </div>)
   : (
    <div>Loading weather...</div>
     )}
    </div>
  )
}

export default ShowOneCountry