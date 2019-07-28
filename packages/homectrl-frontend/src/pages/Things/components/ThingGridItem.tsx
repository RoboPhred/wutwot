import * as React from "react";
import classnames from "classnames";

import { createStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";

import ThingDataSource from "@/services/homectrl/components/ThingDataSource";
import { ThingPropertyDataSource } from "@/services/homectrl/components/ThingPropertyDataSource";
import { Thing } from "@/services/homectrl/types/Thing";

export interface ThingGridItemProps {
  className?: string;
  thingId: string;
}

const styles = createStyles({
  root: {
    position: "relative"
  }
});

type Props = ThingGridItemProps & StyleProps<typeof styles>;
const ThingGridItem: React.SFC<Props> = ({ className, classes, thingId }) => (
  <ThingDataSource thingId={thingId}>
    {({ error, thing }) => {
      const onOffPropertyId = thing && getOnOffPropertyId(thing);
      return (
        <Card className={classnames(className, classes.root)}>
          {error && <span>{error}</span>}
          {thing && (
            <>
              <CardContent>
                <Typography variant="h5">{thing.title}</Typography>
                <Typography variant="body1">{thing.description}</Typography>
              </CardContent>
              <CardActions>
                <Button>
                  <MenuIcon />
                </Button>
                {onOffPropertyId && (
                  <ThingPropertyDataSource
                    thingId={thingId}
                    propertyId={onOffPropertyId}
                  >
                    {({ value, setValue }) => (
                      <Button onClick={() => setValue(!value)}>
                        {value ? <ToggleOnIcon /> : <ToggleOffIcon />}
                      </Button>
                    )}
                  </ThingPropertyDataSource>
                )}
              </CardActions>
            </>
          )}
        </Card>
      );
    }}
  </ThingDataSource>
);
export default withStyles(styles)(ThingGridItem);

function getOnOffPropertyId(thing: Thing): string | undefined {
  for (const propertyId of Object.keys(thing.properties)) {
    const property = thing.properties[propertyId];
    if (property["@type"] === "OnOffProperty") {
      return propertyId;
    }
  }
  return undefined;
}
