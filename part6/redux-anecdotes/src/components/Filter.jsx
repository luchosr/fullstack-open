import React, { useState } from 'react';

const Filter = () => {
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter <input onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
