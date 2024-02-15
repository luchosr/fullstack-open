import React from 'react';

const PersonForm = ({
  newName,
  newNumber,
  handleNameInput,
  handleNumberInput,
  addPersonClickHandler,
}) => {
  return (
    <form>
      <div>
        name: <input type="string" value={newName} onChange={handleNameInput} />
      </div>
      <div>
        number:{' '}
        <input type="string" value={newNumber} onChange={handleNumberInput} />
      </div>
      <div>
        <button type="submit" onClick={addPersonClickHandler}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
