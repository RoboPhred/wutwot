import { MaybeArray } from "../../../../../types";

import {
  MozIotPlugin,
  MozIotPluginContext,
  AddThingRequest,
  ThingCapabilityDef
} from "../../contracts";

import { Thing } from "../../../things";

export class PluginAdapterImpl {
  constructor(private _plugin: MozIotPlugin) {}
}

class PluginContextImpl implements MozIotPluginContext {
  addThing(
    def: AddThingRequest,
    ...capabilities: MaybeArray<ThingCapabilityDef>[]
  ): Thing {
    throw new Error("Method not implemented.");
  }

  removeThing(thingId: string): void {
    throw new Error("Method not implemented.");
  }

  getThings(): Thing[] {
    throw new Error("Method not implemented.");
  }

  getOwnThings(): Thing[] {
    throw new Error("Method not implemented.");
  }

  addCapability(
    thingId: string,
    ...capabilities: MaybeArray<ThingCapabilityDef>[]
  ): void {
    throw new Error("Method not implemented.");
  }
}
