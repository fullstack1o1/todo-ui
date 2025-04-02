import { Chip } from "@mui/material";
import { Task, TaskStatus } from "../../myApi";
import "./index.css";

export const Post = ({ task }: { task: Task }) => {
  return (
    <div className="post">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <Chip
        className="mui_chip"
        label={task.status}
        variant={task.status === TaskStatus.COMPLETED ? "filled" : "outlined"}
      />
    </div>
  );
};
