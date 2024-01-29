import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

function CountryInput({ input, change }) {
  return (
    <div>
      find countries: <input value={input} onChange={change} />
    </div>
  )
}

function CountryDetails({ country }) {
  if (!country) return
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

function WeatherDetails({ weather }) {
  if (!weather) return
  return (
    <>
      <h2>Weather in {weather.name}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <div>wind {weather.wind.speed} m/s</div>
    </>
  )
}

function FilteredCountries({ filteredCountries, show }) {
  if (filteredCountries.length <= 10) {
    return filteredCountries.map((country) => (
      <div key={country.cca3}>
        <span>{country.name.common}</span>
        <button onClick={() => show(country)}>show</button>
      </div>
    ))
  }

  return <div>Too many matches, specifiy another filter</div>
}

function App() {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService.getCountries().then((response) => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    if (!selectedCountry) {
      return
    }
    weatherService.getWeather(selectedCountry.capital[0]).then((response) => {
      setWeather(response.data)
    })
  }, [selectedCountry])

  const handleInputChange = (event) => {
    setSelectedCountry(null)
    let input = event.target.value
    setInput(input)
    let filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(input.toLowerCase())
    )
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0])
    } else {
      setFilteredCountries(filteredCountries)
    }
  }

  const handleShow = (country) => {
    setSelectedCountry(country)
  }

  let pageContent
  if (selectedCountry) {
    pageContent = (
      <>
        <CountryDetails country={selectedCountry} />
        <WeatherDetails weather={weather} />
      </>
    )
  } else {
    pageContent = (
      <FilteredCountries
        filteredCountries={filteredCountries}
        show={handleShow}
      />
    )
  }

  return (
    <>
      <CountryInput input={input} change={handleInputChange} />
      {pageContent}
    </>
  )
}

export default App
