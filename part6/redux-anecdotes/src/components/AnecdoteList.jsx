import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAnecdote, voteAnecdote } from '../reducers/anecdotesReducer';
// import { voteAnecdote } from '../reducers/anecdotesReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const compareVotes = (a, b) => {
    if (a.votes > b.votes) {
      return -1;
    }
    if (a.votes < b.votes) {
      return 1;
    }
    return 0;
  };
  const anecdotesFilter = useSelector((state) => state.filter);

  const anecdotes = useSelector((state) => state.anecdotes)
    .slice() //as the state is inmutable you will need to make a copy to order it with .slice()
    .sort(compareVotes)
    .filter((anecdote) => anecdote.content.includes(anecdotesFilter));

  console.log(
    'el state es:',
    useSelector((state) => state.anecdotes)
  );
  const voteThisAnecdote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteThisAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
