import { Observable, Observer } from "rxjs";

import {
  ZWave,
  ZWaveValue,
  ZWaveValueChangedEvent,
  areValuesSame,
  ZWaveValueRemovedEvent
} from "../../../ZWave";
import { Thing, MozIotPluginContext } from "../../../MozIot";

export class ColorPropertyMonitorImpl {
  constructor(
    zWaveValue: ZWaveValue,
    thing: Thing,
    zwave: ZWave,
    plugin: MozIotPluginContext
  ) {
    plugin.addCapability(thing.id, {
      capabilityType: "type",
      type: "ColorControl"
    });

    // this._zwave.enablePolling(value);
    let isRemoved = false;
    const values = Observable.create((o: Observer<string>) => {
      function handleChange({ value: changedValue }: ZWaveValueChangedEvent) {
        if (!areValuesSame(zWaveValue, changedValue)) {
          return;
        }
        o.next(String(changedValue.value));
      }
      function handleRemove({
        nodeId,
        commandClass,
        index
      }: ZWaveValueRemovedEvent) {
        if (
          zWaveValue.node_id !== nodeId ||
          zWaveValue.class_id !== commandClass ||
          zWaveValue.index !== index
        ) {
          return;
        }
        unsub();
      }
      const unsub = () => {
        o.complete();
        zwave.removeListener("value.changed", handleChange);
        zwave.removeListener("value.removed", handleRemove);
        isRemoved = true;
        // TODO: remove property and OnOffSwitch type
      };
      zwave.on("value.changed", handleChange);
      zwave.on("value.removed", handleRemove);
    });

    plugin.addCapability(thing.id, {
      capabilityType: "property",
      title: zWaveValue.label || "Switch",
      description: zWaveValue.label,
      semanticType: "ColorProperty",
      type: "string",
      initialValue: zWaveValue.value,
      values,
      onValueChangeRequested: (
        thingId: string,
        propertyId: string,
        value: boolean
      ) => {
        if (isRemoved) {
          return;
        }
        zwave.setValue(zWaveValue, value);
      }
    });
  }
}
