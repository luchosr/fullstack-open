import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import anecdotesReducer, { appendAnecdote } from './reducers/anecdotesReducer';
import filterReducer from './reducers/filterReducer';
import notificationsReducer from './reducers/notificationsReducer';
import anecdotesService from './services/anecdotes';

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notification: notificationsReducer,
  },
});

anecdotesService.getAll().then((anecdotes) =>
  anecdotes.forEach((anecdote) => {
    store.dispatch(appendAnecdote(anecdote));
  })
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
