import * as React from "react";
import { useDispatch } from "react-redux";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import ErrorIcon from "@material-ui/icons/Error";

import { useAppSelector } from "@/store/selectors";

import { thingDefinitionErrorSelector } from "@/services/thing-definitions/selectors";
import { ThingSource } from "@/services/thing-sources/types";
import { thingSourceDelete } from "@/actions/thing-source-delete";

interface ThingSourceListItemProps extends ThingSource {}

const ThingSourceListItem: React.FC<ThingSourceListItemProps> = ({
  id,
  title,
  url,
}) => {
  const dispatch = useDispatch();
  const onDeleteClick = React.useCallback(() => {
    dispatch(thingSourceDelete(id));
  }, [id]);

  const sourceDefinitionError = useAppSelector((state) =>
    thingDefinitionErrorSelector(state, id),
  );

  return (
    <ListItem key={url}>
      {sourceDefinitionError && (
        <ListItemIcon title={sourceDefinitionError}>
          <ErrorIcon />
        </ListItemIcon>
      )}
      <ListItemText primary={title} secondary={url} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default ThingSourceListItem;
