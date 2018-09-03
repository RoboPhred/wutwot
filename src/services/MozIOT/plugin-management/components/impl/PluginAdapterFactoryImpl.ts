import { injectable, provides, inject, singleton } from "microinject";

import { ThingService } from "../../../things";
import { ActionService } from "../../../actions";

import {
  ActionRequestFactory,
  ActionRequestRepository
} from "../../../action-requests/components";
import { ActionRequestService } from "../../../action-requests";

import { MozIotPlugin } from "../../contracts";

import { PluginAdapterFactory } from "../PluginAdapterFactory";
import { PluginAdapter } from "../PluginAdapter";

import { PluginAdapterImpl } from "./PluginAdapterImpl";

@injectable()
@singleton()
@provides(PluginAdapterFactory)
export class PluginAdapterFactoryImpl implements PluginAdapterFactory {
  constructor(
    @inject(ThingService) private _thingService: ThingService,
    @inject(ActionService) private _actionService: ActionService,
    @inject(ActionRequestService) private _requestService: ActionRequestService
  ) {}

  createPluginAdapter(plugin: MozIotPlugin): PluginAdapter {
    return new PluginAdapterImpl(
      plugin,
      this._thingService,
      this._actionService,
      this._requestService
    );
  }
}
