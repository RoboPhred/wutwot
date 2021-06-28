import { Endpoint } from "zwave-js/build/lib/node/Endpoint";
import { OwnedPluginThing, PluginThingsManager } from "@wutwot/core";
import { InterviewStage, NodeStatus, ZWaveNode } from "zwave-js";

import { ZWaveEndpointMonitorFactory } from "../contracts";
import { ZWaveThingHandler } from "../components";
import { METADATA_ZWAVE_NODE, METADATA_ZWAVE_ENDPOINT } from "../metadata-keys";
import { ZWaveEndpointMonitor } from "../types";
import { isNotNull } from "../utils";

export class ZWaveEndpointThingHandlerImpl implements ZWaveThingHandler {
  private _thing: OwnedPluginThing | null = null;
  private _destroyed = false;
  private _monitors: ZWaveEndpointMonitor[] = [];

  constructor(
    private _endpoint: Endpoint,
    private _thingsManager: PluginThingsManager,
    private _monitorFactories: ZWaveEndpointMonitorFactory[],
  ) {
    // TODO: Capture errors and log.
    this.initializeThing();
  }

  destroy(): void {
    this._destroyed = true;
    this._monitors.forEach((monitor) => monitor.destroy());
    this._monitors = [];
    if (this._thing) {
      this._thing.delete();
    }
  }

  private async initializeThing() {
    if (this._destroyed) {
      return;
    }

    const node = this._endpoint.getNodeUnsafe()!;

    const { title, description } = await getTitleAndDescription(this._endpoint);

    this._thing = this._thingsManager.addThing({
      pluginLocalId: `${node.id}-${this._endpoint.index}`,
      title,
      description,
      metadata: {
        [METADATA_ZWAVE_NODE]: node,
        [METADATA_ZWAVE_ENDPOINT]: this._endpoint,
      },
    });

    this._monitors = this._monitorFactories
      .map((factory) => factory.createMonitor(this._endpoint, this._thing!))
      .filter(isNotNull);
  }
}

interface TitleAndDescription {
  title: string;
  description: string;
}
function fillRemainingTitleDescription(
  input: Partial<TitleAndDescription>,
  fill: Partial<TitleAndDescription>,
) {
  input.title = input.title ?? fill.title;
  input.description = input.description ?? fill.description;
}

async function getTitleAndDescription(
  endpoint: Endpoint,
): Promise<TitleAndDescription> {
  const node = endpoint.getNodeUnsafe()!;

  const result: Partial<TitleAndDescription> = {
    title: undefined,
    description: undefined,
  };

  const endpointNaming = await getEndpointCCNaming(endpoint);
  fillRemainingTitleDescription(result, endpointNaming);

  if (endpoint.index != 0) {
    const defaultEndpointNaming = await getEndpointCCNaming(
      node.getEndpoint(0),
    );
    fillRemainingTitleDescription(result, defaultEndpointNaming);
  }

  const configNaming = getConfigNaming(node);
  fillRemainingTitleDescription(result, configNaming);

  const classNaming = getClassNaming(node);
  fillRemainingTitleDescription(result, classNaming);

  if (!result.title) {
    result.title = `Node ${node.id}-${endpoint.index}`;
    switch (node.status) {
      case NodeStatus.Alive:
      case NodeStatus.Awake:
        switch (node.interviewStage) {
          case InterviewStage.Complete:
            result.description = "Unknown Device";
            break;
          default:
            result.description = "Device failed interview";
            break;
        }
        break;
      case NodeStatus.Asleep:
        result.description = "Sleeping Device";
        break;
      case NodeStatus.Dead:
        result.description = "Dead Device";
      case NodeStatus.Unknown:
        result.description = "Unknown Device";
    }
  }

  return result as TitleAndDescription;
}

async function getEndpointCCNaming(
  endpoint: Endpoint,
): Promise<Partial<TitleAndDescription>> {
  const namingAndLocation = endpoint.commandClasses["Node Naming and Location"];
  if (!namingAndLocation.isSupported()) {
    return {};
  }

  const defaultTitle = await namingAndLocation.getName();

  const defaultDescription = await namingAndLocation.getLocation();

  return {
    title: defaultTitle,
    description: defaultDescription,
  };
}

function getConfigNaming(node: ZWaveNode): Partial<TitleAndDescription> {
  if (!node.deviceConfig) {
    return {};
  }

  return {
    title: node.deviceConfig.label,
    description: node.deviceConfig.description,
  };
}

function getClassNaming(node: ZWaveNode): Partial<TitleAndDescription> {
  const deviceClass = node.deviceClass;
  if (!deviceClass) {
    return {};
  }

  return {
    title: deviceClass.specific.label,
    description: deviceClass.generic.label,
  };
}
