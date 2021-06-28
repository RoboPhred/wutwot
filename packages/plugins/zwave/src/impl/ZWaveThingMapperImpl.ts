import { injectable, inject, singleton, provides } from "microinject";
import {
  ZWaveNode,
  ZWaveController,
  InterviewStage,
  NodeStatus,
} from "zwave-js";
import { autobind } from "core-decorators";

import {
  ZWaveProvider,
  ZWaveThingHandlerFactory,
  ZWaveThingHandler,
  ZWaveThingMapper,
} from "../components";

@injectable()
@provides(ZWaveThingMapper)
@singleton()
export class ZWaveThingMapperImpl implements ZWaveThingMapper {
  private _handlersByNodeId = new Map<number, ZWaveThingHandler[]>();

  constructor(
    @inject(ZWaveProvider) zWaveProvider: ZWaveProvider,
    @inject(ZWaveThingHandlerFactory)
    private _handlerFactory: ZWaveThingHandlerFactory,
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
    node.on("alive", this._rebuildNodeThings);
    node.on("interview completed", this._rebuildNodeThings);
    this._rebuildNodeThings(node);
  }

  @autobind()
  private _rebuildNodeThings(node: ZWaveNode): void {
    this._clearNodeHandlers(node);

    const handlers: ZWaveThingHandler[] = [];
    const endpoints = node.getAllEndpoints();
    // zwave spec recommends ignoring default endpoint if other endpoints are present.
    if (endpoints.length > 1) {
      endpoints.shift();
    }

    for (const endpoint of endpoints) {
      const handler = this._handlerFactory.createEndpointHandler(endpoint);
      handlers.push(handler);
    }
    this._handlersByNodeId.set(node.id, handlers);
  }

  private _onNodeRemoved(node: ZWaveNode) {
    node.removeListener("alive", this._rebuildNodeThings);
    node.removeListener("interview completed", this._rebuildNodeThings);
    this._clearNodeHandlers(node);
  }

  private _clearNodeHandlers(node: ZWaveNode) {
    const handlers = this._handlersByNodeId.get(node.id);
    if (handlers) {
      this._handlersByNodeId.delete(node.id);
      handlers.forEach((x) => x.destroy());
    }
  }
}
