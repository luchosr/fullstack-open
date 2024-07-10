import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import anecdotesReducer from './reducers/anecdotesReducer';
import filterReducer from './reducers/filterReducer';

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
