import { configureStore } from "@reduxjs/toolkit";
import voteReducer from "./VoteSlice";
import searchReducer from "./SearchSlice";

const store = configureStore({
  reducer: {
    votes: voteReducer,
    search: searchReducer,
  },
});

export default store;
