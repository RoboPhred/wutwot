import { EventEmitter } from "events";

import { inject, injectable } from "microinject";

import { ThingSource, ThingDef } from "../../../contracts/ThingSource";

import { Thing } from "../Thing";
import { ThingFactory } from "../ThingFactory";
import { ThingManager } from "../ThingManager";
import { ThingAggregator } from "../ThingAggregator";

@injectable(ThingManager)
export class ThingManagerImpl extends EventEmitter implements ThingManager {
  constructor(
    @inject(ThingFactory) private _thingFactory: ThingFactory,
    @inject(ThingAggregator) private _thingAggregator: ThingAggregator
  ) {
    super();
  }

  get things(): ReadonlyArray<Thing> {
    const thingDefs = this._thingAggregator.things;
    const thingImpls = thingDefs.map(x => this._thingFactory.createThing(x));
    return Object.freeze(thingImpls);
  }
}
