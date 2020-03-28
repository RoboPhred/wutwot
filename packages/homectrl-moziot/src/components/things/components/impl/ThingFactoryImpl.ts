import { injectable, singleton, provides, inject } from "microinject";

import { IdMapper } from "../../../../utils";
import { ActionService } from "../../../actions";

import { ThingDef, Thing, validateThingDefOrThrow } from "../../types";

import { ThingTypeService } from "../../../thing-types";
import { PropertyService } from "../../../properties";

import { ThingFactory } from "../ThingFactory";

import { ThingImpl } from "./ThingImpl";

@injectable()
@singleton()
@provides(ThingFactory)
export class ThingFactoryImpl implements ThingFactory {
  private _idMapper = new IdMapper();

  constructor(
    @inject(ThingTypeService) private _thingTypeService: ThingTypeService,
    @inject(ActionService) private _actionService: ActionService,
    @inject(PropertyService) private _propertyService: PropertyService
  ) {}

  createThing(def: ThingDef, owner: object): Thing {
    validateThingDefOrThrow(def);
    const id = this._idMapper.createId(def.title);
    return new ThingImpl(
      def,
      id,
      owner,
      this._thingTypeService,
      this._actionService,
      this._propertyService
    );
  }
}
