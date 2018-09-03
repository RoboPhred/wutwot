import { Identifier } from "microinject";
export declare const ThingTypesService: Identifier<ThingTypesService>;
export interface ThingTypesService {
    addType(thingId: string, type: string): void;
    getTypes(thingId: string): string[];
}
