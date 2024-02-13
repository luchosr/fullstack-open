import { useState } from 'react';
import Statistics from './components/Statistics';
import Button from './components/Button ';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button clickHandler={() => setGood(good + 1)} buttonText={'good'} />
      <Button
        clickHandler={() => setNeutral(neutral + 1)}
        buttonText={'neutral'}
      />
      <Button clickHandler={() => setBad(bad + 1)} buttonText={'bad'} />

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
