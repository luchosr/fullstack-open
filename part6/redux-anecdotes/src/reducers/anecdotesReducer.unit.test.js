import deepFreeze from "deep-freeze";
import {
  anecdotesReducer,
  initialState,
  voteAnecdote,
} from "./anecdotesReducer";

describe("Anecdotes reducer", () => {
  test("should return a proper initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = anecdotesReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });
});
