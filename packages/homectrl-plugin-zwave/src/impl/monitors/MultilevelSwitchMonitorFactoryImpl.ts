import { injectable, provides, singleton } from "microinject";
import { autobind } from "core-decorators";
import { ZWaveNode } from "zwave-js";
import { CommandClasses } from "zwave-js/build/lib/commandclass/CommandClasses";
import { ValueMetadataNumeric } from "zwave-js/build/lib/values/Metadata";
import { PluginThing } from "homectrl-moziot";
import { Subject } from "rxjs";
import {
  TranslatedValueID,
  ZWaveNodeValueUpdatedArgs
} from "zwave-js/build/lib/node/Types";

import { ZThingMonitor } from "../../types";
import { ZThingMonitorFactory } from "../../contracts";

@injectable()
@provides(ZThingMonitorFactory)
@singleton()
export class MultilevelSwitchMonitorFactoryImpl
  implements ZThingMonitorFactory {
  createMonitor(node: ZWaveNode, thing: PluginThing): ZThingMonitor | null {
    if (!node.supportsCC(CommandClasses["Multilevel Switch"])) {
      return null;
    }
    return new MultilevelSwitchMonitorImpl(node, thing);
  }
}

class MultilevelSwitchMonitorImpl implements ZThingMonitor {
  private _subjectsByEndpoint = new Map<number, Subject<number>>();

  constructor(private _node: ZWaveNode, private _thing: PluginThing) {
    // TODO: Capture and log errors
    this._setupEndpoints();
  }

  destroy() {}

  private _setupEndpoints() {
    this._thing.addSemanticType("MultiLevelSwitch");

    const basicValues = this._node
      .getDefinedValueIDs()
      .filter(
        value =>
          value.commandClass === CommandClasses["Multilevel Switch"] &&
          value.property === "targetValue"
      );

    for (let i = 0; i < basicValues.length; i++) {
      const value = basicValues[i];
      this._setupSwitch(value, basicValues.length > 1, i);
    }

    this._node.on("value updated", this._onValueUpdated);
  }

  private _setupSwitch(
    valueId: TranslatedValueID,
    multi: boolean,
    index: number
  ) {
    const initialValue = this._node.getValue({
      ...valueId,
      property: "currentValue"
    });
    const metadata = this._node.getValueMetadata(
      valueId
    ) as ValueMetadataNumeric;
    const subject = new Subject<number>();

    this._subjectsByEndpoint.set(valueId.endpoint ?? -1, subject);

    this._thing.addProperty({
      title: multi ? `Switch ${index + 1}` : "Switch",
      description: metadata.description || "",
      semanticType: "LevelProperty",
      type: "number",
      minimum: metadata.min ?? 0,
      maximum: metadata.max ?? 99,
      initialValue,
      values: subject,
      onValueChangeRequested: (thingId, propertyId, value) => {
        this._node.setValue(valueId, value);
      }
    });
  }

  @autobind()
  private _onValueUpdated(node: ZWaveNode, e: ZWaveNodeValueUpdatedArgs) {
    const { commandClass, propertyName, endpoint, newValue } = e;
    if (
      commandClass !== CommandClasses["Multilevel Switch"] ||
      propertyName !== "currentValue"
    ) {
      return;
    }

    const subject = this._subjectsByEndpoint.get(endpoint ?? -1);
    if (!subject) {
      return;
    }

    subject.next(newValue as number);
  }
}
