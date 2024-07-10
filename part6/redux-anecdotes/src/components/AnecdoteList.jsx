import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdotesReducer';

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
    .sort(compareVotes)
    .filter((anecdote) => anecdote.content.includes(anecdotesFilter));

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
