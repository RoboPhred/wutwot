import * as React from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { Thing } from "@/services/homectrl/types";

import ThingGridItem from "../ThingGridItem";

export interface ThingGridProps {
  things: Thing[];
  onRefreshThings(): void;
}

const styles = createStyles({
  gridItem: {
    width: "200px",
    height: "200px"
  }
});

type Props = ThingGridProps & WithStyles<typeof styles>;

const ThingGrid: React.FC<Props> = ({ things, onRefreshThings, classes }) => {
  React.useEffect(() => {
    onRefreshThings();
  }, []);

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
