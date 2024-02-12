const Statistics = ({ good, bad, neutral }) => {
  return (
    <>
      <h2>Statistics</h2>
      {good + bad + neutral === 0 ? (
        <h3>No feedback given</h3>
      ) : (
        <div>
          <h4>Good {good}</h4>
          <h4>Neutral {neutral}</h4>
          <h4>Bad {bad}</h4>
          <h4>All: {good + neutral + bad}</h4>
          <h4>Average {(good - bad) / (good + neutral + bad) || 0}</h4>
          <h4>Positive: {good / (good + neutral + bad) || 0} %</h4>
        </div>
      )}
    </>
  );
};

export default Statistics;
