import { useState } from "react";

const getRandomInteger = (maxLimit) => Math.floor(Math.random() * maxLimit)
const getMaxElement = (elements) => [...(elements ?? [])].sort((a, b) => a - b).reverse()[0]
const getIndexofMaxElement = (items, value) => [...(items ?? [])].findIndex((item) => item === value)

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const pointsReceived = new Array(anecdotes.length).fill(0);
  const [selectedAnecdote, setSelectedAnecdote] = useState(0);
  const [votes, setVotes] = useState(pointsReceived);

  const handleNextAnecdote = () => {
    const randomNumber = getRandomInteger(anecdotes.length);
    setSelectedAnecdote(randomNumber);
  };

  const handleVote = (selectedAnecdote) => () => {
    const newVotes = [...votes];
    newVotes[selectedAnecdote] += 1;
    setVotes(newVotes);
  };

  const maxVote = getMaxElement(votes);
  const indexMaxVote = getIndexofMaxElement(votes, maxVote);
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selectedAnecdote]}</p>
      <p>has {votes[selectedAnecdote]} votes</p>

      <div>
        <button onClick={handleVote(selectedAnecdote)}>Vote</button>
        <button onClick={handleNextAnecdote}>Next Anecdote</button>
      </div>

      <h1>Anecdote of most votes</h1>
      <p>{anecdotes[indexMaxVote]}</p>
      <p>has {maxVote} votes</p>
    </div>
  );
};

export default App;
