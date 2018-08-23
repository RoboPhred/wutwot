import { Identifier } from "microinject";
export declare const ActionPluginManager: Identifier<ActionPluginManager>;
export interface ActionPluginManager {
    run(): void;
}
