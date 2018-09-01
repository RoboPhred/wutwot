import { MaybeArray } from "../../../../../types";

import {
  MozIotPlugin,
  MozIotPluginContext,
  ThingCapabilityDef
} from "../../contracts";

import { Thing, ThingDef } from "../../../things";
import { ThingRepository, ThingFactory } from "../../../things/components";

import { ActionFactory, ActionRepository } from "../../../actions/components";

import { ThingActionRequestToken } from "../../../action-requests";
import {
  ActionRequestFactory,
  ActionRequestRepository
} from "../../../action-requests/components";

export class PluginAdapterImpl {
  constructor(
    private _plugin: MozIotPlugin,
    private _thingFactory: ThingFactory,
    private _thingRepository: ThingRepository,
    private _actionFactory: ActionFactory,
    private _actionRepository: ActionRepository,
    private _actionRequestFactory: ActionRequestFactory,
    private _actionRequestRepository: ActionRequestRepository
  ) {
    const pluginContext: MozIotPluginContext = {
      addThing: this._addThing.bind(this),
      removeThing: this._removeThing.bind(this),
      getThings: this._getThings.bind(this),
      getOwnThings: this._getOwnThings.bind(this),
      addCapability: this._addCapability.bind(this),
      addActionRequest: this._addActionRequest.bind(this)
    };

    _plugin.onRegisterPlugin(pluginContext);
  }

  private _addThing(
    def: ThingDef,
    ...capabilities: MaybeArray<ThingCapabilityDef>[]
  ): Thing {
    const thing = this._thingFactory.createThing(def, this._plugin);
    this._thingRepository.addThing(thing);

    this._addCapability(thing.id, ...capabilities);
    return thing;
  }

  private _removeThing(thingId: string): void {
    const thing = this._thingRepository.get(thingId);
    if (!thing) {
      throw new Error("No thing exists by the provided thingId.");
    }

    if (thing.ownerPlugin !== this._plugin) {
      throw new Error("The plugin does not own the requested thing.");
    }

    this._thingRepository.removeThing(thingId);
  }

  private _getThings(): Thing[] {
    return Array.from(this._thingRepository);
  }

  private _getOwnThings(): Thing[] {
    return Array.from(this._thingRepository).filter(
      x => x.ownerPlugin === this._plugin
    );
  }

  private _addCapability(
    thingId: string,
    ...capabilities: MaybeArray<ThingCapabilityDef>[]
  ): void {
    const flatCaps = ([] as ThingCapabilityDef[]).concat(...capabilities);

    for (const cap of flatCaps) {
      switch (cap.capabilityType) {
        case "action":
          {
            const action = this._actionFactory.createAction(
              cap,
              thingId,
              this._plugin
            );
            this._actionRepository.addAction(thingId, action);
          }
          break;
        default:
          throw new Error(
            `Capability "${cap.capabilityType}" not implemented.`
          );
      }
    }
  }

  private _addActionRequest(
    thingId: string,
    actionId: string,
    input: any,
    timeRequested: string
  ): ThingActionRequestToken {
    const action = this._actionRepository.get(thingId, actionId);
    if (!action) {
      throw new Error("No action exists on the given thing with the given id.");
    }

    if (action.ownerPlugin !== this._plugin) {
      throw new Error("The plugin does not own the requested action.");
    }

    const { request, token } = this._actionRequestFactory.createActionRequest(
      thingId,
      actionId,
      input,
      timeRequested
    );

    this._actionRequestRepository.addRequest(request);
    return token;
  }
}
