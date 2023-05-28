import { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesDetail from './components/CountriesDetail'
import CountryNameList from './components/CountryNameList'

const App = () => {
  const [filterName, setFilter] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    console.log('fetching all countries...')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  if (countries === null) {
    return <div>loading...</div>
  }

  const handleFiltered = (event) => {
    setFilter(event.target.value)
  }

  const filtered = countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase()))

  const countriesToShow = filtered.length > 10
    ? 'Too many matches, specify another filter'
    : filtered.length <= 1 && filtered.length >= 1
      ? <CountriesDetail filtered={filtered} />
      : <CountryNameList filtered={filtered} />

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