import { Driver } from "zwave-js";

import { ZWaveDriver } from "../ZWaveDriver";
import { ZWaveController } from "zwave-js/build/lib/controller/Controller";
import { injectable, provides, singleton } from "microinject";

@injectable()
@singleton()
@provides(ZWaveDriver)
export class ZWaveDriverImpl implements ZWaveDriver {
  private _driver: Driver | null = null;

  get controller(): ZWaveController {
    if (!this._driver) {
      throw new Error("Driver not connected.");
    }
    return this._driver.controller;
  }

  connect(port: string): Promise<void> {
    if (this._driver) {
      throw new Error("Driver already connected");
    }

    this._driver = new Driver(port);

    const readyPromise = new Promise<void>((accept, reject) => {
      const onReady = () => {
        this._driver!.removeListener("error", onError);
        accept();
      };
      const onError = (err: Error) => {
        this._driver!.removeListener("driver ready", onReady);
        reject(err);
      };
      this._driver!.on("driver ready", onReady);
      this._driver!.on("error", onError);
    });

    this._driver.start();
    return readyPromise;
  }
}
