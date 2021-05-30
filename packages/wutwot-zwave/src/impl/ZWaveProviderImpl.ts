import { Driver } from "zwave-js";
import { ZWaveController, ZWaveError } from "zwave-js";
import { injectable, provides, inject, singleton } from "microinject";
import { autobind } from "core-decorators";

import { ZWaveProvider, AdapterLocator } from "../components";

@injectable()
@provides(ZWaveProvider)
@singleton()
export class ZWaveProviderImpl implements ZWaveProvider {
  private _promise: Promise<ZWaveController> | null = null;

  constructor(
    @inject(AdapterLocator) private _adapterLocator: AdapterLocator,
  ) {}

  getController(): Promise<ZWaveController> {
    if (!this._promise) {
      this._promise = this._buildController();
    }
    return this._promise;
  }

  private async _buildController(): Promise<ZWaveController> {
    const port = await this._adapterLocator.getAdapterPort();
    if (!port) {
      throw new Error(
        "No z-wave device detected.  Please ensure the device is plugged in or configure a port manually.",
      );
    }

    const driver = new Driver(port);

    const readyPromise = new Promise<void>((accept, reject) => {
      const onReady = () => {
        driver.removeListener("error", onError);
        accept();
      };
      const onError = (err: Error) => {
        driver.removeListener("driver ready", onReady);
        reject(err);
      };
      driver.on("driver ready", onReady);
      driver.on("error", onError);
    });

    driver.start();

    await readyPromise;

    driver.addListener("error", this._handleRuntimeError);

    return driver.controller;
  }

  @autobind()
  private _handleRuntimeError(err: Error) {
    // TODO: Proper logging.
    if (err instanceof ZWaveError) {
      console.warn(err);
    } else {
      // TODO: Tell server to shut down cleanly if possible.
      console.error(err);
      process.exit(1);
    }
  }
}
