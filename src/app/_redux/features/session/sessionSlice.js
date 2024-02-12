import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
    clearSession: (state) => {
      state.session = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
