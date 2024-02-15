import React from 'react';

const Filter = ({ filterValue, handleFilterInput }) => {
  return (
    <h3>
      Filter shown with{' '}
      <input value={filterValue} onChange={handleFilterInput} />
    </h3>
  );
};

export default Filter;
