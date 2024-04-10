const Persons = ({ persons, filterValue, handleDelete }) => {
  return (
    <>
      {persons.map(
        (person) =>
          person.name.includes(filterValue) && (
            <div key={person.id}>
              <p>
                {person.name} {person.number}
              </p>
              <button onClick={() => handleDelete(person)}>Delete</button>
            </div>
          )
      )}
    </>
  )
}

export default Persons
