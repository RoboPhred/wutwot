import * as React from "react";
import keys from "lodash/keys";
import { useTranslation } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

import { useAppSelector } from "@/store/selectors";
import { thingDefinitionSelector } from "@/services/thing-definitions/selectors";

import ThingActionRow from "./ThingActionRow";

export interface ThingActionListProps {
  thingDisplayId: string;
}

const ThingActionList: React.FC<ThingActionListProps> = ({
  thingDisplayId,
}) => {
  const { t } = useTranslation();
  const definition = useAppSelector((state) =>
    thingDefinitionSelector(state, thingDisplayId),
  );

  if (!definition || !definition.actions) {
    return null;
  }
  const actionKeys = keys(definition.actions);

  return (
    <div>
      <Typography variant="overline">{t("things.actions.action_plural")}</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {actionKeys.map((key) => (
              <ThingActionRow key={key} thingDisplayId={thingDisplayId} actionKey={key} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ThingActionList;
