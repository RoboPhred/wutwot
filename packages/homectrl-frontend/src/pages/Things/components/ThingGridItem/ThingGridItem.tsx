import * as React from "react";
import classnames from "classnames";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import { Thing } from "@/services/homectrl/types";

export interface ThingGridItemProps {
  className?: string;
  thing: Thing;
}

const styles = createStyles({
  root: {
    position: "relative"
  }
});

type Props = ThingGridItemProps & WithStyles<typeof styles>;
const ThingGridItem: React.SFC<Props> = ({ className, classes, thing }) => {
  return (
    <Card className={classnames(className, classes.root)}>
      <CardContent>
        <Typography variant="h5">{thing.title}</Typography>
        <Typography variant="body1">{thing.description}</Typography>
      </CardContent>
      <CardActions />
    </Card>
  );
};
export default withStyles(styles)(ThingGridItem);
