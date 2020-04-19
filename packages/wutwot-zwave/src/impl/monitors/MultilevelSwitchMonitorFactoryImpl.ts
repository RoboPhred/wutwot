import { injectable, provides, singleton } from "microinject";
import { autobind } from "core-decorators";
import { ZWaveNode } from "zwave-js";
import { ZWaveNodeValueUpdatedArgs } from "zwave-js/build/lib/node/Node";
import { CommandClasses } from "zwave-js/build/lib/commandclass/CommandClasses";
import { ValueMetadataNumeric } from "zwave-js/build/lib/values/Metadata";
import { PluginThing } from "@wutwot/core";
import { Subject } from "rxjs";

import { ZWaveEndpointMonitor } from "../../types";
import { ZWaveEndpointMonitorFactory } from "../../contracts";
import { Endpoint } from "zwave-js/build/lib/node/Endpoint";
import { ValueID } from "zwave-js/build/lib/node/ValueDB";

@injectable()
@provides(ZWaveEndpointMonitorFactory)
@singleton()
export class MultilevelSwitchMonitorFactoryImpl
  implements ZWaveEndpointMonitorFactory {
  createMonitor(
    endpoint: Endpoint,
    thing: PluginThing,
  ): ZWaveEndpointMonitor | null {
    if (!endpoint.commandClasses["Multilevel Switch"].isSupported()) {
      return null;
    }
    return new MultilevelSwitchMonitorImpl(endpoint, thing);
  }
}

class MultilevelSwitchMonitorImpl implements ZWaveEndpointMonitor {
  private _subject = new Subject<number>();
  private _node: ZWaveNode;

  constructor(endpoint: Endpoint, private _thing: PluginThing) {
    this._node = endpoint.getNodeUnsafe()!;

    this._thing.addSemanticType("MultiLevelSwitch");

    const valueId: ValueID = {
      commandClass: CommandClasses["Multilevel Switch"],
      property: "targetValue",
      endpoint: endpoint.index,
    };

    const initialValue = this._node.getValue({
      ...valueId,
      property: "currentValue",
    });
    const metadata = this._node.getValueMetadata(
      valueId,
    ) as ValueMetadataNumeric;

    this._thing.addProperty({
      pluginLocalId: "multilevel-switch",
      title: "Switch",
      description: metadata.description,
      semanticType: "LevelProperty",
      type: "number",
      minimum: metadata.min ?? 0,
      maximum: metadata.max ?? 99,
      initialValue,
      values: this._subject,
      onValueChangeRequested: (thingId, propertyId, value) => {
        this._node.setValue(valueId, value);
      },
    });

    this._node.on("value updated", this._onValueUpdated);
  }

  destroy() {
    this._node.removeListener("value updated", this._onValueUpdated);
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

    this._subject.next(newValue as number);
  }
}
