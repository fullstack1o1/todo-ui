import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, Task, TaskUpdate } from "../myApi";

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
  createTodo: IApiResponse<Task>;
  updateTodo: IApiResponse<Task>;
  deleteTodo: IApiResponse<null>;
}

interface CreateTodoArgs {
  userId: string;
  todo: Task;
}

const api = new Api({
  baseUrl:
    "https://todo-app.whitewater-d0b6f62a.westeurope.azurecontainerapps.io/todo",
});

const initialState: IState = {
  userPosts: { data: [], status: APIStatus.IDLE },
  createTodo: {
    data: {
      title: "",
      tags: [],
      date: "",
    },
    status: APIStatus.IDLE,
  },
  updateTodo: {
    data: { title: "", tags: [], date: "" },
    status: APIStatus.IDLE,
  },
  deleteTodo: { data: null, status: APIStatus.IDLE },
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

export const updateTodo = createAsyncThunk(
  "createTodoSlice/updateTodo",
  async ({ userId, todo }: CreateTodoArgs) => {
    const updatedData: TaskUpdate = { ...todo, taskId: todo.taskId! };
    const res = await api.userId.tasksUpdate(todo.taskId!, userId, updatedData);
    return res.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "deleteTodoSlice/deleteTodo",
  async ({ userId, todo }: CreateTodoArgs) => {
    await api.userId.tasksDelete(todo.taskId!, userId);
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
      })
      //update
      .addCase(updateTodo.pending, (state) => {
        state.updateTodo.status = APIStatus.PENDING;
      })
      .addCase(updateTodo.rejected, (state) => {
        state.updateTodo.status = APIStatus.FAILED;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.updateTodo.status = APIStatus.FULLFILLED;
        state.updateTodo.data = action.payload;
      })
      //delete
      .addCase(deleteTodo.pending, (state) => {
        state.deleteTodo.status = APIStatus.PENDING;
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.deleteTodo.status = APIStatus.FAILED;
      })
      .addCase(deleteTodo.fulfilled, (state) => {
        state.deleteTodo.status = APIStatus.FULLFILLED;
      });
  },
});

todoSlice.actions = { fetchUserPosts, createNewTodo, updateTodo };

export default todoSlice.reducer;
