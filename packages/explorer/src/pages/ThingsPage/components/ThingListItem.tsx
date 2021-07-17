import * as React from "react";
import { WutWotTDIRIs } from "@wutwot/wutwot-td";
import isEmpty from "lodash/isEmpty";
import ListItemText from "@material-ui/core/ListItemText";

import { ThingDetailsPagePath } from "@/paths";

import { useAppSelector } from "@/store/selectors";

import { thingDefinitionSelector } from "@/services/thing-definitions/selectors";
import { useThingPropertyValue } from "@/services/thing-properties/hooks/useThingPropertyValue";

import ListItemLink from "@/components/ListItemLink";

export interface ThingListItemProps {
  id: string;
}

const ThingListItem: React.FC<ThingListItemProps> = ({ id }) => {
  const definition = useAppSelector((state) =>
    thingDefinitionSelector(state, id),
  );

  let { value: titlePropertyValue } = useThingPropertyValue(id, {
    semanticTypes: WutWotTDIRIs.TitleProperty,
  });
  if (isEmpty(titlePropertyValue)) {
    titlePropertyValue = null;
  }

  if (!definition) {
    return null;
  }

  const { title, description } = definition;

  return (
    <ListItemLink to={ThingDetailsPagePath.fromDisplayId(id)} button>
      <ListItemText
        primary={titlePropertyValue ?? title ?? "untitled"}
        secondary={description}
      />
    </ListItemLink>
  );
};

export default ThingListItem;
