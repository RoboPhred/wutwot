import { injectable, singleton, provides, inject } from "microinject";

import { ThingAction } from "../../actions";
import { ActionRequestService } from "../../action-requests";

import {
  PluginThingAction,
  OwnedPluginThingAction,
  PluginAdapter
} from "../types";

import { PluginThingActionFactory } from "../components/PluginThingActionFactory";

import { PluginThingActionImpl } from "./PluginThingActionImpl";

@injectable()
@singleton()
@provides(PluginThingActionFactory)
export class PluginThingActionFactoryImpl implements PluginThingActionFactory {
  constructor(
    @inject(ActionRequestService)
    private _actionRequestService: ActionRequestService
  ) {}

  getThingAction(
    action: ThingAction,
    pluginAdapter: PluginAdapter
  ): PluginThingAction | OwnedPluginThingAction {
    return new PluginThingActionImpl(
      action,
      pluginAdapter,
      this._actionRequestService
    );
  }
}
