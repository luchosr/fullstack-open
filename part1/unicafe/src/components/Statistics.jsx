import React from 'react';

const Statistics = ({ good, bad, neutral }) => {
  return (
    <>
      <h4>Average {(good - bad) / (good + neutral + bad) || 0}</h4>
      <h4>Positive: {good / (good + neutral + bad) || 0} %</h4>
    </>
  );
};

export default Statistics;
