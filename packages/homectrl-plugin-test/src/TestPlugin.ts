import {
  MozIotPlugin,
  MozIotPluginContext,
  ThingActionRequestStatus,
  ThingActionRequestToken,
  ThingPropertyCapabilityDef
} from "homectrl-moziot";

import { Subject } from "rxjs";

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
      createTestProperty("Test Property", "This is a Test Property")
    );
  }
}

function createTestProperty(
  title: string,
  description: string
): ThingPropertyCapabilityDef {
  const values = new Subject<string>();
  return {
    capabilityType: "property",
    title,
    description,
    type: "string",
    initialValue: "hello",
    values,
    onValueChangeRequested: (
      thingId: string,
      propertyId: string,
      value: any
    ) => {
      console.log("Test value changed");
      values.next(value);
    }
  };
}

function wait(delay: number): Promise<void> {
  return new Promise(accept => {
    setTimeout(accept, delay);
  });
}
