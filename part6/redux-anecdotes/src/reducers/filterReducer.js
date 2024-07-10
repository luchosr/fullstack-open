const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload;
    default:
      return state;
  }
};

const anecdotesFilterChange = (payload) => {
  return {
    type: 'SET_FILTER',
    payload,
  };
};

export { filterReducer, anecdotesFilterChange };
