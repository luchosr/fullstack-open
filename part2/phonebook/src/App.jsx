import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInput = (event) => {
    setFilterValue(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    persons.find((person) => person.name === nameObject.name)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(nameObject));

    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>
        Filter shown with{' '}
        <input value={filterValue} onChange={handleFilterInput} />
      </h3>
      <form>
        <div>
          name:{' '}
          <input type="string" value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number:{' '}
          <input type="string" value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(
        (person) =>
          person.name.includes(filterValue) && (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          )
      )}
    </div>
  );
};

export default App;
