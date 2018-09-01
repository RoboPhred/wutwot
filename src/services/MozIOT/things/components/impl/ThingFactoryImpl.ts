import { injectable, singleton, provides, inject } from "microinject";

import uuidV4 from "uuid/v4";

import { ThingDef, Thing } from "../../types";

import { ThingFactory } from "../ThingFactory";
import { ThingImpl } from "./ThingImpl";
import { ActionRegistry } from "../../../actions/components";
import { IdMapper } from "../../../utils";

@injectable()
@singleton()
@provides(ThingFactory)
export class ThingFactoryImpl implements ThingFactory {
  constructor(
    @inject(ActionRegistry) private _actionRegistry: ActionRegistry,
    @inject(IdMapper) private _idMapper: IdMapper
  ) {}

  createThing(def: ThingDef, owner: object): Thing {
    const id = this._idMapper.createId(def.name);
    return new ThingImpl(def, id, owner, this._actionRegistry);
  }
}
