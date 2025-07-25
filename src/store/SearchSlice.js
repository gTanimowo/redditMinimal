import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      const { term } = action.payload;
      state.search = term;
    },
  },
});

export const { setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
