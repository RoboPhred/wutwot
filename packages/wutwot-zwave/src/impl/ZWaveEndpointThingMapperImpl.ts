import { injectable, inject, singleton, provides } from "microinject";
import { ZWaveController } from "zwave-js/build/lib/controller/Controller";
import { ZWaveNode } from "zwave-js";
import { InterviewStage } from "zwave-js/build/lib/node/INode";
import { autobind } from "core-decorators";

import {
  ZWaveProvider,
  ZWaveEndpointHandlerFactory,
  ZWaveEndpointHandler,
  ZWaveEndpointThingMapper,
} from "../components";

@injectable()
@provides(ZWaveEndpointThingMapper)
@singleton()
export class ZWaveEndpointThingMapperImpl implements ZWaveEndpointThingMapper {
  private _handlersByNodeId = new Map<number, ZWaveEndpointHandler[]>();

  constructor(
    @inject(ZWaveProvider) zWaveProvider: ZWaveProvider,
    @inject(ZWaveEndpointHandlerFactory)
    private _endpointHandlerFactory: ZWaveEndpointHandlerFactory,
  ) {
    zWaveProvider.getController().then((controller) => this._start(controller));
  }

  private _start(controller: ZWaveController) {
    for (const node of controller.nodes.values()) {
      this._onNodeAdded(node);
    }

    controller.on("node added", this._onNodeAdded.bind(this));
    controller.on("node removed", this._onNodeRemoved.bind(this));
  }

  private _onNodeAdded(node: ZWaveNode): void {
    if (node.interviewStage === InterviewStage.Complete) {
      this._onNodeReady(node);
    } else {
      node.once("interview completed", this._onNodeReady);
    }
  }

  @autobind()
  private _onNodeReady(node: ZWaveNode): void {
    const handlers: ZWaveEndpointHandler[] = [];
    const endpoints = node.getAllEndpoints();
    // zwave spec recommends ignoring default endpoint if other endpoints are present.
    if (endpoints.length > 1) {
      endpoints.shift();
    }

    for (const endpoint of endpoints) {
      const handler = this._endpointHandlerFactory.createHandler(endpoint);
      handlers.push(handler);
    }
    this._handlersByNodeId.set(node.id, handlers);
  }

  private _onNodeRemoved(node: ZWaveNode) {
    node.removeListener("interview completed", this._onNodeReady);

    const handlers = this._handlersByNodeId.get(node.id);
    if (handlers) {
      this._handlersByNodeId.delete(node.id);
      handlers.forEach((x) => x.destroy());
    }
  }
}
