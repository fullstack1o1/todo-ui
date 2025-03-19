import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { APIStatus, fetchUserPosts } from '../../store/todo.slice';
import './index.css';

export const UserPosts = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { userPosts } = useAppSelector((state) => state.todoSlice);

  useEffect(() => {
    getData();
  }, [userId]);

  const getData = () => {
    if (userId) dispatch(fetchUserPosts(userId));
  };

  return (
    <>
      POSTTTT {userId}
      {userPosts.status === APIStatus.PENDING && <CircularProgress />}
    </>
  );
};
