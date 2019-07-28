import { injectable, singleton, provides, inject } from "microinject";

import { ThingProperty } from "../../types";

import { PropertyRegistry } from "../PropertyRegistry";
import { PropertyRepository } from "../PropertyRepository";
import { PropertyEventSink } from "../PropertyEventSink";

@injectable()
@singleton()
@provides(PropertyRegistry)
@provides(PropertyRepository)
export class PropertyRepositoryImpl implements PropertyRepository {
  private _propertiesByThingId = new Map<string, ThingProperty[]>();

  constructor(
    @inject(PropertyEventSink) private _propertyEventSink: PropertyEventSink
  ) {}

  addProperty(thingId: string, property: ThingProperty): void {
    let properties = this._propertiesByThingId.get(thingId);
    if (!properties) {
      properties = [];
      this._propertiesByThingId.set(thingId, properties);
    }

    if (properties.find(x => x.id === property.id)) {
      throw new Error("Duplicate property id.");
    }

    properties.push(property);
    this._propertyEventSink.onPropertyAdded(thingId, property.id, property);
  }

  removeProperty(thingId: string, propertyId: string): void {
    const properties = this._propertiesByThingId.get(thingId) || [];
    const idx = properties.findIndex(x => x.id === propertyId);
    if (idx !== -1) {
      properties.splice(idx, 1);
      this._propertyEventSink.onPropertyRemoved(thingId, propertyId);
    }
  }

  get(thingId: string, propertyId: string): ThingProperty | undefined {
    const properties = this._propertiesByThingId.get(thingId) || [];
    return properties.find(x => x.id === propertyId);
  }

  getForThing(thingId: string): ThingProperty[] {
    const properties = this._propertiesByThingId.get(thingId) || [];
    return [...properties];
  }
}
