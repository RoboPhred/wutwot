import * as React from "react";

import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles";

import BackButton from "./BackButton";

export interface AppbarProps {
  title: string;
  back?: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  });

type Props = AppbarProps & WithStyles<typeof styles>;

const Appbar: React.FC<Props> = ({ classes, title, back }) => (
  <MaterialAppBar position="static">
    <Toolbar>
      {back && <BackButton />}
      <Typography className={classes.title} variant="h6" color="inherit">
        {title}
      </Typography>
    </Toolbar>
  </MaterialAppBar>
);
export default withStyles(styles)(Appbar);
