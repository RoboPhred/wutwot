import { injectable, singleton, provides, inject } from "microinject";

import { IdMapper } from "../../../utils";
import { ActionService } from "../../../actions";

import { ThingDef, Thing } from "../../types";

import { ThingFactory } from "../ThingFactory";
import { ThingImpl } from "./ThingImpl";
import { ThingTypesService } from "../../../thing-types";
import { PropertyService } from "../../../properties";

@injectable()
@singleton()
@provides(ThingFactory)
export class ThingFactoryImpl implements ThingFactory {
  private _idMapper = new IdMapper();

  constructor(
    @inject(ThingTypesService) private _thingTypesService: ThingTypesService,
    @inject(ActionService) private _actionService: ActionService,
    @inject(PropertyService) private _propertyService: PropertyService
  ) {}

  createThing(def: ThingDef, owner: object): Thing {
    const id = this._idMapper.createId(def.title);
    return new ThingImpl(
      def,
      id,
      owner,
      this._thingTypesService,
      this._actionService,
      this._propertyService
    );
  }
}
