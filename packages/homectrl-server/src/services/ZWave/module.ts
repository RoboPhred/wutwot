import { ContainerModule } from "microinject";

import { AdapterDiscovererImpl } from "./components/impl/AdapterDiscovererImpl";
import { ZWaveEventeer } from "./components/impl/ZWaveEventeer";
import { ZWave } from "./ZWave";

export default new ContainerModule(bind => {
  bind(AdapterDiscovererImpl);
  bind(ZWaveEventeer);
  bind(ZWave).toSelf();
});
