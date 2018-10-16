import * as React from "react";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { createStyles, withStyles } from "@material-ui/core/styles";

import ThingsDataSource from "@/services/homectrl/components/ThingsDataSource";
import ThingGridItem from "./ThingGridItem";

const cellSize = 240;
const itemSize = 210;

export interface ThingGridProps {
  className?: string;
}
const styles = createStyles({
  gridItem: {
    width: itemSize,
    height: itemSize,
    margin: 2
  }
});
type Props = ThingGridProps & StyleProps<typeof styles>;
const ThingGrid: React.SFC<Props> = ({ className, classes }) => (
  <ThingsDataSource>
    {({ things, error }) => (
      <div className={className}>
        {error && <span>{error.message}</span>}
        {things && (
          <GridList cellHeight={cellSize} spacing={10}>
            {things.map((thing, i) => (
              <GridListTile key={i}>
                <ThingGridItem className={classes.gridItem} thing={thing} />
              </GridListTile>
            ))}
          </GridList>
        )}
      </div>
    )}
  </ThingsDataSource>
);
export default withStyles(styles)(ThingGrid);
