import {
  MozIotPlugin,
  MozIotPluginContext,
  ThingActionRequestStatus,
  ThingPropertyCapabilityDef,
  ThingActionCapabilityDef
} from "homectrl-moziot";

import { Subject, of, merge } from "rxjs";
import { map, delay } from "rxjs/operators";

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
      createTestAction("Test Action", "This is a Test Action"),
      createTestProperty("Test Property", "This is a Test Property")
    );
  }
}

function createTestAction(
  title: string,
  description: string
): ThingActionCapabilityDef {
  return {
    capabilityType: "action",
    title,
    description,
    semanticType: "TestAction",
    input: { type: "null" },
    onActionInvocationRequested: (
      thingId: string,
      actionId: string,
      input: any
    ) => {
      // TODO: There should be a more intuitive way of mixing promises (delays) and observables.
      // Probably write a generator iterator that resolves promises but forwards values out of an observable.
      //  ...Probably something like that in rxjs already, but I couldn't find it.
      console.log("Test action pending");
      const dummy = of(null);
      return merge(
        dummy.pipe(
          delay(1000),
          map(x => {
            console.log("Test action started");
            return ThingActionRequestStatus.Started;
          })
        ),
        dummy.pipe(
          delay(2000),
          map(x => {
            console.log("Test action completed");
            return ThingActionRequestStatus.Completed;
          })
        )
      );
    }
  };
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
