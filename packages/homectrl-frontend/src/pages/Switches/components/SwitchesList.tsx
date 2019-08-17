import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import { useThings } from "@/services/homectrl/hooks/useThings";

import SwitchesListItem from "./SwitchesListItem";

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
});

const SwitchesList: React.FC = () => {
  const classes = useStyles();
  const things = useThings();
  const switches = things.filter(x => x["@type"].includes("OnOffSwitch"));

  return (
    <List>
      {switches.map(x => (
        <SwitchesListItem thingId={x.id} />
      ))}
    </List>
  );
};

export default SwitchesList;
