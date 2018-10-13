import * as React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { Thing } from "@/services/homectrl/types/Thing";

export interface ThingGridItemProps {
  className?: string;
  thing: Thing;
}
const ThingGridItem: React.SFC<ThingGridItemProps> = ({ className, thing }) => (
  <Card className={className}>
    <CardContent>
      <Typography variant="h5">{thing.name}</Typography>
      <Typography variant="body1">{thing.description}</Typography>
    </CardContent>
  </Card>
);
export default ThingGridItem;
