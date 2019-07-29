import { injectable, provides, inject } from "microinject";

import { ZWave } from "../ZWave";
import { AdapterDiscoverer } from "../../components/AdapterDiscoverer";

@injectable()
@provides(ZWave)
export class ZWaveImpl implements ZWave {
  constructor(
    @inject(AdapterDiscoverer) private _adapterDiscoverer: AdapterDiscoverer
  ) {}
  async start() {
    const port = await this._adapterDiscoverer.getAdapterPort();
    if (!port) {
      throw new Error("No adapter port could be found");
    }
    console.log(`The adapter port was found on ${port}`);
  }
}
