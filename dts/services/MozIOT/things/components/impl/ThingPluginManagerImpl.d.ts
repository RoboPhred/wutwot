import { ThingProviderPlugin } from "../../contracts";
import { ThingRepository } from "../ThingRepository";
export declare class ThingPluginManagerImpl {
    private readonly _providers;
    private readonly _ids;
    constructor(thingProviders: ThingProviderPlugin[], repository: ThingRepository);
}
