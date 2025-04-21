import { tagSlice } from "./tag.slice";
import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todo.slice";

export const store = configureStore({
  reducer: {
    todoSlice: todoSlice.reducer,
    tagSlice: tagSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
