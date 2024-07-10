import { createSlice } from '@reduxjs/toolkit';

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// const anecdotesFilterChange = (payload) => {
//   return {
//     type: 'SET_FILTER',
//     payload,
//   };
// };

// export { filterReducer, anecdotesFilterChange };

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
