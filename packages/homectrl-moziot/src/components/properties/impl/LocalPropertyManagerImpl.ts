import { injectable, provides, inject, injectParam } from "microinject";

import { IdMapper } from "../../../utils";

import { inThingScope, InternalThingParams } from "../../things";

import {
  ThingProperty,
  ThingPropertyDef,
  validatePropertyDefOrThrow
} from "../types";

import { LocalPropertyManager } from "../services/LocalPropertyManager";
import { ThingPropertyImpl } from "./ThingPropertyImpl";
import { PropertyEventSink } from "../components";

@injectable()
@inThingScope()
@provides(LocalPropertyManager)
export class LocalPropertyManagerImpl implements LocalPropertyManager {
  private _idMapper = new IdMapper();
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

  createProperty(propertyDef: ThingPropertyDef, owner: object): ThingProperty {
    validatePropertyDefOrThrow(propertyDef);

    const propertyId = this._idMapper.createId(propertyDef.title);
    const property = new ThingPropertyImpl(
      propertyDef,
      propertyId,
      this._thingId,
      owner
    );
    this._properties.set(property.id, property);

    this._eventSink.onPropertyAdded(this._thingId, propertyId, property);

    return property;
  }
}
