/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  CircularProgress,
  MenuItem,
  Modal,
  Select,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateTodo from '../../component/CreateTodo.component';
import { Post } from '../../component/Post/Post.component';
import { Task, TaskStatus } from '../../myApi';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { APIStatus, DateFilter, fetchUserPosts } from '../../store/todo.slice';
import './index.css';

export const UserPosts = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { userPosts } = useAppSelector((state) => state.todoSlice);

  const createTodoStatus = useAppSelector(
    (state) => state.todoSlice.createTodo.status
  );

  const updateTodoStatus = useAppSelector(
    (state) => state.todoSlice.updateTodo.status
  );

  const deleteTodoStatus = useAppSelector(
    (state) => state.todoSlice.deleteTodo.status
  );

  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<DateFilter>(DateFilter.ALL);
  const initialData = {
    description: '',
    title: '',
    date: '',
    status: TaskStatus.PENDING,
    tags: [],
  };

  const [editModalData, setEditModalData] = useState<Task>(initialData);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPosts({ userId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setEditModalData(initialData);
  };

  const openEditModal = (task: Task) => {
    console.log('open edit modal', task);
    setEditModalData(task);
    openModal();
  };

  const handleDateFilterChange = (e: any) => {
    console.log(e);
    setFilter(e.target.value);
    dispatch(fetchUserPosts({ userId: userId!, fil: e.target.value }));
  };

  return (
    <div className='parent'>
      <div>
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <CreateTodo onClose={closeModal} data={editModalData} />
        </Modal>
      </div>

      {userPosts.status === APIStatus.PENDING ? (
        <CircularProgress />
      ) : (
        <div className='posts'>
          <div className='user_name'>
            <h1>User{userId}</h1>
          </div>
          <div className='btn'>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={filter}
              label='Age'
              onChange={handleDateFilterChange}
              size='small'
            >
              <MenuItem value={DateFilter.ALL}>All</MenuItem>
              <MenuItem value={DateFilter.TODAY_TODO}>Today</MenuItem>
              <MenuItem value={DateFilter.TOMORROW_TODO}>Tomorrow</MenuItem>
              <MenuItem value={DateFilter.LAST_WEEK_TODO}>Last week</MenuItem>
              <MenuItem value={DateFilter.CURRENT_WEEK_TODO}>
                Current week
              </MenuItem>
            </Select>

            <Button variant='contained' onClick={openModal}>
              Add new
            </Button>
          </div>
          {userPosts.data.length > 0 ? (
            <>
              <div className='posts-wrapper'>
                {userPosts.data.map((post, index) => (
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
