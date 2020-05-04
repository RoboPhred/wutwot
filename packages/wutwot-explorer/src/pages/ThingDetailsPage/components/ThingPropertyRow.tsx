import * as React from "react";

import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Skeleton from "@material-ui/lab/Skeleton";

import { useAppSelector } from "@/store/selectors";
import { thingDefinitionSelector } from "@/services/thing-definitions/selectors";
import { useThingPropertyValue } from "@/services/thing-properties/hooks/useThingPropertyValue";

export interface ThingPropertyRowProps {
  thingDisplayId: string;
  propertyKey: string;
}

const ThingPropertyRow: React.FC<ThingPropertyRowProps> = ({
  thingDisplayId,
  propertyKey,
}) => {
  const definition = useAppSelector((state) =>
    thingDefinitionSelector(state, thingDisplayId),
  );
  const { value } = useThingPropertyValue(thingDisplayId, propertyKey);

  if (!definition || !definition.properties) {
    return null;
  }

  const property = definition.properties[propertyKey];
  if (!property) {
    return null;
  }

  const { title, description } = property;
  return (
    <TableRow>
      <TableCell>
        <div>{title || propertyKey}</div>
        {description && (
          <Typography component="div" color="textSecondary">
            {description}
          </Typography>
        )}
      </TableCell>
      <TableCell>{value ?? <Skeleton variant="text" />}</TableCell>
    </TableRow>
  );
};

export default ThingPropertyRow;
