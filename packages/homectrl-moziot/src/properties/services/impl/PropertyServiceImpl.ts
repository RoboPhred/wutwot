import { injectable, singleton, provides, inject } from "microinject";

import { ThingProperty, ThingPropertyDef } from "../../types";

import { PropertyFactory } from "../../components/PropertyFactory";
import { PropertyRepository } from "../../components";

import { PropertyService } from "../PropertyService";
import { PropertyValueRegistry } from "../../../property-values";

@injectable()
@singleton()
@provides(PropertyService)
export class PropertyServiceImpl implements PropertyService {
  constructor(
    @inject(PropertyFactory) private _propertyFactory: PropertyFactory,
    @inject(PropertyRepository) private _propertyRepository: PropertyRepository,
    @inject(PropertyValueRegistry)
    private _propertyValueRegistry: PropertyValueRegistry
  ) {}

  getProperty(thingId: string, propertyId: string): ThingProperty | undefined {
    return this._propertyRepository.get(thingId, propertyId);
  }

  getForThing(thingId: string): ThingProperty[] {
    return this._propertyRepository.getForThing(thingId);
  }

  addProperty(
    thingId: string,
    propertyDef: ThingPropertyDef,
    owner: object
  ): ThingProperty {
    const property = this._propertyFactory.createProperty(
      propertyDef,
      thingId,
      owner
    );
    this._propertyRepository.addProperty(thingId, property);
    this._propertyValueRegistry.setValue(
      thingId,
      property.id,
      propertyDef.initialValue
    );
    return property;
  }
}
