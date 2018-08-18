import { injectable, inject } from "microinject";

import { ActionAggregator } from "../../../actions";

import { ThingContext } from "../../contracts";

import { ThingFactory } from "../ThingFactory";
import { Thing } from "../Thing";
import { ThingImpl } from "./ThingImpl";

@injectable(ThingFactory)
export class ThingFactoryImpl implements ThingFactory {
  constructor(
    @inject(ActionAggregator) private _actionAggregator: ActionAggregator
  ) {}

  createThing(context: ThingContext): Thing {
    return new ThingImpl(context, this._actionAggregator);
  }
}
