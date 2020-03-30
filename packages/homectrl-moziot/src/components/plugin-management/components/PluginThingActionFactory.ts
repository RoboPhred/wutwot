import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingAction } from "../../actions";
import {
  PluginThingAction,
  OwnedPluginThingAction,
  PluginAdapter
} from "../types";

export const PluginThingActionFactory: Identifier<PluginThingActionFactory> = createSymbol(
  "PluginThingActionFactory"
);
export interface PluginThingActionFactory {
  getThingAction(
    action: ThingAction,
    pluginAdapter: PluginAdapter
  ): PluginThingAction | OwnedPluginThingAction;
}
