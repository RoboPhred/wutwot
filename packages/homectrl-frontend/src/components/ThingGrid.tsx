import * as React from "react";

import Grid from "@material-ui/core/Grid";

import ThingsDataSource from "@/services/homectrl/components/ThingsDataSource";
import ThingGridItem from "./ThingGridItem";

export interface ThingGridProps {
  className?: string;
}
type Props = ThingGridProps;
const ThingGrid: React.SFC<Props> = ({ className }) => (
  <ThingsDataSource>
    {({ things, error }) => (
      <div className={className}>
        {error && <span>{error.message}</span>}
        {things && (
          <Grid container spacing={8}>
            {things.map((thing, i) => (
              <Grid item key={i} xs={6}>
                <ThingGridItem thing={thing} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    )}
  </ThingsDataSource>
);
export default ThingGrid;
