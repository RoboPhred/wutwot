import {
  MozIotPlugin,
  MozIotPluginContext,
  ThingActionRequestStatus,
  ThingPropertyCapabilityDef,
  ThingActionCapabilityDef,
  ThingPropertyType
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
      createTestAction("Test Action", "This is a Test Action"),
      createTestProperty("Test Property", "This is a Test Property"),
      createTestProperty("OnOff", "An On/Off property", {
        initialValue: false,
        type: "boolean",
        semanticType: "OnOffProperty"
      })
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
      var status = new Subject<ThingActionRequestStatus>();
      const doWork = async () => {
        console.log("Test action pending");

        await wait(1000);
        console.log("Test action started");
        status.next(ThingActionRequestStatus.Started);

        await wait(1000);
        console.log("Test action completed");
        // Will auto advance status to Completed
        status.complete();
      };
      doWork().catch(e => status.error(e));
      return status;
    }
  };
}

export interface PropertyOpts {
  type?: ThingPropertyType;
  initialValue?: any;
  semanticType?: string;
}
function createTestProperty(
  title: string,
  description: string,
  opts: PropertyOpts = {}
): ThingPropertyCapabilityDef {
  const values = new Subject<string>();
  return {
    capabilityType: "property",
    title,
    description,
    type: opts.type || "string",
    initialValue: opts.initialValue || "hello",
    semanticType: opts.semanticType || undefined,
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
