import { injectable, singleton, provides } from "microinject";

import uuidV4 from "uuid/v4";

import { ThingDef, Thing } from "../../types";

import { ThingFactory } from "../ThingFactory";
import { ThingImpl } from "./ThingImpl";

@injectable()
@singleton()
@provides(ThingFactory)
export class ThingFactoryImpl implements ThingFactory {
  createThing(def: ThingDef, owner: object): Thing {
    return new ThingImpl(def, uuidV4(), owner);
  }
}
