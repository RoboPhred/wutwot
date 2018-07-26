import { Identifier } from "microinject";
import { ThingDef } from "../../contracts/ThingSource";
import { Thing } from "./Thing";
export declare const ThingFactory: Identifier<ThingFactory>;
export declare type ThingFactory = (def: ThingDef) => Thing;
