import { useState, useEffect } from 'react';
import { getAll, create, deleteOne, update } from './services/Phones';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getAll().then(eventHandler);
  }, []);

  const timeoutTime = 3000;

  const eventHandler = (response) => {
    setPersons(response.data);
  };

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
      id: (persons.length + 1).toString(),
    };

    if (
      persons.find(
        (person) =>
          person.name === nameObject.name && person.number === nameObject.number
      )
    ) {
      alert(`${newName} is already added to phonebook`);
    } else if (
      persons.find(
        (person) =>
          person.name === nameObject.name && person.number !== nameObject.number
      )
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const newPersonObject = persons.find(
          (person) => person.name === nameObject.name
        );
        update(newPersonObject.id, {
          name: newPersonObject.name,
          number: newNumber,
          id: newPersonObject.id,
        })
          .then(() => {
            setMessage(`Updated ${newName}`);
            setTimeout(() => setMessage(null), timeoutTime);
          })
          .then(() => {
            getAll().then(eventHandler);
          })
          .catch((error) => {
            setErrorMessage(error.message);
            setTimeout(() => setErrorMessage(null), timeoutTime);
          });
      }
    } else {
      setPersons(persons.concat(nameObject));
      create(nameObject)
        .then(() => {
          setMessage(`Added ${newName}`);
          setTimeout(() => setMessage(null), timeoutTime);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setTimeout(() => setErrorMessage(null), timeoutTime);
        });
    }
    setNewName('');
  };

  const deletePerson = (personToDelete) => {
    if (
      window.confirm(
        `Do you want to delete ${personToDelete.name} from phonebook ?`
      )
    ) {
      deleteOne(personToDelete.id).then(() => {
        getAll().then(eventHandler);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      {message && <h1 className="success">{message}</h1>}
      {errorMessage && <h1 className="error">{errorMessage} </h1>}
      <Filter filterValue={filterValue} handleFilterInput={handleFilterInput} />

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        addPersonClickHandler={addPerson}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterValue={filterValue}
        handleDelete={deletePerson}
      />
    </div>
  );
};

export default App;
