import { Chip } from "@mui/material";
import { Task, TaskStatus } from "../../myApi";
import "./index.css";

export const Post = ({ task }: { task: Task }) => {
  return (
    <div className="post">
      <p>{task.title}</p>
      <p>{task.description}</p>
      <Chip
        label={task.status}
        variant={task.status === TaskStatus.COMPLETED ? "filled" : "outlined"}
      />
    </div>
  );
};
