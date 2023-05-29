import { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesDetail from './components/CountriesDetail'
import CountryNameList from './components/CountryNameList'

const App = () => {
  const [filterName, setFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    if (countries === null){     
      console.log('fetching all countries...') 
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          console.log('promise fulfilled')
          console.log(response.data)
          console.log('api_key', api_key)
          setCountries(response.data)
        })}
    
    if (selectedCountry) {
      console.log('fetching weather...')
      // console.log('selectedCountry', selectedCountry.name.common)
      // console.log('coordinates', selectedCountry.capitalInfo.latlng)
      const [lat, lng] = selectedCountry.capitalInfo.latlng
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
      // axios
      //   .get(`https://api.weatherstack.com/current?access_key=${api_key}&query=${selectedCountry.capital}`)
      //   .then(response => {
      //     console.log('promise fulfilled')
      //     console.log(response.data)
      //     setWeather(response.data)
      //   })
    }
  }, [selectedCountry])

  if (countries === null) {
    return <div>loading...</div>
  }

  const handleFiltered = (event) => {
    // console.log('%cApp.js line:45 selectedCountry', 'color: #007acc;', selectedCountry);
    setSelectedCountry(null)
    setFilter(event.target.value)
  }

  const handleSet = (country) => {
    setSelectedCountry(country)
    // setFilter('')
  }

  const filtered = countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase()))

  const countriesToShow = selectedCountry
    ? <CountriesDetail filtered={[selectedCountry]} handleSet={handleSet} />
    : filtered.length > 10
      ? 'Too many matches, specify another filter'
      : filtered.length <= 1 && filtered.length >= 1
        ? <CountriesDetail filtered={filtered} handleSet={handleSet}/>
        : <CountryNameList filtered={filtered} handleSet={handleSet}/>

  const weatherToShow = weather && selectedCountry
    ? <div>
        <h2>Weather in {selectedCountry.capital}</h2>
        <div>temperature {(weather.current.temp - 273.15).toFixed(2)} Celsius</div>
        <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}.png`} alt={weather.current.weather[0].description} />
        <div>wind {weather.current.wind_speed} m/s</div>
      </div>
    : null

  return (
    <div>
      <div>
        find countries <input value={filterName} onChange={handleFiltered} />
      </div>
      {countriesToShow}
      {weatherToShow}
    </div>
  )
}

export default App