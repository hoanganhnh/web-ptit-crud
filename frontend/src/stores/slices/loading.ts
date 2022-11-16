import { createSlice } from "@reduxjs/toolkit";

const loadingSplice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    toggleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleLoading } = loadingSplice.actions;
const loadingReducer = loadingSplice.reducer;
export default loadingReducer;
