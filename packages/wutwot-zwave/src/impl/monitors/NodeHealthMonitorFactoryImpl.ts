import { of as observableOf } from "rxjs";
import {
  PluginThing,
  PropertySetError,
  ThingActionRequestUpdate,
} from "@wutwot/core";
import { autobind } from "core-decorators";
import { injectable, provides, singleton } from "microinject";
import { Subject } from "rxjs";
import { Endpoint, InterviewStage, NodeStatus, ZWaveNode } from "zwave-js";

import { ZWaveEndpointMonitorFactory } from "../../contracts";
import { ZWaveEndpointMonitor } from "../../types";

@injectable()
@provides(ZWaveEndpointMonitorFactory)
@singleton()
export class NodeHealthMonitoryFactoryImpl
  implements ZWaveEndpointMonitorFactory {
  createMonitor(
    endpoint: Endpoint,
    thing: PluginThing,
  ): ZWaveEndpointMonitor | null {
    return new NodeHealthMonitoryImpl(endpoint, thing);
  }
}

class NodeHealthMonitoryImpl implements ZWaveEndpointMonitor {
  private _node: ZWaveNode;
  private _statusSubject = new Subject<string>();
  private _interviewSubject = new Subject<string>();

  constructor(endpoint: Endpoint, thing: PluginThing) {
    this._node = endpoint.getNodeUnsafe()!;

    thing.addProperty({
      pluginLocalId: "node-status",
      title: "Node Status",
      type: "string",
      readOnly: true,
      initialValue: NodeStatusStrings[this._node.status],
      values: this._statusSubject,
      onValueChangeRequested: () =>
        Promise.reject(new PropertySetError("Node status is read-only.")),
    });

    thing.addProperty({
      pluginLocalId: "interview-status",
      title: "Interview Status",
      type: "string",
      readOnly: true,
      initialValue: NodeInterviewStrings[this._node.interviewStage],
      values: this._interviewSubject,
      onValueChangeRequested: () =>
        Promise.reject(new PropertySetError("Interview status is read-only.")),
    });

    thing.addAction({
      pluginLocalId: "interview-node",
      title: "Interview Node",
      onActionInvocationRequested: () => {
        // TODO: Do not allow calling if interview is ongoing.
        // No sane way to do this right now due to https://github.com/zwave-js/node-zwave-js/issues/1105
        this._node.refreshInfo();
        // Note: We do not await the result here.  This is because the result takes a long time ("minutes to hours") to complete.
        //  The mozilla iot action status mechanism would be perfect for this, but we are now following w3c-td, which requires
        //  blocking the http connection until the action completes.
        return observableOf(ThingActionRequestUpdate.completed());
      },
    });

    this._node.on("dead", this._updateStatus);
    this._node.on("alive", this._updateStatus);
    this._node.on("interview completed", this._updateStatus);
    this._node.on("interview failed", this._updateStatus);
  }

  destroy(): void {
    // TODO: Remove properties
    this._node.on("dead", this._updateStatus);
    this._node.on("alive", this._updateStatus);
    this._node.on("interview completed", this._updateStatus);
    this._node.on("interview failed", this._updateStatus);
  }

  @autobind()
  private _updateStatus(node: ZWaveNode) {
    this._statusSubject.next(NodeStatusStrings[node.status]);

    // TODO: If we interviewed, we should update the default name and description.
    //  This is not currently supported by wutwot.  Need to allow updating the default without changing the current.

    // HACK: Check for failure by assuming our default interview count has not changed.
    // See https://github.com/zwave-js/node-zwave-js/issues/1105
    if (node.interviewAttempts >= 5) {
      this._interviewSubject.next("Failed");
    } else {
      this._interviewSubject.next(NodeInterviewStrings[node.interviewStage]);
    }
  }
}

const NodeStatusStrings: Record<NodeStatus, string> = {
  [NodeStatus.Alive]: "Alive",
  [NodeStatus.Asleep]: "Asleep",
  [NodeStatus.Awake]: "Awake",
  [NodeStatus.Dead]: "Dead",
  [NodeStatus.Unknown]: "Unknown",
};

const NodeInterviewStrings: Record<InterviewStage, string> = {
  [InterviewStage.CommandClasses]: "CommandClasses",
  [InterviewStage.Complete]: "Complete",
  [InterviewStage.Neighbors]: "Neighbors",
  [InterviewStage.NodeInfo]: "NodeInfo",
  [InterviewStage.None]: "None",
  [InterviewStage.OverwriteConfig]: "OverwriteConfig",
  [InterviewStage.ProtocolInfo]: "ProtocolInfo",
};
