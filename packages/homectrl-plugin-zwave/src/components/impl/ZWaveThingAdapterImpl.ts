import { injectable, inject, singleton, provides } from "microinject";
import { ZWaveController } from "zwave-js/build/lib/controller/Controller";

import { ZWaveProvider } from "../ZWaveProvider";
import { NodeMonitorFactory } from "../NodeMonitorFactory";
import { ZWaveThingAdapter } from "../ZWaveThingAdapter";

@injectable()
@provides(ZWaveThingAdapter)
@singleton()
export class ZWaveThingAdapterImpl {
  constructor(
    @inject(ZWaveProvider) zWaveProvider: ZWaveProvider,
    @inject(NodeMonitorFactory) private _nodeMonitorFactory: NodeMonitorFactory
  ) {
    zWaveProvider.getController().then(controller => this._start(controller));
  }

  private _start(controller: ZWaveController) {
    for (const node of controller.nodes.values()) {
      this._nodeMonitorFactory.createNodeMonitor(node);
    }
  }
}
