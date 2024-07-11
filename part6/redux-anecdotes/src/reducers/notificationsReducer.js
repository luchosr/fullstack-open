import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationsSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    sendNotification(state, action) {
      return action.payload;
    },

    clearNotification(state, action) {
      return initialState;
    },
  },
});

export const { sendNotification, clearNotification } =
  notificationsSlice.actions;

export const setNotification = (anecdote, delayInSeconds) => {
  return async (dispatch) => {
    await dispatch(sendNotification(`You voted ${anecdote.content}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, delayInSeconds * 1000);
  };
};

export default notificationsSlice.reducer;
