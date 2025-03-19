import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api, Task } from '../myApi';

export enum APIStatus {
  PENDING,
  FULLFILLED,
  FAILED,
  IDLE,
}
interface IApiResponse<T> {
  data: T;
  error?: string;
  status: APIStatus;
}

interface IState {
  userPosts: IApiResponse<Task[]>;
}

const api = new Api({
  baseUrl:
    'https://todo-app.proudforest-fddd498f.westeurope.azurecontainerapps.io/todo',
});

const initialState: IState = {
  userPosts: { data: [], status: APIStatus.IDLE },
};

export const fetchUserPosts = createAsyncThunk(
  'todoSlice/fetchUserPosts',
  async (userId: string) => {
    const res = await api.userId.tasksDetail(userId);
    return res.data;
  }
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserPosts.pending, (state, action) => {
        state.userPosts.status = APIStatus.PENDING;
      })
      .addCase(fetchUserPosts.rejected, () => {})
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts.status = APIStatus.FULLFILLED;
      });
  },
});

todoSlice.actions = { fetchUserPosts };

export default todoSlice.reducer;
