import { Button, CircularProgress, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateTodo from '../../component/CreateTodo.component';
import { Post } from '../../component/Post/Post.component';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { APIStatus, fetchUserPosts } from '../../store/todo.slice';
import './index.css';

export const UserPosts = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { userPosts } = useAppSelector((state) => state.todoSlice);
  const createTodoStatus = useAppSelector(
    (state) => state.cteateTodo.createTodo.status
  );
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPosts(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (userId && createTodoStatus === APIStatus.FULLFILLED) {
      dispatch(fetchUserPosts(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTodoStatus]);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
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
          <CreateTodo onClose={closeModal} />
        </Modal>
      </div>

      {userPosts.status === APIStatus.PENDING ? (
        <CircularProgress />
      ) : (
        <div className='posts'>
          <div className='user_name'>
            <h1>User{userId}</h1>
          </div>

          {userPosts.data.length > 0 ? (
            <>
              {' '}
              <div className='btn'>
                <Button variant='contained' onClick={openModal}>
                  Add new
                </Button>
              </div>
              <div className='posts-wrapper'>
                {userPosts.data.map((post, index) => (
                  <Post task={post} key={index} />
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
