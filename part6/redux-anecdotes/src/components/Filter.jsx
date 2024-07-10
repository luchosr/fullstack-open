import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { anecdotesFilterChange } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    dispatch(anecdotesFilterChange(event.target.value.toLowerCase()));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <form style={style}>
      Filter <input onChange={handleFilterChange} />
    </form>
  );
};

export default Filter;
