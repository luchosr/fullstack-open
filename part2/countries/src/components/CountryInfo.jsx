/* eslint-disable react/prop-types */
const CountryInfo = ({ filteredCountries }) => {
  const firstCountry = filteredCountries[0];
  const countryLanguages = Object.values(filteredCountries[0].languages);
  const countryFlags = Object.values(filteredCountries[0].flags);
  return (
    <>
      {filteredCountries.length === 1 && (
        <div className="">
          <h2>{firstCountry.name.common}</h2>
          <div className="">Capital: {firstCountry.capital}</div>
          <div className="">Population: {firstCountry.population}</div>

          <h3>Languages</h3>
          <ul>
            {countryLanguages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            src={countryFlags[1]}
            alt={`${firstCountry.name.common}'s flag`}
            width="20%"
          />
        </div>
      )}
    </>
  );
};

export default CountryInfo;
