import * as React from "react";
import ListItemText from "@material-ui/core/ListItemText";

import { useAppSelector } from "@/store/selectors";
import { thingDefinitionSelector } from "@/services/thing-definitions/selectors";

import ListItemLink from "@/components/ListItemLink";

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
    <ListItemLink to={`/things/${encodeURIComponent(id)}`} button>
      <ListItemText primary={title ?? "untitled"} secondary={description} />
    </ListItemLink>
  );
};

export default ThingListItem;
