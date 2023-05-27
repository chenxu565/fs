import { useState, useEffect } from 'react'
import axios from 'axios'

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
    : filtered.length === 1
      ? filtered.map(country => <div key={country.name}>
        <h1>{country.name.common}</h1>
        <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
          <li>capital {country.capital}</li>
          <li>area {country.area}</li>
        </ul>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt="flag" height="100" />
      </div>)
      : 
      <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
      {filtered.map(country => <li key={country.name.common}>
        {country.name.common}
      </li>)}
      </ul>

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