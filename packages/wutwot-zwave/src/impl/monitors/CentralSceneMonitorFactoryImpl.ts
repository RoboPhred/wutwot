import {
  ZWaveNode,
  ZWaveNodeValueUpdatedArgs,
  CentralSceneKeys,
} from "zwave-js";
import { CommandClasses } from "@zwave-js/core";
import { Endpoint } from "zwave-js/build/lib/node/Endpoint";
import { PluginThing } from "@wutwot/core";
import { injectable, singleton, provides } from "microinject";
import { Subject } from "rxjs";
import { autobind } from "core-decorators";

import { ZWaveEndpointMonitor } from "../../types";
import { ZWaveEndpointMonitorFactory } from "../../contracts";

@injectable()
@provides(ZWaveEndpointMonitorFactory)
@singleton()
export class CentralSceneMonitorFactoryImpl
  implements ZWaveEndpointMonitorFactory {
  createMonitor(
    endpoint: Endpoint,
    thing: PluginThing,
  ): ZWaveEndpointMonitor | null {
    if (!endpoint.commandClasses["Central Scene"].isSupported()) {
      return null;
    }

    return new CentralSceneMonitorImpl(endpoint, thing);
  }
}

interface CentralSceneEventData {
  scene: number;
  key: number;
  keyName: string;
}
class CentralSceneMonitorImpl implements ZWaveEndpointMonitor {
  private _eventSubject = new Subject<CentralSceneEventData>();
  private _node: ZWaveNode;

  constructor(private _endpoint: Endpoint, thing: PluginThing) {
    this._node = _endpoint.getNodeUnsafe()!;
    this._node.on("value updated", this._onValueUpdated);

    thing.addEvent({
      pluginLocalId: "central-scene-triggered",
      title: "Central Scene Triggered",
      // TODO: Not an official moz wot type.  They only have press and long press, neither of which fit.
      //  We need to make our own standard and use their extension mechanism.
      semanticType: "CentralScene",
      description: "Raised when this device triggers a scene.",
      data: {
        type: "object",
        properties: {
          scene: { type: "number" },
          key: { type: "number" },
          keyName: { type: "string" },
        },
      },
      eventSource: this._eventSubject,
    });
  }

  destroy() {
    this._node.removeListener("value updated", this._onValueUpdated);
  }

  @autobind()
  private _onValueUpdated(node: ZWaveNode, e: ZWaveNodeValueUpdatedArgs) {
    if (e.commandClass !== CommandClasses["Central Scene"]) {
      return;
    }

    // At one point, zwave-js was sending us endpoint info.
    //  However, it no longer does so.  Is Central Scene is always in endpoint 0?

    const key = e.newValue as number;

    this._eventSubject.next({
      scene: Number(e.propertyKey),
      key,
      keyName: CentralSceneKeys[key],
    });
  }
}
