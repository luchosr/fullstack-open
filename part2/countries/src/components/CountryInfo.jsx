import { useEffect, useState } from 'react';
import { getCapitalWeather } from '../services/Countries';

/* eslint-disable react/prop-types */
const CountryInfo = ({ filteredCountries, handleShowButton }) => {
  const [weatherData, setWeatherData] = useState(null);

  const firstCountry = filteredCountries[0];

  useEffect(() => {
    filteredCountries.length === 1 &&
      getCapitalWeather(filteredCountries[0].capital).then((response) =>
        setWeatherData(response.data)
      );
  }, [filteredCountries]);

  return (
    <>
      {filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button
              value={country.name.common}
              onClick={(event) => handleShowButton(event.target.value)}
            >
              Show
            </button>{' '}
          </div>
        ))}
      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {filteredCountries.length === 1 && (
        <div className="">
          <h2>{firstCountry.name.common}</h2>
          <div className="">Capital: {firstCountry.capital}</div>
          <div className="">Population: {firstCountry.population}</div>

          <h3>Languages</h3>
          <ul>
            {Object.values(filteredCountries[0].languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            src={Object.values(filteredCountries[0].flags)[1]}
            alt={`${firstCountry.name.common}'s flag`}
            width="20%"
          />

          {weatherData && (
            <div className="">
              <h3>Weather in {firstCountry.capital} </h3>
              <p>
                Temperature: {((weatherData.main.temp - 32) / 18).toFixed(2)}
                Celsius
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt=""
              />

              <p>Wind: {weatherData.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CountryInfo;
