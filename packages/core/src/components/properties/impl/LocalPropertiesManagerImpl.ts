import { injectable, provides, inject, injectParam } from "microinject";

import { SelfPopulatingReadonlyMap } from "../../../utils/SelfPopulatingReadonlyMap";

import {
  inThingScope,
  InternalThingParams,
  ThingsManager,
  Thing,
} from "../../things";
import { WutWotPlugin } from "../../plugin-management";
import { makeCompoundId, DuplicateIDError } from "../../id-mapping";
import { FormProvider, getPropertyForms } from "../../forms";

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
export class LocalPropertiesManagerImpl
  extends SelfPopulatingReadonlyMap<string, ThingProperty>
  implements LocalPropertiesManager
{
  constructor(
    @injectParam(InternalThingParams.ThingId)
    private _thingId: string,
    @inject(PropertyEventSink)
    private _eventSink: PropertyEventSink,
    @inject(ThingsManager)
    private _thingsManager: ThingsManager,
    @inject(FormProvider, { all: true, optional: true })
    private _formProviders: FormProvider[] = [],
  ) {
    super("PropertiesManager");
  }

  createProperty(def: ThingPropertyDef, owner: WutWotPlugin): ThingProperty {
    validatePropertyDefOrThrow(def);

    const id = makeCompoundId(owner.id, def.pluginLocalId);
    if (this.has(id)) {
      throw new DuplicateIDError(
        `Plugin ${owner.id} has already registered a property with a plugin-local id of "${def.pluginLocalId}".`,
      );
    }

    // TODO: Not happy with this code...
    // We need to get the forms for the property, and to do that we need the reference to the thing and the thing property.
    const ownerThing = this._thingsManager.get(this._thingId);
    if (!ownerThing) {
      throw new Error(
        "Tried to create a property for a Thing that is not yet registered.",
      );
    }

    // TODO: Use injected factory, like actions.
    const property = new ThingPropertyImpl(
      def,
      id,
      this._thingId,
      owner,
      (self) =>
        getPropertyForms(this._formProviders, ownerThing!.publicProxy, self),
    );
    this._set(id, property);

    this._eventSink.onPropertyAdded(property);

    return property;
  }
}
