import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  theme: 'dark' | 'light';
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: 'dark',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleSidebar, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
