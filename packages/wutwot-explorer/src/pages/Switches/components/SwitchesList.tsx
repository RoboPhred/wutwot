import * as React from "react";

import List from "@material-ui/core/List";

import { useThings } from "@/services/homectrl/hooks/useThings";

import SwitchesListItem from "./SwitchesListItem";

const SwitchesList: React.FC = () => {
  const things = useThings();
  const switches = things.filter(x => typesIsSwitch(x["@type"]));

  return (
    <List>
      {switches.map(x => (
        <SwitchesListItem thingId={x.id} />
      ))}
    </List>
  );
};

export default SwitchesList;

function typesIsSwitch(types: string[]) {
  return types.includes("OnOffSwitch") || types.includes("MultiLevelSwitch");
}
