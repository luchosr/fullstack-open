import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote, addNewAnecdote } from "./reducers/anecdotesReducer";

const App = () => {
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

  const anecdotes = useSelector((state) => state).sort(compareVotes);

  const voteThisAnecdote = (id) => {
    dispatch(voteAnecdote(id));
  };

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(addNewAnecdote(content));
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteThisAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
