import { injectable, singleton, provides, inject } from "microinject";

import { ThingEventSource, ThingRemovedEventArgs } from "../../../things";

import { ThingTypeService } from "../ThingTypeService";

@injectable()
@singleton()
@provides(ThingTypeService)
export class ThingTypeServiceImpl implements ThingTypeService {
  private _typesByThingId = new Map<string, Set<string>>();

  constructor(@inject(ThingEventSource) thingEventSource: ThingEventSource) {
    thingEventSource.on("thing.remove", this._onThingRemoved.bind(this));
  }

  addType(thingId: string, type: string): void {
    let caps = this._typesByThingId.get(thingId);
    if (caps == null) {
      caps = new Set<string>();
      this._typesByThingId.set(thingId, caps);
    }
    caps.add(type);
  }

  getTypes(thingId: string): string[] {
    return Array.from(this._typesByThingId.get(thingId) || []);
  }

  private _onThingRemoved(e: ThingRemovedEventArgs) {
    this._typesByThingId.delete(e.thingId);
  }
}
