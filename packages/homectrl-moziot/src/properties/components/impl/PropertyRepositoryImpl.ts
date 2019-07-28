import { EventEmitter } from "events";

import { injectable, singleton, provides } from "microinject";

import { ThingProperty } from "../../types";

import {
  PropertyRegistry,
  ThingPropertyAddedEventArgs,
  ThingPropertyRemovedEventArgs
} from "../PropertyRegistry";
import { PropertyRepository } from "../PropertyRepository";

@injectable()
@singleton()
@provides(PropertyRegistry)
@provides(PropertyRepository)
export class PropertyRepositoryImpl extends EventEmitter
  implements PropertyRepository {
  private _propertiesByThingId = new Map<string, ThingProperty[]>();

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

    const e: ThingPropertyAddedEventArgs = {
      thingId,
      propertyId: property.id,
      property
    };
    this.emit("property.add", e);
  }

  removeProperty(thingId: string, propertyId: string): void {
    const properties = this._propertiesByThingId.get(thingId) || [];
    const idx = properties.findIndex(x => x.id === propertyId);
    if (idx !== -1) {
      properties.splice(idx, 1);

      const e: ThingPropertyRemovedEventArgs = {
        thingId,
        propertyId
      };
      this.emit("property.remove", e);
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
