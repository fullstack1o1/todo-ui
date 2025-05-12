import { useAppDispatch, useAppSelector } from "../../store/hook";
import { List, ListItem, IconButton, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./index.css";
import { useEffect, useState } from "react";
import CreateTag from "../../component/Tag/CreateTag.component";
import { Tag } from "../../myApi";
import { useParams } from "react-router";
import { APIStatus } from "../../store/todo.slice";
import { deleteTag, tags } from "../../store/tag.slice";

const DeleteTag = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const allTags = useAppSelector((state) => state.tagSlice.allTags.data);
  const updateTagStatus = useAppSelector(
    (state) => state.tagSlice.updateTag.status
  );
  const createTagStatus = useAppSelector(
    (state) => state.tagSlice.createTag.status
  );
  const deleteTagStatus = useAppSelector(
    (state) => state.tagSlice.deleteTag.status
  );
  const [open, setOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const handleEditClick = (tag: Tag) => {
    setSelectedTag(tag);
    setOpen(true);
  };
  const handleDeleteClick = (tag: Tag) => {
    console.log("from delete tag", userId);
    console.log("from delete tag", tag.id);
    if (userId) {
      dispatch(deleteTag({ userId, tagId: tag.id }));
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTag(null);
  };
  useEffect(() => {
    if (
      (updateTagStatus === APIStatus.FULLFILLED ||
        createTagStatus === APIStatus.FULLFILLED ||
        deleteTagStatus === APIStatus.FULLFILLED) &&
      userId
    ) {
      dispatch(tags(userId));
    }
  }, [updateTagStatus, createTagStatus, userId, deleteTagStatus]);

  return (
    <div className="delete-tag-container">
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {allTags.map((tag) => (
          <ListItem
            key={tag.id}
            disableGutters
            secondaryAction={
              <div className="actions">
                <IconButton onClick={() => handleEditClick(tag)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(tag)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            }
          >
            <ListItemText primary={tag.name} />
          </ListItem>
        ))}
      </List>
      <CreateTag open={open} onClose={handleClose} tag={selectedTag} />
    </div>
  );
};

export default DeleteTag;
