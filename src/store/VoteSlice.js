import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  votes: {},
};

const voteSlice = createSlice({
  name: "votes",
  initialState,
  reducers: {
    toggleUpvote: (state, action) => {
      const postId = action.payload;
      const currentVote = state.votes[postId] || 0;
      state.votes[postId] = currentVote === 1 ? 0 : 1;
    },
    toggleDownvote: (state, action) => {
      const postId = action.payload;
      const currentVote = state.votes[postId] || 0;
      state.votes[postId] = currentVote === -1 ? 0 : -1;
    },
  },
});

export const { toggleUpvote, toggleDownvote } = voteSlice.actions;
export default voteSlice.reducer;
