import { MaybeArray } from "../../../types";

import {
  MozIotPlugin,
  MozIotPluginContext,
  ThingCapabilityDef
} from "../../contracts";

import { ThingService, Thing, ThingDef } from "../../../things";

import { ActionService } from "../../../actions";

import {
  ActionRequestService,
  ThingActionRequestToken
} from "../../../action-requests";
import { ThingTypesService } from "../../../thing-types";

export class PluginAdapterImpl {
  constructor(
    private _plugin: MozIotPlugin,
    private _thingService: ThingService,
    private _thingTypesService: ThingTypesService,
    private _actionService: ActionService,
    private _actionRequestService: ActionRequestService
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
    const thing = this._thingService.addThing(def, this._plugin);
    this._addCapability(thing.id, ...capabilities);
    return thing;
  }

  private _removeThing(thingId: string): void {
    const thing = this._thingService.getThing(thingId);
    if (!thing) {
      throw new Error("No thing exists by the provided thingId.");
    }

    if (thing.ownerPlugin !== this._plugin) {
      throw new Error("The plugin does not own the specified thing.");
    }

    this._thingService.removeThing(thingId);
  }

  private _getThings(): Thing[] {
    return this._thingService.getThings();
  }

  private _getOwnThings(): Thing[] {
    return this._thingService
      .getThings()
      .filter(x => x.ownerPlugin === this._plugin);
  }

  private _addCapability(
    thingId: string,
    ...capabilities: MaybeArray<ThingCapabilityDef>[]
  ): void {
    const flatCaps = ([] as ThingCapabilityDef[]).concat(...capabilities);

    for (const cap of flatCaps) {
      switch (cap.capabilityType) {
        case "type":
          this._thingTypesService.addType(thingId, cap.type);
          break;
        case "action":
          this._actionService.addAction(thingId, cap, this._plugin);
          break;
        default:
          throwUnknownCapability(cap);
      }
    }
  }

  private _addActionRequest(
    thingId: string,
    actionId: string,
    input: any,
    timeRequested: string
  ): ThingActionRequestToken {
    const action = this._actionService.getAction(thingId, actionId);
    if (!action) {
      throw new Error("No action exists on the given thing with the given id.");
    }

    if (action.ownerPlugin !== this._plugin) {
      throw new Error("The plugin does not own the requested action.");
    }

    const token = this._actionRequestService.addRequest(
      thingId,
      actionId,
      input,
      timeRequested
    );
    return token;
  }
}

function throwUnknownCapability(def: never): never {
  const type = (def as ThingCapabilityDef).capabilityType;
  throw new Error(`Unknown capability type "${type}".`);
}
