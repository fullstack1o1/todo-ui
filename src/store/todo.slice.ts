import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, Task, TaskRequest, TaskStatus } from "../myApi";

export enum APIStatus {
  PENDING,
  FULLFILLED,
  FAILED,
  IDLE,
}
export interface IApiResponse<T> {
  data: T;
  error?: string;
  status: APIStatus;
}

interface IState {
  userPosts: IApiResponse<Task[]>;
  createTodo: IApiResponse<TaskRequest>;
}

interface CreateTodoArgs {
  userId: string;
  todo: {
    title: string;
    description: string;
    status: TaskStatus;
    date: string;
  };
}

const api = new Api({
  baseUrl:
    "https://todo-app.whitewater-d0b6f62a.westeurope.azurecontainerapps.io/todo",
});

const initialState: IState = {
  userPosts: { data: [], status: APIStatus.IDLE },
  createTodo: { data: { title: "", date: "" }, status: APIStatus.IDLE },
};

export const fetchUserPosts = createAsyncThunk(
  "todoSlice/fetchUserPosts",
  async (userId: string) => {
    const res = await api.userId.tasksDetail(userId);
    return res.data;
  }
);

export const createNewTodo = createAsyncThunk(
  "createTodoSlice/createNewTodo",
  async ({ userId, todo }: CreateTodoArgs) => {
    const res = await api.userId.tasksCreate(userId, todo);
    return res.data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.userPosts.status = APIStatus.PENDING;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.userPosts.status = APIStatus.FAILED;
        state.userPosts.error = "Some Error Occured";
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts.status = APIStatus.FULLFILLED;
        state.userPosts.data = action.payload;
      })
      .addCase(createNewTodo.pending, (state) => {
        state.createTodo.status = APIStatus.PENDING;
      })
      .addCase(createNewTodo.rejected, (state) => {
        state.createTodo.status = APIStatus.FAILED;
      })
      .addCase(createNewTodo.fulfilled, (state, action) => {
        state.createTodo.status = APIStatus.FULLFILLED;
        state.createTodo.data = action.payload;
      });
  },
});

todoSlice.actions = { fetchUserPosts, createNewTodo };

export default todoSlice.reducer;
