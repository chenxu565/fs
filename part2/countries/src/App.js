import { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesDetail from './components/CountriesDetail'
import CountryNameList from './components/CountryNameList'

const App = () => {
  const [filterName, setFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    if (countries === null){     
      console.log('fetching all countries...') 
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          console.log('promise fulfilled')
          console.log(response.data)
          setCountries(response.data)
        })}
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

  return (
    <div>
      <div>
        find countries <input value={filterName} onChange={handleFiltered} />
      </div>
      {countriesToShow}
    </div>
  )
}

export default App