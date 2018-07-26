import { ThingDef } from "../../../contracts/ThingSource";
import { ThingFactory } from "../ThingFactory";
import { Thing } from "../Thing";
export declare class ThingFactoryImpl implements ThingFactory {
    createThing(def: ThingDef): Thing;
}
