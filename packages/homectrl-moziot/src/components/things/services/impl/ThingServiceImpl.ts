import { injectable, singleton, provides, inject } from "microinject";

import { Thing, ThingDef } from "../../types";
import { InternalThingFactory, ThingRepository } from "../../components";

import { ThingService } from "../ThingService";

@injectable()
@singleton()
@provides(ThingService)
export class ThingServiceImpl implements ThingService {
  constructor(
    @inject(InternalThingFactory) private _factory: InternalThingFactory,
    @inject(ThingRepository) private _repository: ThingRepository
  ) {}

  addThing(def: ThingDef, owner: object): Thing {
    const thing = this._factory.createThing(def, owner);
    this._repository.addThing(thing);
    return thing;
  }
  removeThing(thingId: string): void {
    this._repository.removeThing(thingId);
  }

  getThing(thingId: string): Thing | undefined {
    return this._repository.get(thingId);
  }

  getThings(): Thing[] {
    return Array.from(this._repository);
  }
}
