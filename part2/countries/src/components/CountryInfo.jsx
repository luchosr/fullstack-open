/* eslint-disable react/prop-types */
const CountryInfo = ({ filteredCountries, handleShowButton }) => {
  const firstCountry = filteredCountries[0];

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
        </div>
      )}
    </>
  );
};

export default CountryInfo;
