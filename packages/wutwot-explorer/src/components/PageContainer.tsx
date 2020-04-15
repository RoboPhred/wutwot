import * as React from "react";

import { makeStyles, createStyles } from "@material-ui/styles";

import AppBar from "./AppBar";

export interface PageContainerProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  content: {
    width: "100%",
    height: "100%"
  }
});

const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar title={title} />
      <div className={classes.content}>{children}</div>
    </div>
  );
};
export default PageContainer;
