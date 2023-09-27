// sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarShow: true, // O estado inicial da visibilidade do sidebar
  sidebarUnfoldable: false, // O estado inicial da capacidade de desdobramento do sidebar
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebarShow: (state, action) => {
      state.sidebarShow = action.payload;
    },
    setSidebarUnfoldable: (state, action) => {
      state.sidebarUnfoldable = action.payload;
    },
  },
});

export const { setSidebarShow, setSidebarUnfoldable } = sidebarSlice.actions;
export default sidebarSlice.reducer;
