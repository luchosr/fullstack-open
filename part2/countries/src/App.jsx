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
    updateFilteredCountryArray();
  };

  const updateFilteredCountryArray = () => {
    const countriesToHaveBeenFiltered =
      countries.length > 0
        ? countries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchValue.toLowerCase())
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
        {filteredCountries.length === 1 && (
          <CountryInfo filteredCountries={filteredCountries} />
        )}
      </div>
    </>
  );
}

export default App;
