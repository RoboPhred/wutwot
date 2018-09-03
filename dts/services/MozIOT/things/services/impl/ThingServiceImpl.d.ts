import { Thing } from "../../types";
import { ThingFactory, ThingRepository } from "../../components";
import { ThingService } from "../ThingService";
export declare class ThingServiceImpl implements ThingService {
    private _factory;
    private _repository;
    constructor(_factory: ThingFactory, _repository: ThingRepository);
    addThing(def: Thing, owner: object): Thing;
    removeThing(thingId: string): void;
    getThing(thingId: string): Thing | undefined;
    getThings(): Thing[];
}
