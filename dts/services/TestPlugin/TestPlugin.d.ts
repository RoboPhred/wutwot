import { MozIotPlugin, MozIotPluginContext } from "../MozIot";
export declare class TestPlugin implements MozIotPlugin {
    readonly id: string;
    onRegisterPlugin(plugin: MozIotPluginContext): void;
}
