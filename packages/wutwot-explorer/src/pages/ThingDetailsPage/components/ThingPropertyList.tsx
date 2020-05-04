import * as React from "react";
import keys from "lodash/keys";

import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

import { useAppSelector } from "@/store/selectors";
import { thingDefinitionSelector } from "@/services/thing-definitions/selectors";

import ThingPropertyRow from "./ThingPropertyRow";

export interface ThingPropertyListProps {
  thingDisplayId: string;
}

const ThingPropertyList: React.FC<ThingPropertyListProps> = ({
  thingDisplayId,
}) => {
  const definition = useAppSelector((state) =>
    thingDefinitionSelector(state, thingDisplayId),
  );

  if (!definition || !definition.properties) {
    return null;
  }
  const propertyKeys = keys(definition.properties);

  return (
    <div>
      <Typography variant="overline">Properties</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {propertyKeys.map((key) => (
              <ThingPropertyRow
                key={key}
                thingDisplayId={thingDisplayId}
                propertyKey={key}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ThingPropertyList;
