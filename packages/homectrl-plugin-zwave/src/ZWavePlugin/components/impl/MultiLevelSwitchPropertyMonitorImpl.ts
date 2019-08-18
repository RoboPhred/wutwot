import { MozIotPluginContext, Thing } from "homectrl-moziot";
import { Observable, Observer } from "rxjs";

import {
  ZWave,
  ZWaveValue,
  ZWaveEventSource,
  ZWaveValueChangedEvent,
  areValuesSame,
  ZWaveValueRemovedEvent
} from "../../../ZWave";

export class MultiLevelSwitchPropertyMonitorImpl {
  constructor(
    zWaveValue: ZWaveValue,
    thing: Thing,
    zwave: ZWave,
    zwaveEvents: ZWaveEventSource,
    plugin: MozIotPluginContext
  ) {
    plugin.addCapability(
      thing.id,
      {
        capabilityType: "type",
        type: "OnOffSwitch"
      },
      {
        capabilityType: "type",
        type: "MultiLevelSwitch"
      }
    );

    let isRemoved = false;
    const levelValues = Observable.create((o: Observer<number>) => {
      function handleChange({ value: changedValue }: ZWaveValueChangedEvent) {
        if (!areValuesSame(zWaveValue, changedValue)) {
          return;
        }
        o.next(Number(changedValue.value));
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
        zwaveEvents.removeListener("value.changed", handleChange);
        zwaveEvents.removeListener("value.removed", handleRemove);
        isRemoved = true;
        // TODO: remove property and MultiLevelSwitch type
      };
      zwaveEvents.on("value.changed", handleChange);
      zwaveEvents.on("value.removed", handleRemove);
    });

    const onOffValues = Observable.create((o: Observer<boolean>) => {
      function handleChange({ value: changedValue }: ZWaveValueChangedEvent) {
        if (!areValuesSame(zWaveValue, changedValue)) {
          return;
        }
        o.next(changedValue.value > 0);
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
        zwaveEvents.removeListener("value.changed", handleChange);
        zwaveEvents.removeListener("value.removed", handleRemove);
        isRemoved = true;
        // TODO: remove property and MultiLevelSwitch type
      };
      zwaveEvents.on("value.changed", handleChange);
      zwaveEvents.on("value.removed", handleRemove);
    });

    plugin.addCapability(
      thing.id,
      {
        capabilityType: "property",
        title: "Level", //value.label || "unnamed",
        description: zWaveValue.label,
        semanticType: "LevelProperty",
        type: "integer",
        minimum: 0,
        maximum: 255,
        initialValue: Number(zWaveValue.value),
        values: levelValues,
        onValueChangeRequested: (
          thingId: string,
          propertyId: string,
          value: number
        ) => {
          if (isRemoved) {
            return;
          }
          zwave.setValue(zWaveValue, Number(value));
        }
      },
      {
        capabilityType: "property",
        title: "Switch", //value.label || "unnamed",
        description: zWaveValue.label,
        semanticType: "OnOffProperty",
        type: "boolean",
        initialValue: zWaveValue.value > 0,
        values: onOffValues,
        onValueChangeRequested: (
          thingId: string,
          propertyId: string,
          value: number
        ) => {
          if (isRemoved) {
            return;
          }
          zwave.setValue(zWaveValue, value ? 255 : 0);
        }
      }
    );
  }
}
