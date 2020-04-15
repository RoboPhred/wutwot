import * as React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import { useThing } from "@/services/homectrl/hooks/useThing";
import { getPropertyIdByType } from "@/services/homectrl/utils";

import BooleanPropertySwitch from "@/components/BooleanPropertySwitch";

export interface SwitchesListItemProps {
  thingId: string;
}

const SwitchesListItem: React.FC<SwitchesListItemProps> = ({ thingId }) => {
  const thing = useThing(thingId);
  if (!thing) {
    return null;
  }

  const onOffProperty = getPropertyIdByType(thing, "OnOffProperty");

  return (
    <ListItem>
      <ListItemText>{thing.title}</ListItemText>
      {onOffProperty && (
        <ListItemSecondaryAction>
          <BooleanPropertySwitch thingId={thingId} propertyId={onOffProperty} />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default SwitchesListItem;
