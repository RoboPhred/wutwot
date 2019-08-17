import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "./AppBar";

import Router from "@/router";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  }
});

const App: React.SFC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar />
      <Router />
    </div>
  );
};
export default App;
