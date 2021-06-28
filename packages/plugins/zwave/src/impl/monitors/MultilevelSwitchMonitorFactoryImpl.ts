import { injectable, provides, singleton } from "microinject";
import { autobind } from "core-decorators";
import {
  ZWaveNode,
  ZWaveNodeValueUpdatedArgs,
  ValueMetadataNumeric,
  ValueID,
} from "zwave-js";
import { Endpoint } from "zwave-js/build/lib/node/Endpoint";
import { CommandClasses, ZWaveError } from "@zwave-js/core";
import { PluginThing, PropertySetError } from "@wutwot/core";
import { Subject } from "rxjs";

import { ZWaveEndpointMonitor } from "../../types";
import { ZWaveEndpointMonitorFactory } from "../../contracts";

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

    const initialValue =
      this._node.getValue({
        ...valueId,
        property: "currentValue",
      }) ?? null;
    const metadata = this._node.getValueMetadata(
      valueId,
    ) as ValueMetadataNumeric;

    this._thing.addProperty({
      pluginLocalId: "multilevel-switch",
      title: "Level",
      description: metadata.description,
      semanticType: "LevelProperty",
      type: "number",
      minimum: metadata.min ?? 0,
      maximum: metadata.max ?? 99,
      initialValue,
      values: this._subject,
      onValueChangeRequested: async (thingId, propertyId, value) => {
        try {
          await this._node.setValue(valueId, value);
        } catch (e) {
          if (e instanceof ZWaveError) {
            // Do we really gain anything by wrapping this?
            const err = new PropertySetError(e.message);
            err.stack = e.stack;
            throw e;
          }
        }
      },
    });

    this._node.on("value updated", this._onValueUpdated);
  }

  destroy() {
    // TODO: Remove properties
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
