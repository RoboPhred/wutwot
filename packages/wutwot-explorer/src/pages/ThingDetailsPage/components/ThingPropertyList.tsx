import * as React from "react";
import keys from "lodash/keys";
import { PropertyAffordance } from "@wutwot/td";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

export interface ThingPropertyListProps {
  properties: Record<string, PropertyAffordance>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

const ThingPropertyList: React.FC<ThingPropertyListProps> = ({
  properties,
}) => {
  const classes = useStyles();

  if (!properties) {
    return null;
  }

  const propertyKeys = keys(properties);

  return (
    <div className={classes.root}>
      <Typography variant="overline">Properties</Typography>
      <Paper>
        <List>
          {propertyKeys.map((key) => {
            const { title, description } = properties[key];
            return (
              <ListItem key={key}>
                <ListItemText primary={title || key} secondary={description} />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </div>
  );
};

export default ThingPropertyList;
