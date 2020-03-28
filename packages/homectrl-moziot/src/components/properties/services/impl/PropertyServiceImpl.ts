import { injectable, singleton, provides, inject } from "microinject";

import { ThingEventSource, ThingRemovedEventArgs } from "../../../things";

import { ThingProperty, ThingPropertyDef } from "../../types";

import { PropertyFactory } from "../../components/PropertyFactory";
import { PropertyRepository } from "../../components";

import { PropertyService } from "../PropertyService";

@injectable()
@singleton()
@provides(PropertyService)
export class PropertyServiceImpl implements PropertyService {
  constructor(
    @inject(PropertyFactory) private _propertyFactory: PropertyFactory,
    @inject(PropertyRepository) private _propertyRepository: PropertyRepository,
    @inject(ThingEventSource) thingEventSource: ThingEventSource
  ) {
    thingEventSource.on("thing.remove", this._onThingRemoved.bind(this));
  }

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

    return property;
  }

  private _onThingRemoved(e: ThingRemovedEventArgs) {
    this._propertyRepository.removeAllThingProperties(e.thingId);
  }
}
