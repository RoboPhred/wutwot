import { ActionService } from "../../../actions";
import { ThingDef, Thing } from "../../types";
import { ThingFactory } from "../ThingFactory";
import { ThingTypesService } from "../../../thing-types";
export declare class ThingFactoryImpl implements ThingFactory {
    private _thingTypesService;
    private _actionService;
    private _idMapper;
    constructor(_thingTypesService: ThingTypesService, _actionService: ActionService);
    createThing(def: ThingDef, owner: object): Thing;
}
