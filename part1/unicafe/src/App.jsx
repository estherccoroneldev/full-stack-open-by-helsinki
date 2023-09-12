import React, { useState } from "react";

const Header = ({ title }) => <h1>{title}</h1>;
const Button = ({ handleClick, buttonTitle }) => (
  <button onClick={handleClick}>{buttonTitle}</button>
);

const EmptyStatisticView = () => <p>No feedback given</p>;
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const StatisticsSection = ({
  good,
  neutral,
  bad,
  all,
  averageScore,
  positiveFeedback,
}) => {
  return (
    <section>
      <Header title="Statistic" />

      {all === 0 ? (
        <EmptyStatisticView />
      ) : (
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={all} />
            <StatisticLine text="Average" value={averageScore} />
            <StatisticLine text="Positive" value={`${positiveFeedback}%`} />
          </tbody>
        </table>
      )}
    </section>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [positiveFeedback, setPositive] = useState(0);

  // calculate total
  React.useEffect(() => {
    setAll(good + neutral + bad);
  }, [good, neutral, bad]);

  // calculate the average score
  React.useEffect(() => {
    if (all > 0) {
      setAverageScore((good - bad) / all);
    }
  }, [good, bad, all]);

  // calculate the percentage of positive feedback
  React.useEffect(() => {
    if (all > 0) {
      setPositive((good * 100) / all);
    }
  }, [good, all]);

  return (
    <div>
      <header>
        <Header title="Give Feedback" />
        <Button
          handleClick={() => setGood((previous) => previous + 1)}
          buttonTitle="Good"
        />
        <Button
          handleClick={() => setNeutral((previous) => previous + 1)}
          buttonTitle="Neutral"
        />
        <Button
          handleClick={() => setBad((previous) => previous + 1)}
          buttonTitle="Bad"
        />
      </header>

      <StatisticsSection
        {...{
          all,
          bad,
          good,
          neutral,
          averageScore,
          positiveFeedback,
        }}
      />
    </div>
  );
};

export default App;
