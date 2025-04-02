import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api, TaskRequest, TaskStatus } from '../myApi';
import { APIStatus, IApiResponse } from './todo.slice';

interface CreateTodoArgs {
  userId: string;
  todo: {
    title: string;
    description: string;
    status: TaskStatus;
    date: string;
  };
}

interface Istate {
  createTodo: IApiResponse<TaskRequest>;
}

const api = new Api({
  baseUrl:
    ' https://todo-app.whitewater-d0b6f62a.westeurope.azurecontainerapps.io/todo',
});

const initialState: Istate = {
  createTodo: { data: { title: '', date: '' }, status: APIStatus.IDLE },
};

export const createNewTodo = createAsyncThunk(
  'createTodoSlice/createNewTodo',
  async ({ userId, todo }: CreateTodoArgs) => {
    const res = await api.userId.tasksCreate(userId, todo);
    return res.data;
  }
);

export const createTodoSlice = createSlice({
  name: 'createTodo',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createNewTodo.pending, (state) => {
        state.createTodo.status = APIStatus.PENDING;
      })
      .addCase(createNewTodo.rejected, (state) => {
        state.createTodo.status = APIStatus.FAILED;
      })
      .addCase(createNewTodo.fulfilled, (state) => {
        state.createTodo.status = APIStatus.FULLFILLED;
      });
  },
});

createTodoSlice.actions = { createNewTodo };
export default createTodoSlice.reducer;
