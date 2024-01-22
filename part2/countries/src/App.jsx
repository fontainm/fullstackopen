import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import weatherService from "./services/weather";

const CountryInformation = ({ country }) => {
  if (!country) return;
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>captial {country.capital}</div>
      <div>area {country.area}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages)?.map((language) => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} height="100" />
    </div>
  );
};

const WeatherInformation = ({ weather }) => {
  if (!weather) return;
  return (
    <div>
      <h3>Weather in {weather.name}</h3>
      <div>temperature {weather.main.temp} Celsius</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  );
};

const FilteredCountries = ({ countries, showCountry }) => {
  if (countries.length === 0) {
    return null;
  }
  return (
    <div>
      {countries.map((country) => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => showCountry(country)}>show</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      weatherService.getWeather(selectedCountry.capital).then((data) => {
        setWeather(data);
      });
    }
  }, [selectedCountry]);

  const changeInput = (event) => {
    setSelectedCountry(null);
    let input = event.target.value;
    setInput(input);
    if (input === "") {
      setFilteredCountries([]);
      return;
    }
    let filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(input.toLowerCase())
    );
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    } else {
      setFilteredCountries(filteredCountries);
    }
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  let pageContent;
  if (selectedCountry) {
    pageContent = (
      <div>
        <CountryInformation country={selectedCountry} />
        <WeatherInformation weather={weather} />
      </div>
    );
  } else if (filteredCountries.length > 10) {
    pageContent = <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length <= 10) {
    pageContent = (
      <FilteredCountries
        countries={filteredCountries}
        showCountry={handleShowCountry}
      />
    );
  }

  return (
    <div>
      <div>
        find countries <input value={input} onChange={changeInput} />
      </div>
      {pageContent}
    </div>
  );
};

export default App;
