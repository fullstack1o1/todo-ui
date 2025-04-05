import { Chip } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import dayjs from "dayjs";
import { convertStatusToLabel } from "../../helper";
import { Task, TaskStatus } from "../../myApi";
import "./index.css";

export const Post = ({ task }: { task: Task }) => {
  return (
    <div className="post">
      <div className="post-title">
        <AssignmentIcon />
        <h2>{task.title}</h2>
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
