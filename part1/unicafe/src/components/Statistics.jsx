import StatisticLine from './StatisticLine';

const Statistics = ({ good, bad, neutral }) => {
  return (
    <>
      <h2>Statistics</h2>
      {good + bad + neutral === 0 ? (
        <h3>No feedback given</h3>
      ) : (
        <div>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="All" value={good + neutral + bad} />
          <StatisticLine
            text="Average"
            value={(good - bad) / (good + neutral + bad) || 0}
          />
          <StatisticLine
            text="Positive %:"
            value={good / (good + neutral + bad) || 0}
          />
        </div>
      )}
    </>
  );
};

export default Statistics;
