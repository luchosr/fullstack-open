import { createSlice, current } from '@reduxjs/toolkit';
const initialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    anecdotesFilterChange(state, action) {
      return action.payload;
    },
  },
});

export const { anecdotesFilterChange } = filterSlice.actions;
export default filterSlice.reducer;
