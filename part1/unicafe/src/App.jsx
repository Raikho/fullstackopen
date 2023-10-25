import { useState } from "react"

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({ text, value }) => <div>{text} {value}</div>

const Statistics = ({ good, neutral, bad }) => {
  if (good == 0 && neutral == 0 && bad == 0) 
    return <div>No feedback given</div>;
  return (
    <>
      <StatisticLine text='all' value={good + neutral + bad} />
      <StatisticLine text='average' value={(good - bad) / (good + neutral + bad)} />
      <StatisticLine text='positive' value={good / (good + neutral + bad) * 100} />
    </>
  )
}

const  App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)}/>
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={() => setBad(bad + 1)}/>

      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
