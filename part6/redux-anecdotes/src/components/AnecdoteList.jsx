import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdotesReducer';
import {
  sendNotification,
  clearNotification,
} from '../reducers/notificationsReducer';

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

  const anecdotes = [...useSelector((state) => state.anecdotes)]
    //as the state is inmutable you will need to make a copy to sort it with [... ] or .slice()
    .sort(compareVotes)
    .filter((anecdote) => anecdote.content.includes(anecdotesFilter));

  const voteThisAnecdote = async (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(sendNotification(`You voted ${content}`));

    setTimeout(() => {
      dispatch(clearNotification());
    }, '2000');
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => voteThisAnecdote(anecdote.id, anecdote.content)}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
