import { ThingAction } from "../../actions";
import { ThingActionRequestDef } from "../../action-requests";
import { ThingActionRequest } from "../../action-requests";

export interface PluginThingAction extends ThingAction {
  isOwned(): this is OwnedPluginThingAction;

  toAction(): ThingAction;
}

export interface OwnedPluginThingAction extends PluginThingAction {
  addRequest(def: ThingActionRequestDef): ThingActionRequest;
}
