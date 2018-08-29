import { MozIotPlugin, MozIotPluginContext } from "../MozIot";

export class TestPlugin implements MozIotPlugin {
  readonly id: string = "test-plugin";

  onRegisterPlugin(plugin: MozIotPluginContext): void {
    plugin.addThing({
      name: "test-thing-1",
      description: ""
    });
  }
}
