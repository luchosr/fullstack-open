import React from 'react';

const Total = ({ parts }) => {
  return (
    <strong>
      Total of {parts[0].exercises + parts[1].exercises + parts[2].exercises}{' '}
      exercises.
    </strong>
  );
};

export default Total;
