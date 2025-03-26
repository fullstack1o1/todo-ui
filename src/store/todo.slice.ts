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
    'https://todo-app.whitewater-d0b6f62a.westeurope.azurecontainerapps.io/todo',
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
      .addCase(fetchUserPosts.pending, (state) => {
        state.userPosts.status = APIStatus.PENDING;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.userPosts.status = APIStatus.FAILED;
        state.userPosts.error = 'Some Error Occured';
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts.status = APIStatus.FULLFILLED;
        state.userPosts.data = action.payload;
      });
  },
});

todoSlice.actions = { fetchUserPosts };

export default todoSlice.reducer;
