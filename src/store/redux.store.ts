import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todo.slice";
import { createTodoSlice } from "./createTodo.slice";

export const store = configureStore({
  reducer: {
    todoSlice: todoSlice.reducer,
    cteateTodo: createTodoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
