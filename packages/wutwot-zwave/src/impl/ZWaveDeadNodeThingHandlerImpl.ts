import { OwnedPluginThing, PluginThingsManager } from "@wutwot/core";
import { ZWaveNode } from "zwave-js";

import { ZWaveThingHandler } from "../components";
import { METADATA_ZWAVE_NODE } from "../metadata-keys";

export class ZWaveDeadNodeHandlerImpl implements ZWaveThingHandler {
  private _thing: OwnedPluginThing;

  constructor(node: ZWaveNode, private _thingsManager: PluginThingsManager) {
    this._thing = this._thingsManager.addThing({
      pluginLocalId: `${node.id}-0`,
      defaultTitle: `Node ${node.id}`,
      defaultDescription: "Unresponsive Node",
      metadata: {
        [METADATA_ZWAVE_NODE]: node,
      },
    });
  }

  destroy(): void {
    this._thing.delete();
  }
}
