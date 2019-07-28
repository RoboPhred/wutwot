import * as React from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import ThingsDataSource from "@/services/homectrl/components/ThingsDataSource";

import ThingGridItem from "./components/ThingGridItem";

export interface ThingGridProps {
  className?: string;
}

const styles = createStyles({
  gridItem: {
    width: "200px",
    height: "200px"
  }
});

type Props = ThingGridProps & StyleProps<typeof styles>;
const ThingsPage: React.SFC<Props> = ({ className, classes }) => (
  <ThingsDataSource>
    {({ things, error }) => (
      <div className={className}>
        {error && <span>{error.message}</span>}
        {things && (
          <Grid container spacing={8}>
            {things.map((thing, i) => (
              <Grid item key={i} xs={6}>
                <ThingGridItem
                  className={classes.gridItem}
                  thingId={thing.id}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    )}
  </ThingsDataSource>
);
export default withStyles(styles)(ThingsPage);
