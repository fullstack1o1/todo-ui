import { Chip } from '@mui/material';
import dayjs from 'dayjs';
import { convertStatusToLabel } from '../../helper';
import { Task, TaskStatus } from '../../myApi';
import './index.css';

export const Post = ({ task }: { task: Task }) => {
  return (
    <div className='post'>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <Chip
        className='mui_chip'
        label={convertStatusToLabel(task.status!)}
        variant={task.status === TaskStatus.COMPLETED ? 'filled' : 'outlined'}
      />
      <p>{dayjs(task.date).format('MMM DD')}</p>
    </div>
  );
};
