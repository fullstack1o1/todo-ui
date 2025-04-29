import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, Tag, Task } from "../myApi";
import { APIStatus, IApiResponse } from "./todo.slice";

interface Istate {
  createTag: IApiResponse<Tag>;
  allTags: IApiResponse<Tag[]>;
  taskByTag: IApiResponse<Task[]>;
}
interface CreateTagArgs {
  tagName: string;
  userId: string;
}

const initialState: Istate = {
  allTags: {
    data: [],
    status: APIStatus.IDLE,
  },
  createTag: {
    data: { name: "", id: 0 },
    status: APIStatus.IDLE,
  },
  taskByTag: {
    data: [],
    status: APIStatus.IDLE,
  },
};

const api = new Api({
  baseUrl:
    " https://todo-app.whitewater-d0b6f62a.westeurope.azurecontainerapps.io/todo",
});

export const tags = createAsyncThunk(
  "tagSlice/getAllTag",
  async (userId: string) => {
    const res = await api.userId.tagsDetail(userId);
    console.log("fetch tags", res.data);
    return res.data;
  }
);

export const createNewTag = createAsyncThunk(
  "tagSlice/createNewTag",
  async ({ userId, tagName }: CreateTagArgs) => {
    const res = await api.userId.tagsCreate(userId, { name: tagName });
    return res.data;
  }
);

export const getTaskByTag = createAsyncThunk(
  "tagSlice/taskByTag",
  async ({ userId, tagId }: { userId: string; tagId: string }) => {
    const res = await api.userId.tasksDetail3(Number(userId), Number(tagId));
    console.log("Fetched tasks by tag:", res.data);
    return res.data;
  }
);

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createNewTag.pending, (state) => {
        state.createTag.status = APIStatus.PENDING;
      })
      .addCase(createNewTag.rejected, (state) => {
        state.createTag.status = APIStatus.FAILED;
      })
      .addCase(createNewTag.fulfilled, (state, action) => {
        state.createTag.status = APIStatus.FULLFILLED;
        state.createTag.data = action.payload;
      })
      .addCase(tags.pending, (state) => {
        state.allTags.status = APIStatus.PENDING;
      })
      .addCase(tags.rejected, (state) => {
        state.allTags.status = APIStatus.FAILED;
      })
      .addCase(tags.fulfilled, (state, action) => {
        state.allTags.status = APIStatus.FULLFILLED;
        state.allTags.data = action.payload;
      })
      .addCase(getTaskByTag.pending, (state) => {
        state.taskByTag.status = APIStatus.PENDING;
      })
      .addCase(getTaskByTag.rejected, (state) => {
        state.taskByTag.status = APIStatus.FAILED;
      })
      .addCase(getTaskByTag.fulfilled, (state, action) => {
        state.taskByTag.status = APIStatus.FULLFILLED;
        state.taskByTag.data = action.payload;
      });
  },
});

tagSlice.actions = { createNewTag, tags, getTaskByTag };
export default tagSlice.reducer;
