import * as React from "react";
import classnames from "classnames";

import { createStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FloatingButton from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

import ThingDataSource from "@/services/homectrl/components/ThingDataSource";

export interface ThingGridItemProps {
  className?: string;
  thingId: string;
}

const styles = createStyles({
  root: {
    position: "relative"
  },
  menuButton: {
    position: "absolute",
    right: 0,
    bottom: 0
  }
});

type Props = ThingGridItemProps & StyleProps<typeof styles>;
const ThingGridItem: React.SFC<Props> = ({ className, classes, thingId }) => (
  <ThingDataSource thingId={thingId}>
    {({ error, thing }) => (
      <Card className={classnames(className, classes.root)}>
        {error && <span>{error}</span>}
        {thing && (
          <>
            <CardContent>
              <Typography variant="h5">{thing.title}</Typography>
              <Typography variant="body1">{thing.description}</Typography>
            </CardContent>
            <FloatingButton className={classes.menuButton}>
              <MenuIcon />
            </FloatingButton>
          </>
        )}
      </Card>
    )}
  </ThingDataSource>
);
export default withStyles(styles)(ThingGridItem);
