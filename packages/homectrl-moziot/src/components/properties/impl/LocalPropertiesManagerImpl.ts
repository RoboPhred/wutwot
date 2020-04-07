import { injectable, provides, inject, injectParam } from "microinject";

import { LegacyIdMapper } from "../../../utils/LegacyIdMapper";

import { inThingScope, InternalThingParams } from "../../things";

import {
  ThingProperty,
  ThingPropertyDef,
  validatePropertyDefOrThrow,
} from "../types";

import { LocalPropertiesManager } from "../services";
import { PropertyEventSink } from "../components";

import { ThingPropertyImpl } from "./ThingPropertyImpl";

@injectable()
@inThingScope()
@provides(LocalPropertiesManager)
export class LocalPropertiesManagerImpl implements LocalPropertiesManager {
  private _idMapper = new LegacyIdMapper();
  private _properties = new Map<string, ThingProperty>();

  constructor(
    @injectParam(InternalThingParams.ThingId)
    private _thingId: string,
    @inject(PropertyEventSink)
    private _eventSink: PropertyEventSink
  ) {}

  getProperty(propertyId: string): ThingProperty | undefined {
    return this._properties.get(propertyId);
  }

  getAllProperties(): ThingProperty[] {
    return Array.from(this._properties.values());
  }

  addProperty(propertyDef: ThingPropertyDef, owner: object): ThingProperty {
    validatePropertyDefOrThrow(propertyDef);

    const propertyId = this._idMapper.createId(propertyDef.title);
    const property = new ThingPropertyImpl(
      propertyDef,
      propertyId,
      this._thingId,
      owner
    );
    this._properties.set(property.id, property);

    this._eventSink.onPropertyAdded(property);

    return property;
  }
}
