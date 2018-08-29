import { ThingDef, Thing } from "../../types";
import { ThingFactory } from "../ThingFactory";
export declare class ThingFactoryImpl implements ThingFactory {
    createThing(def: ThingDef, ownerId: string): Thing;
}
