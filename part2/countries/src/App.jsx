import { useEffect, useState } from 'react';
import { getAll } from './services/Countries';
import CountryInfo from './components/CountryInfo';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    getAll().then((response) => setCountries(response.data));
  }, []);

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

  const handleShowButton = (countryInfo) => {
    updateFilteredCountryArray(countryInfo);
  };

  return (
    <>
      <div className="">
        find countries{' '}
        <input value={searchValue} onChange={handleSearchImput} />
      </div>
      <div className="">
        <CountryInfo
          filteredCountries={filteredCountries}
          handleShowButton={handleShowButton}
        />
      </div>
    </>
  );
}

export default App;
