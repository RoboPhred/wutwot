import { injectable, singleton, provides, inject } from "microinject";

import { Thing } from "../../types";
import { ThingFactory, ThingRepository } from "../../components";

import { ThingService } from "../ThingService";

@injectable()
@singleton()
@provides(ThingService)
export class ThingServiceImpl implements ThingService {
  constructor(
    @inject(ThingFactory) private _factory: ThingFactory,
    @inject(ThingRepository) private _repository: ThingRepository
  ) {}

  addThing(def: Thing, owner: object): Thing {
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
