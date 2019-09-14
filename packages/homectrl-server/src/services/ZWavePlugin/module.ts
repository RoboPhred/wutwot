import { ContainerModule } from "microinject";

import { AdapterLocatorImpl } from "./components/impl/AdapterLocatorImpl";
import { ZWaveDriverImpl } from "./components/impl/ZWaveDriverImpl";
import { ZWavePlugin } from "./ZWavePlugin";

export default new ContainerModule(bind => {
  bind(AdapterLocatorImpl);
  bind(ZWaveDriverImpl);
  bind(ZWavePlugin);
});
