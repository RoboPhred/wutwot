import * as React from "react";
import { useDispatch } from "react-redux";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { ThingSource } from "@/services/thing-sources/types";
import { thingSourceDelete } from "@/actions/thing-source-delete";

interface ThingSourceListItemProps extends ThingSource {}

const ThingSourceListItem: React.FC<ThingSourceListItemProps> = ({
  name,
  url,
}) => {
  const dispatch = useDispatch();
  const onDeleteClick = React.useCallback(() => {
    dispatch(thingSourceDelete(url));
  }, [url]);

  return (
    <ListItem key={url}>
      <ListItemText primary={name} secondary={url} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default ThingSourceListItem;
