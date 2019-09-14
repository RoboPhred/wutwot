import { injectable, inject, singleton } from "microinject";
import { merge } from "lodash";

import OZW, { NodeInfo, Value, ValueId } from "openzwave-shared";

import { AdapterDiscoverer } from "./components/AdapterDiscoverer";
import { ZWaveEventSource } from "./components/ZWaveEventSource";

import { ZWaveNode } from "./types";
import { ZWavePortConfig } from "./config";
import {
  ZWaveEventEmitter,
  ZWaveNodeAddedEvent,
  ZWaveNodeRemovedEvent,
  ZWaveValueAddedEvent,
  ZWaveValueChangedEvent,
  ZWaveValueRemovedEvent
} from "./events";
import { ZWaveEventSink } from "./components/ZWaveEventSink";

@injectable()
@singleton()
export class ZWave implements ZWaveEventEmitter {
  private _zwave: OZW;

  private _nodes: Record<number, ZWaveNode> = {};

  constructor(
    @inject(AdapterDiscoverer) private _adapterDiscoverer: AdapterDiscoverer,
    @inject(ZWavePortConfig, { optional: true })
    private _configuredPort: string | null,
    @inject(ZWaveEventSource) private _eventSource: ZWaveEventSource,
    @inject(ZWaveEventSink) private _eventSink: ZWaveEventSink
  ) {
    this._zwave = new OZW({
      Logging: false,
      ConsoleOutput: false,
      UserPath: process.cwd()
    });
  }

  async start() {
    let port: string | null = this._configuredPort;
    if (!port) {
      console.log("Auto-determining zwave port");
      port = await this._adapterDiscoverer.getAdapterPort();
    } else {
      console.log("Using preconfigured zwave port");
    }

    if (!port) {
      throw new Error("No adapter port could be found");
    } else {
      console.log("Connecting to zwave adapter on port", port);
    }

    this._zwave.connect(port);

    this._zwave.on("node available", (nodeId: number, nodeInfo: NodeInfo) => {
      merge(this._nodes, {
        [nodeId]: {
          id: nodeId,
          classes: {},
          ...nodeInfo
        }
      });
      console.log("available", nodeId);
    });
    this._zwave.on("node ready", (nodeId: number, nodeInfo: NodeInfo) => {
      merge(this._nodes, {
        [nodeId]: {
          id: nodeId,
          classes: {},
          ...nodeInfo
        }
      });
      console.log("ready", nodeId);
      this._eventSink.onNodeAdded(this._nodes[nodeId]);
    });
    this._zwave.on(
      "value added",
      (nodeId: number, comclass: number, value: Value) => {
        merge(this._nodes, {
          [nodeId]: {
            classes: {
              [comclass]: {
                [value.index]: {
                  [value.instance]: value
                }
              }
            }
          }
        });
        console.log("value added", nodeId, value.label, comclass, value.index);
        this._eventSink.onValueAdded(value);
      }
    );
    this._zwave.on(
      "value changed",
      (nodeId: number, comclass: number, value: Value) => {
        merge(this._nodes, {
          [nodeId]: {
            classes: {
              [comclass]: {
                [value.index]: {
                  [value.instance]: value
                }
              }
            }
          }
        });
        console.log(
          "value changed",
          nodeId,
          value.label,
          comclass,
          value.index
        );
        this._eventSink.onValueChanged(value);
      }
    );
    this._zwave.on(
      "value removed",
      (nodeId: number, comclass: number, index: number) => {
        delete this._nodes[nodeId].classes[comclass][index];
        console.log("value removed", nodeId, comclass, index);
        this._eventSink.onValueRemoved(nodeId, comclass, index);
      }
    );
    this._zwave.on("node removed", (nodeid: number) => {
      delete this._nodes[nodeid];
    });
  }

  setValue(valueId: ValueId, value: string | number | boolean): void {
    this._zwave.setValue(valueId, value);
  }

  enablePolling(valueId: ValueId): void {
    this._zwave.enablePoll(valueId);
  }

  on(event: "node.added", handler: (e: ZWaveNodeAddedEvent) => void): this;
  on(event: "node.removed", handler: (e: ZWaveNodeRemovedEvent) => void): this;
  on(event: "value.added", handler: (e: ZWaveValueAddedEvent) => void): this;
  on(
    event: "value.changed",
    handler: (e: ZWaveValueChangedEvent) => void
  ): this;
  on(
    event: "value.removed",
    handler: (e: ZWaveValueRemovedEvent) => void
  ): this;
  on(event: string, handler: Function) {
    this._eventSource.on(event as any, handler as any);
    return this;
  }

  removeListener(event: string, handler: Function): this {
    this._eventSource.removeListener(event, handler);
    return this;
  }
}
