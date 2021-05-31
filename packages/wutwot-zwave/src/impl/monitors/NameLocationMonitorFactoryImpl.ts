import { injectable, provides, singleton } from "microinject";
import { Endpoint, ZWaveNode } from "zwave-js";
import { PluginThing } from "@wutwot/core";
import { WutwotIRIs } from "@wutwot/td";
import { CommandClasses } from "@zwave-js/core";
import { Subject } from "rxjs";

import { ZWaveEndpointMonitorFactory } from "../../contracts";
import { ZWaveEndpointMonitor } from "../../types";

@injectable()
@provides(ZWaveEndpointMonitorFactory)
@singleton()
export class NameLocationMonitorFactoryImpl
  implements ZWaveEndpointMonitorFactory {
  createMonitor(
    endpoint: Endpoint,
    thing: PluginThing,
  ): ZWaveEndpointMonitor | null {
    return new NameLocationMonitor(endpoint, thing);
  }
}

class NameLocationMonitor implements ZWaveEndpointMonitor {
  private _node: ZWaveNode;
  private _nameSubject = new Subject<string>();
  private _locationSubject = new Subject<string>();

  constructor(endpoint: Endpoint, thing: PluginThing) {
    this._node = endpoint.getNodeUnsafe()!;

    const supportsNameAndLocation = this._node.supportsCC(
      CommandClasses["Node Naming and Location"],
    );

    const nameAndLocationCC = supportsNameAndLocation
      ? this._node.commandClasses["Node Naming and Location"]
      : new FallbackNameAndLocation();

    thing.addProperty({
      pluginLocalId: "node-name",
      title: "Name",
      semanticType: [WutwotIRIs.DisplayName],
      type: "string",
      initialValue: "",
      values: this._nameSubject,
      onValueChangeRequested: async (value: string) => {
        await nameAndLocationCC.setName(value);
      },
    });

    thing.addProperty({
      pluginLocalId: "node-location",
      title: "Location",
      type: "string",
      initialValue: "",
      values: this._locationSubject,
      onValueChangeRequested: async (value: string) => {
        await nameAndLocationCC.setLocation(value);
      },
    });

    nameAndLocationCC
      .getName()
      .then((value) => this._nameSubject.next(value ?? ""));
    nameAndLocationCC
      .getLocation()
      .then((value) => this._locationSubject.next(value ?? ""));

    // TODO: Listen for value changes for name and location.
  }

  destroy(): void {}
}

// TODO: Use persistence layer to save these.
class FallbackNameAndLocation {
  getName(): Promise<string | undefined> {
    return Promise.resolve("[name not supported]");
  }

  setName(): Promise<void> {
    return Promise.resolve();
  }

  getLocation(): Promise<string | undefined> {
    return Promise.resolve("[location not supported]");
  }

  setLocation(): Promise<void> {
    return Promise.resolve();
  }
}
