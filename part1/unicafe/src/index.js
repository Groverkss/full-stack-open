import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ text, num }) => {
  return (
    <p>
      {text} {num}
    </p>
  ); 
};

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <>
      <h1>Statistics</h1>
      <p>
        No feedback given
      </p>
      </>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <Statistic
        text={"good"}
        num={good}
      />
      <Statistic
        text={"neutral"}
        num={neutral}
      />
      <Statistic
        text={"bad"}
        num={bad}
      />
      <Statistic
        text={"average"}
        num={(good + bad) / (good + bad + neutral)}
      />
      <Statistic
        text={"positive"}
        num={good / (good + bad + neutral)}
      />
    </div>
  );
};

const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNetural ] = useState(0);
  const [ bad, setBad ] = useState(0);

  const incGood = () => setGood(good + 1);
  const incNeutral = () => setNetural(neutral + 1);
  const incBad = () => setBad(bad + 1);

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
        <Button
          text={"good"}
          handleClick={incGood}
        />
        <Button
          text={"neutral"}
          handleClick={incNeutral}
        />
        <Button
          text={"bad"}
          handleClick={incBad}
        />
      </div>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
