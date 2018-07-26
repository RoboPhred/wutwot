import { injectable, ServiceFactory, Context, Container } from "microinject";

import { ThingDef } from "../../../contracts/ThingSource";

import { ThingFactory } from "../ThingFactory";
import { Thing } from "../Thing";
import { ThingImpl } from "./ThingImpl";
import { ActionAggregator } from "../../ActionAggregator/ActionAggregator";

@injectable(ThingFactory)
export class ThingFactoryImpl implements ThingFactory {
  createThing(def: ThingDef): Thing {}
}

const thingFactoryFactory: ServiceFactory = (context: Context) => {
  // Current feature set does not entirely play nice with
  //  dynamic factories and constructor params.
  // https://github.com/RoboPhred/node-microinject/issues/1
  return function thingFactory(def: ThingDef): Thing {
    const container = new Container();
    const actionAggregator = container.get(ActionAggregator);
    return new ThingImpl(def, actionAggregator);
  };
};
