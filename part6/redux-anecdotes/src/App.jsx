import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';

import anecdotesService from './services/anecdotes';
import { setAnecdotes } from './reducers/anecdotesReducer';

const App = () => {
  const newNotification = useSelector((state) => state.notification);

  const dispatch = useDispatch();
  useEffect(() => {
    anecdotesService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, []);
  return (
    <div>
      <h2>Anecdotes</h2>
      {newNotification && <Notification />}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
