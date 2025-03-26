import { Box, Button, CircularProgress, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../../component/Post/Post.component';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { APIStatus, fetchUserPosts } from '../../store/todo.slice';
import './index.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const UserPosts = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { userPosts } = useAppSelector((state) => state.todoSlice);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (userId) dispatch(fetchUserPosts(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

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
          <Box sx={style}>dfds</Box>
        </Modal>
      </div>

      {userPosts.status === APIStatus.PENDING ? (
        <CircularProgress />
      ) : (
        <div className='posts'>
          {userPosts.data.length > 0 ? (
            <>
              {' '}
              <div className='btn'>
                <Button variant='contained' onClick={openModal}>
                  Add new
                </Button>
              </div>
              <div className='posts-wrapper'>
                {userPosts.data.map((post) => (
                  <Post task={post} />
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
