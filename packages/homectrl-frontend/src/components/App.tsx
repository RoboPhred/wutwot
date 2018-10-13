import * as React from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";

import AppBar from "./AppBar";
import ThingGrid from "./ThingGrid";

const styles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  thingGrid: {
    flexGrow: 1,
    minWidth: 0,
    width: "100%"
  }
});

type Props = StyleProps<typeof styles>;
const App: React.SFC<Props> = ({ classes }) => (
  <div className={classes.root}>
    <AppBar />
    <ThingGrid className={classes.thingGrid} />
  </div>
);
export default withStyles(styles)(App);
