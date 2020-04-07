import { singleton, inject, injectable } from "microinject";
import { ThingEventSource, ThingAddedEventArgs } from "homectrl-moziot";
import { METADATA_ZWAVE_NODE } from "homectrl-plugin-zwave";
import type { ZWaveNode } from "zwave-js";

@injectable()
@singleton()
export class ZAssociationManagerImpl {
  constructor(
    @inject(ThingEventSource)
    thingEventSource: ThingEventSource,
  ) {
    thingEventSource.on("thing.add", this._onThingAdded.bind(this));
  }

  private _onThingAdded(e: ThingAddedEventArgs) {
    const { thing } = e;
    const node = e.thing.metadata[METADATA_ZWAVE_NODE] as ZWaveNode;
  }
}
