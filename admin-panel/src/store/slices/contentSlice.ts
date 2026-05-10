import { createSlice } from '@reduxjs/toolkit';

interface ContentState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  items: [],
  loading: false,
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
});

export default contentSlice.reducer;
