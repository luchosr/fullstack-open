import { useState } from 'react';
import Statistics from './components/Statistics';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h3>Statistics</h3>
      <h4>Good {good}</h4>
      <h4>Neutral {neutral}</h4>
      <h4>Bad {bad}</h4>
      <h4>All: {good + neutral + bad}</h4>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
