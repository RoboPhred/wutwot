import { ZWaveNode } from "zwave-js";
import { Endpoint } from "zwave-js/build/lib/node/Endpoint";
import { CommandClasses } from "zwave-js/build/lib/commandclass/CommandClasses";
import { ValueUpdatedArgs } from "zwave-js/build/lib/node/ValueDB";
import { CentralSceneKeys } from "zwave-js/build/lib/commandclass/CentralSceneCC";
import { PluginThing } from "homectrl-moziot";
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

  constructor(endpoint: Endpoint, thing: PluginThing) {
    this._node = endpoint.getNodeUnsafe()!;
    this._node.on("value updated", this._onValueUpdated);

    thing.addEvent({
      title: "Central Scene Triggered",
      // TODO: Not an official moz wot type.  They only have press and long press, neither of which fit.
      //  We need to make our own standard.
      semanticType: "CentralScene",
      description: "Raised when this device triggers a scene.",
      type: "object",
      // TODO: properties
      eventSource: this._eventSubject,
    });
  }

  destroy() {
    this._node.removeListener("value updated", this._onValueUpdated);
  }

  @autobind()
  private _onValueUpdated(node: ZWaveNode, e: ValueUpdatedArgs) {
    if (e.commandClass !== CommandClasses["Central Scene"]) {
      return;
    }

    const key = e.newValue as number;

    this._eventSubject.next({
      scene: Number(e.propertyKey),
      key,
      keyName: CentralSceneKeys[key],
    });
  }
}
