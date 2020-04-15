import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Router from "@/router";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%"
  }
});

const App: React.SFC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router />
    </div>
  );
};
export default App;
