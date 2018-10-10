import {
  MozIotPlugin,
  MozIotPluginContext,
  ThingActionRequestStatus
} from "homectrl-moziot";

export class TestPlugin implements MozIotPlugin {
  readonly id: string = "test-plugin";

  onRegisterPlugin(plugin: MozIotPluginContext): void {
    plugin.addThing(
      {
        name: "Test Thing 1",
        description: "This is a test thing"
      },
      {
        capabilityType: "type",
        type: "TestThing"
      },
      {
        capabilityType: "action",
        label: "Test action",
        description: "This is a Test Action",
        input: { type: "null" },
        request: async (input, token) => {
          console.log("Test action pending");

          await wait(1000);
          token.setStatus(ThingActionRequestStatus.Started);
          console.log("Test action started");

          await wait(1000);
          token.setStatus(ThingActionRequestStatus.Completed);
          console.log("Test action completed");
        }
      }
    );
  }
}

function wait(delay: number): Promise<void> {
  return new Promise(accept => {
    setTimeout(accept, delay);
  });
}
