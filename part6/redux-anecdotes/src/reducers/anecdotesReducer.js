import { createSlice, current } from '@reduxjs/toolkit';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addNewAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };

      console.log(current(state));

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    },

    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addNewAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
