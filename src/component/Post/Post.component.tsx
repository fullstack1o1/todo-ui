import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { convertStatusToLabel } from '../../helper';
import { Tag, Task, TaskStatus } from '../../myApi';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { deleteTodo, updateTodo } from '../../store/todo.slice';
import './index.css';

export const Post = ({
  task,
  openEditModal,
}: {
  task: Task;
  openEditModal: (task: Task) => void;
}) => {
  const openAndPopulateModal = () => {
    openEditModal(task);
  };
  const dispatch = useAppDispatch();
  const allTags = useAppSelector((state) => state.tagSlice.allTags.data);
  const { userId } = useParams();
  const [tagMenu, setTagMenu] = useState<null | HTMLElement>(null);
  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  const handleMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    setTagMenu(e.currentTarget);
  };

  useEffect(() => {
    const tagsMapping: string[] = [];
    task.tags.forEach((tag) => {
      allTags.forEach((t) => {
        if (t.id == tag.tagId) {
          tagsMapping.push(t.name);
        }
      });
    });
    setSelectedTag(tagsMapping);
  }, []);

  const handleCloseMenu = () => {
    setTagMenu(null);
  };
  const handleMenuItemClick = (tag: Tag) => {
    if (userId) {
      dispatch(
        updateTodo({
          userId,
          todo: {
            ...task,
            tags: [
              ...task.tags,
              {
                tagId: tag.id,
              },
            ],
          },
        })
      );
    }
    handleCloseMenu();
  };

  const handledeletePost = () => {
    if (userId) dispatch(deleteTodo({ userId: userId, todo: task }));
  };

  return (
    <div className='post'>
      <div className='post-title'>
        <AssignmentIcon />
        <h2>{task.title}</h2>

        <IconButton onClick={openAndPopulateModal}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handledeletePost}>
          <DeleteIcon />
        </IconButton>
        <Button onClick={handleMenuClick}>Tags</Button>
        <Menu
          anchorEl={tagMenu}
          open={Boolean(tagMenu)}
          onClose={handleCloseMenu}
        >
          {allTags?.length > 0 ? (
            allTags.map((tag: { id: number; name: string }) => (
              <MenuItem key={tag.id} onClick={() => handleMenuItemClick(tag)}>
                {tag.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No Tags Available</MenuItem>
          )}
        </Menu>
      </div>
      <p className='post-description'>{task.description}</p>

      <div className='post-date'>
        <CalendarMonthIcon />
        <p>{dayjs(task.date).format('D MMM YY')}</p>
      </div>
      <Chip
        label={convertStatusToLabel(task.status!)}
        variant='filled'
        sx={{
          backgroundColor:
            task.status === TaskStatus.COMPLETED
              ? '#c8e6c9'
              : task.status === TaskStatus.IN_PROGRESS
                ? '#bbdefb'
                : '#ffe0b2',
          color: '#000000',
        }}
      />
      <div>{selectedTag}</div>
    </div>
  );
};
