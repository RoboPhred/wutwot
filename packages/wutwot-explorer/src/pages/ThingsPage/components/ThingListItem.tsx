import * as React from "react";
import { useSelector } from "react-redux";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { useAppSelector } from "@/store/selectors";
import { thingDefinitionSelector } from "@/services/thing-definitions/selectors";

export interface ThingListItemProps {
  id: string;
}

const ThingListItem: React.FC<ThingListItemProps> = ({ id }) => {
  const definition = useAppSelector((state) =>
    thingDefinitionSelector(state, id),
  );

  if (!definition) {
    return null;
  }

  const { title, description } = definition;

  return (
    <ListItem>
      <ListItemText primary={title} secondary={description} />
    </ListItem>
  );
};

export default ThingListItem;
