import React from 'react';

const Persons = ({ persons, filterValue }) => {
  return (
    <>
      {persons.map(
        (person) =>
          person.name.includes(filterValue) && (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          )
      )}
    </>
  );
};

export default Persons;
