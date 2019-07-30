import { injectable, provides, inject } from "microinject";
import { merge } from "lodash";

import OZW, { NodeInfo, Value, ValueId } from "openzwave-shared";

import { AdapterDiscoverer } from "../../components/AdapterDiscoverer";

import { ZWave } from "../ZWave";
import { ZWaveEventSink } from "../../components";

interface NodeData extends NodeInfo {
  id: number;
  classes: Record<number, Record<number, Value>>;
}

@injectable()
@provides(ZWave)
export class ZWaveImpl implements ZWave {
  private _zwave: OZW;

  private _nodes: Record<number, NodeData> = {};

  constructor(
    @inject(AdapterDiscoverer) private _adapterDiscoverer: AdapterDiscoverer,
    @inject(ZWaveEventSink) private _zwaveEventSink: ZWaveEventSink
  ) {
    this._zwave = new OZW({
      Logging: false,
      ConsoleOutput: false,
      UserPath: process.cwd()
    });
  }

  async start() {
    const port = await this._adapterDiscoverer.getAdapterPort();
    if (!port) {
      throw new Error("No adapter port could be found");
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
          ...nodeInfo
        }
      });
      console.log("ready", nodeId);
      this._zwaveEventSink.onNodeAdded({
        id: nodeId,
        ...nodeInfo
      });
    });
    this._zwave.on(
      "value added",
      (nodeId: number, comclass: number, value: Value) => {
        merge(this._nodes, {
          [nodeId]: {
            classes: {
              [comclass]: {
                [value.index]: value
              }
            }
          }
        });
        console.log("value added", nodeId, value.label, comclass, value.index);
        this._zwaveEventSink.onValueAdded(value);
      }
    );
    this._zwave.on(
      "value changed",
      (nodeId: number, comclass: number, value: Value) => {
        merge(this._nodes, {
          [nodeId]: {
            classes: {
              [comclass]: {
                [value.index]: value
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
        this._zwaveEventSink.onValueChanged(value);
      }
    );
    this._zwave.on(
      "value removed",
      (nodeId: number, comclass: number, index: number) => {
        delete this._nodes[nodeId].classes[comclass][index];
        console.log("value removed", nodeId, comclass, index);
        this._zwaveEventSink.onValueRemoved(nodeId, comclass, index);
      }
    );
    this._zwave.on("node removed", (nodeid: number) => {
      delete this._nodes[nodeid];
    });
  }

  enablePolling(valueId: ValueId): void {
    this._zwave.enablePoll(valueId);
  }
}
