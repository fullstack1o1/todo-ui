/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  CircularProgress,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateTodo from "../../component/CreateTodo/CreateTodo.component";
import { Post } from "../../component/Post/Post.component";
import CreateTag from "../../component/Tag/CreateTag.component";
import { Tag, Task, TaskStatus } from "../../myApi";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getTaskByTag, tags } from "../../store/tag.slice";
import { APIStatus, DateFilter, fetchUserPosts } from "../../store/todo.slice";
import "./index.css";
import TagsMenu from "../../component/TagsMenu.component";

export const UserPosts = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  // const allTags = useAppSelector((state) => state.tagSlice.allTags.data);
  const { userPosts } = useAppSelector((state) => state.todoSlice);
  const { taskByTag } = useAppSelector((state) => state.tagSlice);

  const createTodoStatus = useAppSelector(
    (state) => state.todoSlice.createTodo.status
  );

  const updateTodoStatus = useAppSelector(
    (state) => state.todoSlice.updateTodo.status
  );

  const deleteTodoStatus = useAppSelector(
    (state) => state.todoSlice.deleteTodo.status
  );
  type ModalType = "CREATE_TODO" | "CREATE_TAG" | null;
  const [open, setOpen] = useState<ModalType>(null);
  const [filter, setFilter] = useState<DateFilter>(DateFilter.ALL);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const initialData = {
    description: "",
    title: "",
    date: "",
    status: TaskStatus.PENDING,
    tags: [],
  };

  const [editModalData, setEditModalData] = useState<Task>(initialData);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPosts({ userId }));
      dispatch(tags(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      if (
        createTodoStatus === APIStatus.FULLFILLED ||
        updateTodoStatus === APIStatus.FULLFILLED ||
        deleteTodoStatus === APIStatus.FULLFILLED
      ) {
        dispatch(fetchUserPosts({ userId }));
      }

      if (updateTodoStatus === APIStatus.FULLFILLED) {
        closeModal();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTodoStatus, updateTodoStatus, deleteTodoStatus]);

  const openModal = (type: ModalType) => {
    setOpen(type);
  };
  const closeModal = () => {
    setOpen(null);
    setEditModalData(initialData);
  };

  const openEditModal = (task: Task) => {
    console.log("open edit modal", task);
    setEditModalData(task);
    openModal("CREATE_TODO");
  };

  const handleDateFilterChange = (e: any) => {
    console.log(e);
    setFilter(e.target.value);
    setSelectedTag(null);
    dispatch(fetchUserPosts({ userId: userId!, fil: e.target.value }));
  };
  const handleMenuItemClick = (tag: Tag | null) => {
    setSelectedTag(tag);
    console.log("handle menu item click", tag);
    if (userId) {
      if (tag) {
        dispatch(getTaskByTag({ userId, tagId: tag.id.toString() }));
      } else {
        dispatch(fetchUserPosts({ userId, fil: filter }));
      }
    }
  };
  const postsToShow = selectedTag ? taskByTag.data : userPosts.data;
  return (
    <div className="parent">
      <div>
        <Modal
          open={open === "CREATE_TODO"}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CreateTodo onClose={closeModal} data={editModalData} />
        </Modal>
      </div>
      <CreateTag open={open === "CREATE_TAG"} onClose={closeModal} />
      {userPosts.status === APIStatus.PENDING ? (
        <CircularProgress />
      ) : (
        <div className="posts">
          <div className="user_name">
            <h1>User{userId}</h1>
          </div>
          <div className="btn">
            <TagsMenu handleMenuItemClick={handleMenuItemClick} />
            <Button variant="contained" onClick={() => openModal("CREATE_TAG")}>
              Create Tag
            </Button>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Age"
              onChange={handleDateFilterChange}
              size="small"
            >
              <MenuItem value={DateFilter.ALL}>All</MenuItem>
              <MenuItem value={DateFilter.TODAY_TODO}>Today</MenuItem>
              <MenuItem value={DateFilter.TOMORROW_TODO}>Tomorrow</MenuItem>
              <MenuItem value={DateFilter.LAST_WEEK_TODO}>Last week</MenuItem>
              <MenuItem value={DateFilter.CURRENT_WEEK_TODO}>
                Current week
              </MenuItem>
              <MenuItem value={DateFilter.NEXT_WEEK_TODO}>Next week</MenuItem>
            </Select>

            <Button
              variant="contained"
              onClick={() => openModal("CREATE_TODO")}
            >
              Add new
            </Button>
          </div>
          {postsToShow.length > 0 ? (
            <>
              <div className="posts-wrapper">
                {postsToShow.map((post, index) => (
                  <Post task={post} key={index} openEditModal={openEditModal} />
                ))}
              </div>
            </>
          ) : (
            <p>No Data</p>
          )}
        </div>
      )}
    </div>
  );
};
