import { useSelector, useDispatch } from "react-redux";
import {
  anecdotesReducer,
  initialState,
  voteAnecdote,
} from "./reducers/anecdotesReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
  };

  // const voteAnecdote = (id) => {
  //   store.dispatch({
  //     type: "VOTE_ANECDOTE",
  //     payload: { id },
  //   });
  // };

  // const zero = () => {
  //   store.dispatch({
  //     type: "ZERO",
  //   });
  // };

  const voteThisAnecdote = (id) => {
    dispatch(voteAnecdote(id));
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
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
