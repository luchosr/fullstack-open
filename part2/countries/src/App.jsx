import { useEffect, useState } from 'react';
import { getAll } from './services/Countries';
import CountryInfo from './components/CountryInfo';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    getAll().then((response) => setCountries(response.data));
  }, [searchValue]);

  const handleSearchImput = (event) => {
    setSearchValue(event.target.value);
    updateFilteredCountryArray(event.target.value);
  };

  const updateFilteredCountryArray = (match) => {
    const countriesToHaveBeenFiltered =
      countries.length > 0
        ? countries.filter((country) =>
            country.name.common.toLowerCase().includes(match.toLowerCase())
          )
        : [];

    setFilteredCountries(countriesToHaveBeenFiltered);
  };
  return (
    <>
      <div className="">
        find countries{' '}
        <input value={searchValue} onChange={handleSearchImput} />
      </div>
      <div className="">
        {filteredCountries.length <= 10 &&
          filteredCountries.map((country) => (
            <p key={country.name.common}>{country.name.common}</p>
          ))}
        {filteredCountries.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}
        {filteredCountries.length === 1 && (
          <CountryInfo filteredCountries={filteredCountries} />
        )}
      </div>
    </>
  );
}

export default App;
