import { ReadonlyRecord } from "../../../types";

import { Thing } from "../../things";
import { ThingActionDef } from "../../actions";
import { ThingPropertyDef, ThingProperty } from "../../properties";

import { OwnedPluginThingAction, PluginThingAction } from "./PluginAction";

export interface PluginThing extends Thing {
  readonly actions: ReadonlyRecord<string, PluginThingAction>;

  isOwned(): this is OwnedPluginThing;
  addType(type: string): PluginThing;
  addAction(def: ThingActionDef): OwnedPluginThingAction;
  addProperty(def: ThingPropertyDef): ThingProperty;

  toThing(): Thing;
}

export interface OwnedPluginThing extends PluginThing {
  // setTitle(title: string): OwnedPluginThing;
  // setDescription(description: string): OwnedPluginThing;
  addType(type: string): OwnedPluginThing;
  delete(): void;
}
