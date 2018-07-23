import { injectable, ServiceFactory, Context, Container } from "microinject";

import { ThingDef } from "../../../contracts/ThingSource";

import { ThingFactory } from "../ThingFactory";
import { Thing } from "../Thing";

@injectable(ThingFactory)
export class ThingFactoryImpl implements ThingFactory {
  createThing(def: ThingDef): Thing {}
}

const thingFactoryFactory: ServiceFactory = (context: Context) => {
  return function thingFactory(def: ThingDef): Thing {
    const container = new Container();
    container.get();
  };
};
