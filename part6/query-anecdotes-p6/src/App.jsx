import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote } from "./requests";

const App = () => {
  const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  if (result.isLoading || result.isPending) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    console.log("The issue is: ", result.error);
    return <div>Anecdote service is not available due problems in server </div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm onAnecdoteSubmit={addAnecdote} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
