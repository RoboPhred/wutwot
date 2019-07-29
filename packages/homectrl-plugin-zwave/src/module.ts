import { ContainerModule } from "microinject";

import { AdapterDiscovererImpl } from "./components/impl/AdapterDiscovererImpl";
import { ZWaveImpl } from "./services/impl/ZWave";

export default new ContainerModule(bind => {
  bind(AdapterDiscovererImpl);
  bind(ZWaveImpl);
});
