import { injectable, provides, inject, singleton } from "microinject";

import { ThingFactory, ThingRepository } from "../../../things/components";
import { ActionFactory, ActionRepository } from "../../../actions/components";
import {
  ActionRequestFactory,
  ActionRequestRepository
} from "../../../action-requests/components";

import { MozIotPlugin } from "../../contracts";

import { PluginAdapterFactory } from "../PluginAdapterFactory";
import { PluginAdapter } from "../PluginAdapter";

import { PluginAdapterImpl } from "./PluginAdapterImpl";

@injectable()
@singleton()
@provides(PluginAdapterFactory)
export class PluginAdapterFactoryImpl implements PluginAdapterFactory {
  constructor(
    @inject(ThingFactory) private _thingFactory: ThingFactory,
    @inject(ThingRepository) private _thingRepository: ThingRepository,
    @inject(ActionFactory) private _actionFactory: ActionFactory,
    @inject(ActionRepository) private _actionRepository: ActionRepository,
    @inject(ActionRequestFactory)
    private _actionRequestFactory: ActionRequestFactory,
    @inject(ActionRequestRepository)
    private _actionRequestRepository: ActionRequestRepository
  ) {}

  createPluginAdapter(plugin: MozIotPlugin): PluginAdapter {
    return new PluginAdapterImpl(
      plugin,
      this._thingFactory,
      this._thingRepository,
      this._actionFactory,
      this._actionRepository,
      this._actionRequestFactory,
      this._actionRequestRepository
    );
  }
}
