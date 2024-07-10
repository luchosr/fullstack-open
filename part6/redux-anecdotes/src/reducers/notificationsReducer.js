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

export const { sendNotification, clearNotification } = filterSlice.actions;
export default notificationsSlice.reducer;
