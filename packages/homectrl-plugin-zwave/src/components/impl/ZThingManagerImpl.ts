import { injectable, inject, singleton, provides } from "microinject";
import { ZWaveController } from "zwave-js/build/lib/controller/Controller";
import { ZWaveNode } from "zwave-js";

import { ZWaveProvider } from "../ZWaveProvider";
import { ZThingManager } from "../ZThingManager";
import { ZThingAdapterFactory } from "../ZThingAdapterFactory";
import { ZThingAdapter } from "../ZThingAdapter";

@injectable()
@provides(ZThingManager)
@singleton()
export class ZThingManagerImpl implements ZThingManager {
  private _adaptersByNodeId = new Map<number, ZThingAdapter>();

  constructor(
    @inject(ZWaveProvider) zWaveProvider: ZWaveProvider,
    @inject(ZThingAdapterFactory)
    private _adapterFactory: ZThingAdapterFactory
  ) {
    zWaveProvider.getController().then(controller => this._start(controller));
  }

  private _start(controller: ZWaveController) {
    for (const node of controller.nodes.values()) {
      this._onNodeAdded(node);
    }

    controller.on("node added", this._onNodeAdded.bind(this));
    controller.on("node removed", this._onNodeRemoved.bind(this));
  }

  private _onNodeAdded(node: ZWaveNode): void {
    const adapter = this._adapterFactory.createAdapter(node);
    this._adaptersByNodeId.set(node.id, adapter);
  }

  private _onNodeRemoved(node: ZWaveNode) {
    const adapter = this._adaptersByNodeId.get(node.id);
    if (adapter) {
      this._adaptersByNodeId.delete(node.id);
      adapter.destroy();
    }
  }
}
