import * as React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Skeleton from "@material-ui/lab/Skeleton";
import RefreshIcon from "@material-ui/icons/Refresh";
import ErrorIcon from "@material-ui/icons/Error";
import EditIcon from "@material-ui/icons/Edit";

import { useAppSelector } from "@/store/selectors";
import { thingDefinitionSelector } from "@/services/thing-definitions/selectors";
import { useThingPropertyValue } from "@/services/thing-properties/hooks/useThingPropertyValue";

import DataSchemaEditor from "@/components/DataSchemaEditor";

export interface ThingPropertyRowProps {
  thingDisplayId: string;
  propertyKey: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  errorSpan: {
    paddingLeft: theme.spacing(),
  },
  errorIcon: {
    verticalAlign: "bottom",
  },
}));

const ThingPropertyRow: React.FC<ThingPropertyRowProps> = ({
  thingDisplayId,
  propertyKey,
}) => {
  const classes = useStyles();

  const [isWriteDialogOpen, setWriteDialogOpen] = React.useState(false);
  const onOpenWriteDialog = React.useCallback(() => {
    setWriteDialogOpen(true);
  }, []);
  const onCloseWriteDialog = React.useCallback(() => {
    setWriteDialogOpen(false);
  }, []);

  const definition = useAppSelector((state) =>
    thingDefinitionSelector(state, thingDisplayId),
  );
  const { value, refresh, setValue, errorMessage } = useThingPropertyValue(
    thingDisplayId,
    propertyKey,
  );

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
      <TableCell>
        {valueToNode(value)}
        {errorMessage && (
          <span className={classes.errorSpan} title={errorMessage}>
            <ErrorIcon className={classes.errorIcon} />
          </span>
        )}
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={refresh}>
          <RefreshIcon />
        </IconButton>
        <IconButton onClick={onOpenWriteDialog}>
          <EditIcon />
        </IconButton>
        <Dialog open={isWriteDialogOpen} onClose={onCloseWriteDialog}>
          <DialogTitle>Set Value</DialogTitle>
          <DialogContent>
            <DataSchemaEditor schema={property} onSubmit={setValue} />
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

function valueToNode(value: any): React.ReactNode {
  if (value === undefined) {
    return <Skeleton variant="text" />;
  }
  if (value === null) {
    return <Typography variant="caption">null</Typography>;
  }
  if (typeof value === "object") {
    return <Typography variant="caption">[object]</Typography>;
  }
  return value;
}

export default ThingPropertyRow;
