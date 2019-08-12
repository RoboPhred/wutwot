import * as React from "react";
import classnames from "classnames";

import { StyleProps } from "@/types";

import { createStyles, withStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ThingDataSource from "@/services/homectrl/components/ThingDataSource";
import Typography from "@material-ui/core/Typography";

export interface ThingItemProps {
  className?: string;
  thingId: string;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: theme.spacing(12)
    }
  });

// TODO: on/off button at far right
// TODO dimmer slider on left
// TODO color picker in center
type Props = ThingItemProps & StyleProps<typeof styles>;
const ThingItem: React.FC<Props> = ({ thingId, className, classes }) => (
  <ThingDataSource thingId={thingId}>
    {({ thing }) => (
      <>
        {thing && (
          <Paper className={classnames(className, classes.root)}>
            <Typography variant="h5" component="h3">
              {thing.title}
            </Typography>
          </Paper>
        )}
      </>
    )}
  </ThingDataSource>
);

export default withStyles(styles)(ThingItem);
