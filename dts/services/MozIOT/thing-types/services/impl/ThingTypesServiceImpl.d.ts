import { ThingTypesService } from "../ThingTypesService";
export declare class ThingTypesServiceImpl implements ThingTypesService {
    private _capabilities;
    addType(thingId: string, type: string): void;
    getTypes(thingId: string): string[];
}
