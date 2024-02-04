import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.searchValue = action.payload.searchValue;
    },
  },
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
