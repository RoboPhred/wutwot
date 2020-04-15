import * as React from "react";
import classnames from "classnames";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import { useThing } from "@/services/homectrl/hooks/useThing";
import { getPropertyIdByType } from "@/services/homectrl/utils";

import BooleanPropertySwitch from "@/components/BooleanPropertySwitch";

export interface ThingGridItemProps {
  className?: string;
  thingId: string;
}

const useStyles = makeStyles({
  root: {
    position: "relative"
  }
});

type Props = ThingGridItemProps;
const ThingGridItem: React.SFC<Props> = ({ className, thingId }) => {
  const classes = useStyles();
  const thing = useThing(thingId);
  if (!thing) {
    return null;
  }

  const onOffProperty = getPropertyIdByType(thing, "OnOffProperty");

  return (
    <Card className={classnames(className, classes.root)}>
      <CardContent>
        <Typography variant="h5">{thing.title}</Typography>
        <Typography variant="body1">{thing.description}</Typography>
        {onOffProperty && (
          <BooleanPropertySwitch thingId={thingId} propertyId={onOffProperty} />
        )}
      </CardContent>
      <CardActions />
    </Card>
  );
};
export default ThingGridItem;
