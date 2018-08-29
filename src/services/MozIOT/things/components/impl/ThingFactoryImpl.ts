import { injectable, singleton, provides, inject } from "microinject";

import uuidV4 from "uuid/v4";

import { ThingDef, Thing } from "../../types";

import { ThingFactory } from "../ThingFactory";
import { ThingImpl } from "./ThingImpl";
import { ActionRegistry } from "../../../actions/components";

@injectable()
@singleton()
@provides(ThingFactory)
export class ThingFactoryImpl implements ThingFactory {
  constructor(
    @inject(ActionRegistry) private _actionRegistry: ActionRegistry
  ) {}

  createThing(def: ThingDef, owner: object): Thing {
    return new ThingImpl(def, uuidV4(), owner, this._actionRegistry);
  }
}
