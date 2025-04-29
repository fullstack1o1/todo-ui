import NewLabelIcon from "@mui/icons-material/NewLabel";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Tag } from "../myApi";
import { useAppSelector } from "../store/hook";

interface Props {
  handleMenuItemClick: (tag: Tag) => void;
}

const TagsMenu = ({ handleMenuItemClick }: Props) => {
  const allTags = useAppSelector((state) => state.tagSlice.allTags.data);

  const [tagMenu, setTagMenu] = useState<null | HTMLElement>(null);
  const handleMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    setTagMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setTagMenu(null);
  };

  return (
    <div>
      <IconButton onClick={handleMenuClick} size="small">
        <NewLabelIcon />
      </IconButton>
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
  );
};

export default TagsMenu;
