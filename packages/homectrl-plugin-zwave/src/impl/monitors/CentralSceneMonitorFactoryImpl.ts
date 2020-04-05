import { ZWaveNode } from "zwave-js";
import { CommandClasses } from "zwave-js/build/lib/commandclass/CommandClasses";
import { ValueUpdatedArgs } from "zwave-js/build/lib/node/ValueDB";
import { CentralSceneKeys } from "zwave-js/build/lib/commandclass/CentralSceneCC";
import { PluginThing } from "homectrl-moziot";
import { injectable, singleton, provides } from "microinject";
import { Subject } from "rxjs";
import { autobind } from "core-decorators";

import { ZThingMonitor } from "../../types";
import { ZThingMonitorFactory } from "../../contracts";

@injectable()
@provides(ZThingMonitorFactory)
@singleton()
export class CentralSceneMonitorFactoryImpl implements ZThingMonitorFactory {
  createMonitor(node: ZWaveNode, thing: PluginThing): ZThingMonitor | null {
    if (!node.supportsCC(CommandClasses["Central Scene"])) {
      return null;
    }

    return new CentralSceneMonitorImpl(node, thing);
  }
}

interface CentralSceneEventData {
  scene: number;
  key: number;
  keyName: string;
}
class CentralSceneMonitorImpl implements ZThingMonitor {
  private _eventSubject = new Subject<CentralSceneEventData>();

  constructor(private _node: ZWaveNode, thing: PluginThing) {
    _node.on("value updated", this._onValueUpdated);

    thing.addEvent({
      title: "Central Scene Triggered",
      // TODO: Not an official moz wot type.  They only have press and long press, neither of which fit.
      semanticType: "CentralScene",
      description: "Raised when this device triggers a scene.",
      type: "object",
      // TODO: properties
      eventSource: this._eventSubject
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
      keyName: CentralSceneKeys[key]
    });
  }
}
