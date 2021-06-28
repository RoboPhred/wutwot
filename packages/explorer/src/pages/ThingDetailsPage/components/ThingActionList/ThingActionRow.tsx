import * as React from "react";
import { useTranslation } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useAppSelector } from "@/store/selectors";
import { thingDefinitionSelector } from "@/services/thing-definitions/selectors";
import { useThingAction } from "@/services/thing-actions/hooks/useThingAction";

import DataSchemaEditor from "@/components/DataSchemaEditor";

export interface ThingActionRowProps {
  thingDisplayId: string;
  actionKey: string;
}

const ThingActionRow: React.FC<ThingActionRowProps> = ({
  thingDisplayId,
  actionKey,
}) => {
  const { t } = useTranslation();

  const definition = useAppSelector((state) =>
    thingDefinitionSelector(state, thingDisplayId),
  );

  const action =
    definition && definition.actions && definition.actions[actionKey];

  const requiresInput = Object.keys(action?.input ?? {}).length > 0;

  const [isExecuteDialogOpen, setExecuteDialogOpen] = React.useState(false);
  const [hasValidInput, setHasValidInput] = React.useState(
    requiresInput ? false : true,
  );
  const [input, setInput] = React.useState<any>(null);

  const onOpenExecuteDialog = React.useCallback(() => {
    setExecuteDialogOpen(true);
  }, []);
  const onCloseExecuteDialog = React.useCallback(() => {
    setExecuteDialogOpen(false);
  }, []);

  const {
    invokeAction,
    isInvoking,
    lastInvocationResult,
    lastInvocationErrorMessage,
  } = useThingAction(thingDisplayId, actionKey);

  const onExecute = React.useCallback(() => {
    if (hasValidInput) {
      invokeAction(input);
    }
  }, [invokeAction, hasValidInput, input]);

  if (!action) {
    return null;
  }

  const { title, description } = action;
  return (
    <TableRow>
      <TableCell>
        <div>{title || actionKey}</div>
        {description && (
          <Typography component="div" color="textSecondary">
            {description}
          </Typography>
        )}
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={onOpenExecuteDialog}>
          <EditIcon />
        </IconButton>
        <Dialog open={isExecuteDialogOpen} onClose={onCloseExecuteDialog}>
          <DialogTitle>{t("things.actions.invocation.invoke")}</DialogTitle>
          <DialogContent>
            {requiresInput && (
              <div>
                <Typography variant="overline">
                  {t("things.actions.invocation.input")}
                </Typography>
                <DataSchemaEditor
                  schema={action.input!}
                  onFormDataChanged={setInput}
                  onValidChanged={setHasValidInput}
                >
                  <Button
                    disabled={!hasValidInput || isInvoking}
                    onClick={onExecute}
                  >
                    {t("things.actions.invocation.execute")}
                  </Button>
                </DataSchemaEditor>
              </div>
            )}
            {!requiresInput && (
              <Button
                disabled={!hasValidInput || isInvoking}
                onClick={onExecute}
              >
                {t("things.actions.invocation.execute")}
              </Button>
            )}
            {isInvoking && <CircularProgress />}
            {lastInvocationResult !== undefined && (
              <div>
                <Typography component="div" variant="overline">
                  {t("things.actions.invocation.last_result")}
                </Typography>
                <Typography component="code" color="textSecondary">
                  <pre>{JSON.stringify(lastInvocationResult, null, 2)}</pre>
                </Typography>
              </div>
            )}
            {lastInvocationErrorMessage && (
              <div>
                <Typography component="div" variant="overline">
                  {t("things.actions.invocation.last_error")}
                </Typography>
                <Typography component="code" color="textSecondary">
                  {lastInvocationErrorMessage}
                </Typography>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default ThingActionRow;
