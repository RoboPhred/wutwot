import { ContainerModule } from "microinject";

import { AdapterDiscovererImpl } from "./components/impl/AdapterDiscovererImpl";

import { ZWaveImpl } from "./services/impl/ZWaveImpl";
import { ZWaveEventeer } from "./services/impl/ZWaveEventeer";

export default new ContainerModule(bind => {
  bind(AdapterDiscovererImpl);
  bind(ZWaveEventeer);
  bind(ZWaveImpl);
});
