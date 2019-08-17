import * as React from "react";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { useThings } from "@/services/homectrl/hooks/useThings";

import ThingGridItem from "./ThingGridItem";

export interface ThingGridProps {}

const styles = (theme: Theme) =>
  createStyles({
    gridItem: {
      width: "200px",
      height: "200px",
      margin: theme.spacing(1)
    }
  });

type Props = ThingGridProps & WithStyles<typeof styles>;

const ThingGrid: React.FC<Props> = ({ classes }) => {
  const things = useThings();

  return (
    <Grid container spacing={8}>
      {things.map((thing, i) => (
        <Grid item key={i} xs={6}>
          <ThingGridItem className={classes.gridItem} thingId={thing.id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(styles)(ThingGrid);
