// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Function to get the initial theme from localStorage or default to light
const getInitTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme ? savedTheme : "light";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: getInitTheme(), // Default mode is light
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const selectTheme = (state) => state.theme.mode;

export default themeSlice.reducer;
