import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Chip, IconButton, Menu, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { convertStatusToLabel } from "../../helper";
import { Task, TaskStatus } from "../../myApi";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { deleteTodo } from "../../store/todo.slice";
import "./index.css";
import { tags } from "../../store/tag.slice";
import { useState } from "react";

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

  const handleMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    setTagMenu(e.currentTarget);
    if (userId) {
      dispatch(tags(userId));
    }
  };

  const handleCloseMenu = () => {
    setTagMenu(null);
  };

  const handledeletePost = () => {
    if (userId) dispatch(deleteTodo({ userId: userId, todo: task }));
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
        <Button onClick={handleMenuClick}>Tags</Button>
        <Menu
          anchorEl={tagMenu}
          open={Boolean(tagMenu)}
          onClose={handleCloseMenu}
        >
          {allTags?.length > 0 ? (
            allTags.map((tag: { id: number; name: string }) => (
              <MenuItem key={tag.id} onClick={handleCloseMenu}>
                {tag.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No Tags Available</MenuItem>
          )}
        </Menu>
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
