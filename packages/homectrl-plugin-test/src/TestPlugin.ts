import {
  MozIotPlugin,
  MozIotPluginContext,
  ThingActionRequestStatus,
  ThingActionRequestToken
} from "homectrl-moziot";

export class TestPlugin implements MozIotPlugin {
  readonly id: string = "test-plugin";

  onRegisterPlugin(plugin: MozIotPluginContext): void {
    plugin.addThing(
      {
        title: "Test Thing 1",
        description: "This is a test thing"
      },
      {
        capabilityType: "type",
        type: "TestThing"
      },
      {
        capabilityType: "action",
        title: "Test action",
        description: "This is a Test Action",
        semanticType: "TestAction",
        input: { type: "null" },
        onActionInvocationRequested: async (
          thingId: string,
          actionId: string,
          input: any,
          token: ThingActionRequestToken
        ) => {
          console.log("Test action pending");

          await wait(1000);
          token.setStatus(ThingActionRequestStatus.Started);
          console.log("Test action started");

          await wait(1000);
          token.setStatus(ThingActionRequestStatus.Completed);
          console.log("Test action completed");
        }
      },
      {
        capabilityType: "property",
        title: "Test property",
        description: "This is a Test Property",
        type: "string",
        initialValue: "hello",
        onValueChangeRequested: (
          thingId: string,
          propertyId: string,
          value: any
        ) => {
          console.log("Test value changed");
          plugin.setPropertyValue(thingId, propertyId, value);
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
