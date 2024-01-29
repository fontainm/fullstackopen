import { useState, useEffect } from 'react'
import countryService from './services/countries'

function CountryInput({ input, change }) {
  return (
    <div>
      find countries: <input value={input} onChange={change} />
    </div>
  )
}

function CountryDetails({ country }) {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <strong>languages:</strong>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </>
  )
}

function FilteredCountries({ filteredCountries }) {
  if (filteredCountries.length === 1) {
    return <CountryDetails country={filteredCountries[0]} />
  }

  if (filteredCountries.length <= 10) {
    return filteredCountries.map((country) => (
      <div key={country.cca3}>{country.name.common}</div>
    ))
  }

  return <div>Too many matches, specifiy another filter</div>
}

function App() {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService.getCountries().then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleInputChange = (event) => {
    event.preventDefault()
    setInput(event.target.value)
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(input.toLowerCase())
  )

  return (
    <div>
      <CountryInput input={input} change={handleInputChange} />
      <FilteredCountries filteredCountries={filteredCountries} />
    </div>
  )
}

export default App
