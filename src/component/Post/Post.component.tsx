import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Chip, IconButton } from "@mui/material";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { convertStatusToLabel } from "../../helper";
import { Task, TaskStatus } from "../../myApi";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { deleteTodo } from "../../store/todo.slice";
import "./index.css";
import { tags } from "../../store/tag.slice";

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
  //const { allTags } = useAppSelector((state) => state.tagSlice.tags);
  const { userId } = useParams();

  const handledeletePost = () => {
    if (userId) dispatch(deleteTodo({ userId: userId, todo: task }));
  };
  const handleShowTags = () => {
    if (userId) {
      dispatch(tags(userId));
    } else {
      console.error("userId is undefined. Cannot fetch tags.");
    }
  };

  return (
    <div className="post">
      <div className="post-title">
        <AssignmentIcon />
        <h2>{task.title}</h2>

        <IconButton onClick={openAndPopulateModal}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handledeletePost}>
          <DeleteIcon />
        </IconButton>
        <Button onClick={handleShowTags}>Tags</Button>
      </div>
      <p className="post-description">{task.description}</p>

      <div className="post-date">
        <CalendarMonthIcon />
        <p>{dayjs(task.date).format("D MMM YY")}</p>
      </div>
      <Chip
        label={convertStatusToLabel(task.status!)}
        variant="filled"
        sx={{
          backgroundColor:
            task.status === TaskStatus.COMPLETED
              ? "#c8e6c9"
              : task.status === TaskStatus.IN_PROGRESS
                ? "#bbdefb"
                : "#ffe0b2",
          color: "#000000",
        }}
      />
    </div>
  );
};
