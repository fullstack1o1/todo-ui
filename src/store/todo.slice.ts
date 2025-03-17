import { createSlice } from '@reduxjs/toolkit';

interface IState {
  name: string;
}
const initialState: IState = { name: 'a' };

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
});

export default todoSlice.reducer;
