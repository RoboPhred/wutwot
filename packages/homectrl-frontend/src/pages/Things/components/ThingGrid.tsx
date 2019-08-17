import * as React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import { useThings } from "@/services/homectrl/hooks/useThings";

import ThingGridItem from "./ThingGridItem";

const useStyles = makeStyles((theme: Theme) => ({
  gridItem: {
    width: "200px",
    height: "200px",
    margin: theme.spacing(1)
  }
}));

const ThingGrid: React.FC = () => {
  const classes = useStyles();
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

export default ThingGrid;
